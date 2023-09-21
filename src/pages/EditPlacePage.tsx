import {useParams} from 'react-router-dom'
import useGetPlace from '../hooks/useGetPlace'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {db, placeCol} from '../services/firebase'
import {useForm} from 'react-hook-form'
import {deleteDoc, doc, serverTimestamp, updateDoc} from 'firebase/firestore'
import {Place} from '../types/Places.types'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import ConfirmationModal from '../components/ConfimationModal'
import UploadImage from '../components/UploadImage.tsx'
import useAuth from '../hooks/useAuth.tsx'
import {getGeocode, getLatLng} from 'use-places-autocomplete'

const EditPlacePage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const [message, setMessage] = useState('')
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const {id} = useParams()
	const {data: place} = useGetPlace(id!)
	const {currentUser} = useAuth()
	
	if (!currentUser) {
		throw new Error("Error.")
	}
	if (!id) {
		throw new Error("Error.")
	}
	
	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<Place>()
	
	const onSubmit = async (data: Place) => {
		try {
			const fullAddress = `${data.address}, ${data.city}`
			const results = await getGeocode({ address: fullAddress })
			const { lat, lng } = getLatLng(results[0])
			
			const placeRef = doc(db, 'places', id)
			await updateDoc(placeRef, {
				...data,
				lat, 
				lng,
				updated_at: serverTimestamp()
			})
			
			setMessage('Place updated successfully!')
		} catch (error) {
			console.error('Error while updating place:', error)
			setMessage('Error while updating place. Please try again.')
		}
	}
	
	const onDelete = async () => {
		await deleteDoc(doc(placeCol, id))
		navigate('/user/dashboard', {
			replace: true,
		})
	}
	
	return (
			<>
				{place &&
            <Container className="py-3">
                <Row>
                    <Col md={{span: 10, offset: 1}}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="mb-3">Update Place</Card.Title>
															
															{message && <Alert variant="dark">{message}</Alert>}
															{error && <Alert variant="dark-danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter place name"
																						{...register('name', {required: true})}
                                            defaultValue={place.name}
                                        />
																			{errors.name && <span>Name is required</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter address"
																						{...register('address', {required: true})}
                                            defaultValue={place.address}
                                        />
																			{errors.address && <span>Address is required</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter city"
																						{...register('city', {required: true})}
                                            defaultValue={place.city}
                                        />
																			{errors.city && <span>City is required</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Enter a brief description"
																						{...register('description', {required: true})}
                                            defaultValue={place.description}
                                        />
																			{errors.description && <span>Description is required</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select {...register('category', {required: true})} defaultValue={place.category}>
                                            <option value="">Select a category</option>
                                            <option value="Café">Café</option>
                                            <option value="Restaurant">Restaurant</option>
                                            <option value="FastFood">Fastfood</option>
                                            <option value="KioskGrill">Kiosk/Grill</option>
                                            <option value="FoodTruck">Foodtruck</option>
                                        </Form.Select>
																			{errors.category && <span>Category is required</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Offerings</Form.Label>
                                        <Form.Select {...register('offerings', {required: true})} defaultValue={place.offerings}>
                                            <option value="">Select type of offerings</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="AfterWork">After Work</option>
                                            <option value="Dinner">Dinner/Á la carte</option>
                                        </Form.Select>
																			{errors.offerings && <span>Offerings is required</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email address (optional)"
																						{...register('email')}
                                            defaultValue={place.email ?? 'N/A'}
                                        />
																			{errors.email && <span>Invalid email</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Enter phone number (optional)"
																						{...register('phone')}
                                            defaultValue={place.phone}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Website</Form.Label>
                                        <Form.Control
                                            type="url"
                                            placeholder="Enter website URL (optional)"
																						{...register('website')}
                                            defaultValue={place.website}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Facebook</Form.Label>
                                        <Form.Control
                                            type="url"
                                            placeholder="Enter Facebook page URL (optional)"
																						{...register('facebook')}
                                            defaultValue={place.facebook}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Instagram</Form.Label>
                                        <Form.Control
                                            type="url"
                                            placeholder="Enter Instagram handle URL (optional)"
																						{...register('instagram')}
                                            defaultValue={place.instagram}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="completed">
                                        <Form.Label>{place.isApproved ? 'Check to remove place form map' : 'Check to approve place'}</Form.Label>
                                        <Form.Check
                                            type="switch"
                                            defaultChecked={place.isApproved}
																						{...register('isApproved')}
                                        />
                                    </Form.Group>

                                    <UploadImage place={place}/>

                                    <Button
                                        type="submit"
                                        variant="dark"
                                    >
                                        Update Place
                                    </Button>

                                    <Button
                                        variant="danger"
                                        className="mx-3"
                                        onClick={() => setShowConfirmDelete(true)}
                                    >
                                        Delete Place
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <ConfirmationModal
                    show={showConfirmDelete}
                    onCancel={() => setShowConfirmDelete(false)}
                    onConfirm={onDelete}
                >
                    Are you sure you want to delete {place.name}?
                </ConfirmationModal>
            </Container>
				}
			</>
	)
}

export default EditPlacePage