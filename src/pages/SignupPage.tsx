import {useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {useForm, SubmitHandler} from 'react-hook-form'
import {SignUpCredentials} from '../types/User.types.ts'
import {FirebaseError} from 'firebase/app'
// style 
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const SignupPage = () => {
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const {handleSubmit, register, watch, formState: {errors}} = useForm<SignUpCredentials>()
	const {signup} = useAuth()
	const navigate = useNavigate()
	
	const passwordRef = useRef('')
	passwordRef.current = watch('password')
	
	const onSignup: SubmitHandler<SignUpCredentials> = async (data) => {
		
		setErrorMessage(null)
		
		try {
			setLoading(true)
			
			await signup(data.email, data.password)
			
			navigate('/login')
		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage("Something went wrong. Please try again")
			}
			setLoading(false)
		}		
	}

  return  (
		<Container className="py-3">
			<Row>
				<Col md={{span: 6, offset: 3}}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Sign Up</Card.Title>
							{/* {errorMessage && {errorMessage}} */}
											
							<Form onSubmit={handleSubmit(onSignup)}>
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder="mail@example.com"
										type="email"
										{...register('email', {
											required: 'E-Mail required'
										})}
									/>
									{errors.email && 
										<p>
											{errors.email.message ?? "Invalid value"}
										</p>
									}
								</Form.Group>
								
								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										{...register('password', {
											required: "Password required",
											minLength: {
												value: 6,
												message: "Please enter at least 6 characters"
											}
										})}
									/>
									{errors.password && 
										<p>
											{errors.password.message ?? "Invalid value"}
										</p>
									}
									<Form.Text>You must have least 6 characters</Form.Text>
								</Form.Group>
								
								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										{...register('passwordConfirm', {
											required: "Enter your password again",
											minLength: {
												value: 6,
												message: "Please enter at least 6 characters"
											},
											validate: (value) => {
												return value === passwordRef.current || "The passwords does not match"
											}
										})}
									/>
									{errors.passwordConfirm &&
										<p>
											{errors.passwordConfirm.message ?? "Invalid value"}
										</p>
									}
								</Form.Group>
								
								<Button 
									variant="dark" 
									type="submit" 
									disabled={loading}
								>
									Sign Up
								</Button>
							
							</Form>
						</Card.Body>
					</Card>
					
					<div className="">
						Already a user? <Link to="/login">Log In Here</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default SignupPage