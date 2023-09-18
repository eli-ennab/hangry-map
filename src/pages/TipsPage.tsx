import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../services/firebase'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const TipsPage = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		try {
			const docRef = await addDoc(collection(db, "tips"), {
				title,
				description,
				timestamp: new Date()
			})

			setTitle('')
			setDescription('')
			setMessage('Tip added successfully!')
		} catch (error) {
			console.error("Error adding document: ", error)
			setMessage('Error while adding tip. Please try again.')
		}
	}

	return (
		<Container className="py-3">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Provide a Tip</Card.Title>

							{message && <p className="text-danger">{message}</p>}

							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3" controlId="title">
									<Form.Label>Title</Form.Label>
									<Form.Control
										type="text"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="description">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										required
									/>
								</Form.Group>

								<Button variant="primary" type="submit">
									Submit Tip
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default TipsPage
