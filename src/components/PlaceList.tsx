import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../services/firebase'
import { Card, Row, Col, Button, Container } from 'react-bootstrap'
import { Place } from '../types/Places.types';

interface PlacesListProps {
	onApprove: (placeId: string) => void
}

const PlacesList: React.FC<PlacesListProps> = ({ onApprove }) => {
	const [places, setPlaces] = useState<Place[]>([])

	useEffect(() => {
		const fetchPlaces = async () => {
			const placesCollection = collection(db, 'places')
			const placesSnapshot = await getDocs(placesCollection)
			const placesList = placesSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as Place))
			setPlaces(placesList)
		}

		fetchPlaces()
	}, [])

	return (
		<Container className='py-3'>
			<Row>
				<Row>
					<Col className="text-center mb-4">
						<h2>Places to Approve</h2>
					</Col>
				</Row>
				{places.map(place => (
					<Col md={4} key={place._id}>
						<Card className="mb-4">
							<Card.Body>
								<Card.Title>{place.name}</Card.Title>
								<Card.Text>
									Address: {place.address}, {place.city}
									<br />
									Description: {place.description}
									<br />
									Category: {place.category}
									<br />
									Offerings: {place.offerings}
								</Card.Text>
								<Button variant="primary" onClick={() => onApprove(place._id ?? 'N/A')}>
									Approve
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	)
}

export default PlacesList
