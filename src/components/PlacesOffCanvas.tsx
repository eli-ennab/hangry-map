import ListGroup from 'react-bootstrap/ListGroup'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {LatLngLiteral, Place} from '../types/Places.types'

type PlacesOffCanvasProps = {
	show: boolean
	onHide: () => void
	filteredPlaces: Place[]
	getDistance: (PLlat: number, PLlng: number, p1: LatLngLiteral | null | undefined) => number
	userPos: LatLngLiteral | null | undefined
}

const PlacesOffCanvas: React.FC<PlacesOffCanvasProps> = ({  show, onHide, filteredPlaces, getDistance, userPos }) => {
	const sortedFilteredPlaces = [...filteredPlaces].map(place => {
		const distance = getDistance(place.lat!, place.lng!, userPos)
		return {
			...place,
			distance
		}
	}).sort((a, b) => a.distance - b.distance)
	return (
		<Offcanvas show={show} onHide={onHide} placement="start" title="Places near you">
			<Offcanvas.Header className="placeListHeader" closeButton>
				<Offcanvas.Title>
					Places near you
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<ListGroup>
					{sortedFilteredPlaces?.map(place => (
						<ListGroup.Item key={place._id} className="mb-3 placeListItem">
							<strong>{place.name}</strong>
							<br />
							{place.address}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Offcanvas.Body>
		</Offcanvas>
	)
}

export default PlacesOffCanvas
