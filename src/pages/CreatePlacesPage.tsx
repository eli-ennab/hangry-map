import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../services/firebase'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

const CreatePlacesPage = () => {
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [offerings, setOfferings] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		try {
			const docRef = await addDoc(collection(db, "places"), {
				name,
				address,
				city,
				description,
				category,
				offerings,
				timestamp: new Date()
			})

			setName('')
			setAddress('')
			setCity('')
			setDescription('')
			setCategory('')
			setOfferings('')
			setMessage('Place added successfully!')
		} catch (error) {
			console.error("Error adding document: ", error)
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
							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="text"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>City</Form.Label>
									<Form.Control
										type="text"
										value={city}
										onChange={(e) => setCity(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Category</Form.Label>
									<Form.Select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										required
									>
										<option value="">Select a category</option>
										<option value="Café">Café</option>
										<option value="Restaurant">Restaurant</option>

									</Form.Select>
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
