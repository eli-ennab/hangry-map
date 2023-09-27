import ListGroup from 'react-bootstrap/ListGroup'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {LatLngLiteral, Place} from '../types/Places.types'
import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'

type PlacesOffCanvasProps = {
	show: boolean
	onHide: () => void
	filteredPlaces: Place[]
	getDistance: (PLlat: number, PLlng: number, p1: LatLngLiteral | null | undefined) => number
	userPos: LatLngLiteral | null | undefined
	setActiveMarker:  React.Dispatch<React.SetStateAction<string | null>>
	setInfoWindowCenter: React.Dispatch<React.SetStateAction<boolean>>
}

const PlacesOffCanvas: React.FC<PlacesOffCanvasProps> = ({
		show, 
		onHide, 
		filteredPlaces, 
		setActiveMarker, 
		setInfoWindowCenter, 
		getDistance, 
		userPos
	}) => {
	const [sortBy, setSortBy] = useState<Place[]>(filteredPlaces)
	
	const sortedFilteredPlaces = [...filteredPlaces].map(place => {
		const distance = getDistance(place.lat!, place.lng!, userPos)
		return {
			...place,
			distance
		}
	}).sort((a, b) => a.distance - b.distance)
	
	useEffect(() => {
	setSortBy(sortedFilteredPlaces)
	}, [filteredPlaces, getDistance, userPos]);
	
	return (
		<Offcanvas show={show} onHide={onHide} placement="start" title="Places near you">
			<Offcanvas.Header className="placeListHeader" closeButton>
				<Offcanvas.Title>
					Places near you
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<div className={'d-flex justify-content-around mb-3'}>
					<Button className={'btnOffCanvas'} onClick={() => setSortBy(filteredPlaces)}> Sort by A - Z </Button>
					<Button className={'btnOffCanvas'} onClick={() => setSortBy(sortedFilteredPlaces)}> Sort by Nearest</Button>
				</div>
				<ListGroup>
					{sortBy?.map(place => (
						<ListGroup.Item key={place._id} className="mb-3 placeListItem" 
										action
										onClick={() => {
											setActiveMarker(place._id)
											onHide()
											setInfoWindowCenter(false)
										}
						}>
							<strong>{place.name}</strong>
							<p>{Math.ceil(getDistance(place.lat!, place.lng!, userPos)) / 1000} km from your position</p>
							{place.address}
							<p>
								{place.category}, {place.offerings}
							</p>
							
						</ListGroup.Item>
					))}
				</ListGroup>
			</Offcanvas.Body>
		</Offcanvas>
	)
}

export default PlacesOffCanvas
