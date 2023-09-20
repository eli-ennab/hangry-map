import { useParams } from 'react-router-dom'
import useGetPlace from '../hooks/useGetPlace'
import { useState } from 'react'
import { db } from '../services/firebase'
import { useForm } from 'react-hook-form'
import { doc, updateDoc } from 'firebase/firestore'
import { Place } from '../types/Places.types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

const PlacePage = () => {
	const { id } = useParams()
	const { data: place } = useGetPlace(id!)

	if (!id) {
		throw new Error("Error.")
	}

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Place>()

	const [message, setMessage] = useState('')

	const onSubmit = async (data: Place) => {	
		try {
			const placeRef = doc(db, 'places', id)
			await updateDoc(placeRef, data)
			setMessage('Place updated successfully!')
		} catch (error) {
			console.error('Error while updating place:', error)
			setMessage('Error while updating place. Please try again.')
		}
	}
	
	return (
		<>
			{place && 
				<Container className="py-3">
					<Row>
						<Col md={{ span: 6, offset: 3 }}>
							<Card>
								<Card.Body>
									<Card.Title className="mb-3">Update Place</Card.Title>

									{message && <p>{message}</p>}

									<Form onSubmit={handleSubmit(onSubmit)}>
										<Form.Group className="mb-3">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter place name"
												{...register('name', { required: true })}
												defaultValue={place.name}
											/>
											{errors.name && <span>Name is required</span>}
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Address</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter address"
												{...register('address', { required: true })}
												defaultValue={place.address}
											/>
											{errors.address && <span>Address is required</span>}
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>City</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter city"
												{...register('city', { required: true })}
												defaultValue={place.city}
											/>
											{errors.city && <span>City is required</span>}
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Description</Form.Label>
											<Form.Control
												as="textarea"
												placeholder="Enter a brief description"
												{...register('description', { required: true })}
												defaultValue={place.description}
											/>
											{errors.description && <span>Description is required</span>}
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Category</Form.Label>
											<Form.Select {...register('category', { required: true })} defaultValue={place.category}>
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
											<Form.Select {...register('offerings', { required: true })} defaultValue={place.offerings}>
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
												type="number"
												placeholder="Enter phone number (optional)"
												{...register('phone')}
												defaultValue={place.phone ?? 'N/A'}
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Website</Form.Label>
											<Form.Control
												type="url"
												placeholder="Enter website URL (optional)"
												{...register('website')}
												defaultValue={place.website ?? 'N/A'}
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Facebook</Form.Label>
											<Form.Control
												type="url"
												placeholder="Enter Facebook page URL (optional)"
												{...register('facebook')}
												defaultValue={place.facebook ?? 'N/A'}
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Instagram</Form.Label>
											<Form.Control
												type="url"
												placeholder="Enter Instagram handle URL (optional)"
												{...register('instagram')}
												defaultValue={place.instagram ?? 'N/A'}
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Is Approved</Form.Label>
											<Form.Select {...register('isApproved', { required: true })} defaultValue={place.isApproved.toString()}>
												<option value="false">false</option>
												<option value="true">true</option>
											</Form.Select>
											{errors.offerings && <span>An isApproved value is required.</span>}
										</Form.Group>

										<Button type="submit">Update Place</Button>
									</Form>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			}
		</>
	)
}

export default PlacePage