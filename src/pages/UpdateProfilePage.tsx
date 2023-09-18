import {FirebaseError} from 'firebase/app'
import {useRef, useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import {useForm, SubmitHandler} from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import {UpdateProfileFormData} from '../types/User.types'
import Image from 'react-bootstrap/Image'
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import {storage} from '../services/firebase'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {v4 as uuidv4} from 'uuid'

const UpdateProfilePage = () => {

	const [progress, setProgress] = useState<number | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const {
		userPhotoUrl,
		currentUser,
		onNameChange,
		onMailChange,
		onPassword,
		onPhotoUrl,
		reloadUser
	} = useAuth()

	const {handleSubmit, register, watch, formState: {errors}} = useForm<UpdateProfileFormData>({
		defaultValues: {
			email: currentUser?.email ?? '',
			name: currentUser?.displayName ?? '',
		}
	})
	

	const passwordRef = useRef("")
	passwordRef.current = watch('password')
	
	const photoFileRef = useRef<FileList | null>(null)
	photoFileRef.current = watch("photoFile")
	

	
	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		setErrorMessage(null)

		try {
			setLoading(true)

			if (data.name !== (currentUser?.displayName ?? "")) {
				await onNameChange(data.name)
			}
					
			if (data.email !== (currentUser?.email ?? "")) {
				await onMailChange(data.email)
			}
				
			if (data.password) await onPassword(data.password)

			if (data.photoFile.length) {
				const photo = data.photoFile[0]
				const uuid = uuidv4()
				const ext = photo.name.substring(photo.name.lastIndexOf(".") + 1)
				
				const fileRef = ref(storage, `img/profilePic/${currentUser?.uid}/${uuid}.${ext}`)
					
				const uploadTask = uploadBytesResumable(fileRef, photo)
				
				uploadTask.on('state_changed',
						(snapshot) => {
							const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 1000) / 10
							setProgress(progress)
						}, (err) => {
							setErrorMessage(`upload failed, ${err} ${err.message}`)
						}, async () => {
							const photoUrl = await getDownloadURL(fileRef)
							await onPhotoUrl(photoUrl)
							setProgress(null)
						})
					}
			
			await reloadUser()
			setLoading(false)
			
		} catch
				(error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage("Something went wrong. Have you tried turning it off and on again?")
			}
			setLoading(false)
			setProgress(null)
		}
	}

	const onDeletePic = async () => {
		await onPhotoUrl('')
		await reloadUser()
	}
	
	if (!currentUser) {
		return (<p>Loading ...</p>)
	}

  return (
	<Container className="py-3 center-y">
	<Row>
		<Col md={{span: 8, offset: 2}}>
			<Card>
				<Card.Body>
					<Card.Title className="mb-3">Update Your Profile</Card.Title>
					
					{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}
					<div className="d-flex justify-content-center my-3">
						<Image
								src={userPhotoUrl || `https://placehold.co/100x100?text=${currentUser.displayName}`}
								fluid
								roundedCircle
								className="w-50 img-square"
						/>
					</div>
					<div className="text-center mt-3">
						<Button onClick={onDeletePic} variant={'outline-danger'} size={'sm'}>Delete Picture</Button>
					</div>
					
					<Form onSubmit={handleSubmit(onUpdateProfile)}>
						<Form.Group controlId="name" className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
									type="text"
									{...register('name', {
										minLength: {
											value: 2,
											message: "Must be atleast 2 characters long..."
										}
									})}
							/>
							{errors.name && <p className="invalid">{errors.name.message ?? "Invalid value"}</p>}
						</Form.Group>
						
						
						<Form.Group controlId="photo" className="mb-3">
							<Form.Label>Photo</Form.Label>
							<Form.Control
									type="file"
									accept="image/gif,image/jpeg,image/png,image/webp"
									{...register('photoFile', {})}
							/>
							{errors.photoFile && <p className="invalid">{errors.photoFile.message ?? "Invalid value"}</p>}
							<Form.Text>{photoFileRef.current && photoFileRef.current.length > 0 && (
									<>
								<span>
									{photoFileRef.current[0].name}
									{' '}
									({Math.round(photoFileRef.current[0].size / 1024)} kB)
									{' '}
									{progress && <>
									{progress}% uploaded
									</>}
									</span>
										{progress && <ProgressBar striped now={progress} />}
									</>
							)}</Form.Text>
						</Form.Group>

						<Form.Label>Change your mail? </Form.Label>
						<Form.Group controlId="email" className="mb-3">
							<Form.Label>Enter new mail</Form.Label>
							<Form.Control
									type="email"
									{...register('email', {
										required: 'You have to enter a valid email'
									})}
							/>
							{errors.email && <p className="invalid">{errors.email.message ?? "Invalid value"}</p>}
						</Form.Group>
						
						<Form.Label>Update your password? </Form.Label>
						<Form.Group controlId="password" className="mb-3">							
							<Form.Label>Password</Form.Label>
							<Form.Control
									type="password"
									autoComplete="new-password"
									{...register('password', {
										minLength: {
											value: 6,
											message: "Password must be at least 6 characters"
										},
									})}
							/>
							{errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
							<Form.Text>At least 6 characters</Form.Text>
						</Form.Group>
						
						<Form.Group controlId="confirmPassword" className="mb-3">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
									type="password"
									autoComplete="off"
									{...register('passwordConfirm', {
										minLength: {
											value: 6,
											message: "Please enter at least 6 characters"
										},
										validate: (value) => {
											return !passwordRef.current || value === passwordRef.current || "The passwords does not match 🤦🏼‍♂️"
										}
									})}
							/>
							{errors.passwordConfirm &&
			<p className="invalid">{errors.passwordConfirm.message ?? "Invalid value"}</p>}
						</Form.Group>
						<div className="d-grid gap-2">
							<Button
									disabled={loading}
									variant="outline-primary"
									type="submit">
								{loading
										? "saving..."
										: "Save Changes"}
							</Button>
						</div>
					</Form>
				
				</Card.Body>
			</Card>
		
		</Col>
	</Row>
</Container>

  )
}

export default UpdateProfilePage