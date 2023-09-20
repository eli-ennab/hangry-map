import { useMemo, useState } from 'react'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useForm } from 'react-hook-form'
import { Place } from '../types/Places.types'
import { Libraries, useJsApiLoader } from '@react-google-maps/api'
import { getGeocode, getLatLng } from 'use-places-autocomplete'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

const CreatePlacesPage = () => {
	const libraries: Libraries = useMemo(() => ["places"], [])

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GMAP_API_KEY,
		libraries,
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Place>()

	const [message, setMessage] = useState('')

	const onSubmit = async (data: Place) => {
		if (!isLoaded) {
			setMessage('Please try again')
			return
		}
		
		try {
			const fullAddress = `${data.address}, ${data.city}`
			const results = await getGeocode({ address: fullAddress })
			const { lat, lng } = getLatLng(results[0])
		
			const docRef = await addDoc(collection(db, 'places'), {
				...data,
				lat,
				lng,
				timestamp: new Date(),
				isApproved: false
			})
		
			const placeId = docRef.id
			await updateDoc(doc(db, 'places', placeId), { _id: placeId })
		
			reset()
			setMessage('Place added successfully!')
		} catch (error) {
			setMessage('Error while adding place. Please try again.')
		}
	}

	return (
		<Container className="py-3">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Add a New Place</Card.Title>
							{message && <p>{message}</p>}
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Form.Group className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter place name"
										{...register('name', { required: true })}
									/>
									{errors.name && <span>Name is required</span>}
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter address"
										{...register('address', { required: true })}
									/>
									{errors.address && <span>Address is required</span>}
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>City</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter city"
										{...register('city', { required: true })}
									/>
									{errors.city && <span>City is required</span>}
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										placeholder="Enter a brief description"
										{...register('description', { required: true })}
									/>
									{errors.description && <span>Description is required</span>}
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Category</Form.Label>
									<Form.Select {...register('category', { required: true })}>
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
									<Form.Select {...register('offerings', { required: true })}>
										<option value="">Select type of offerings</option>
										<option value="Lunch">Lunch</option>
										<option value="AfterWork">After work</option>
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
									/>
									{errors.email && <span>Invalid email</span>}
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="tel"
										placeholder="Enter phone number (optional)"
										{...register('phone')}
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Website</Form.Label>
									<Form.Control
										type="url"
										placeholder="Enter website URL (optional)"
										{...register('website')}
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Facebook</Form.Label>
									<Form.Control
										type="url"
										placeholder="Enter Facebook page URL (optional)"
										{...register('facebook')}
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Instagram</Form.Label>
									<Form.Control
										type="url"
										placeholder="Enter Instagram handle URL (optional)"
										{...register('instagram')}
									/>
								</Form.Group>

								<Button type="submit">Submit Place</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default CreatePlacesPage
