import ListGroup from 'react-bootstrap/ListGroup'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Place } from '../types/Places.types'

type PlacesOffCanvasProps = {
	places: Place[] | null
	show: boolean
	onHide: () => void
}

const PlacesOffCanvas: React.FC<PlacesOffCanvasProps> = ({ places, show, onHide }) => {
	const sortedPlaces = places?.slice().sort((a, b) => a.name.localeCompare(b.name))

	return (
		<Offcanvas show={show} onHide={onHide} placement="start" title="Places near you">
				<Offcanvas.Header className="placeListHeader" closeButton>
					<Offcanvas.Title>
						Places near you
					</Offcanvas.Title>
				</Offcanvas.Header>
			<Offcanvas.Body>
				<ListGroup>
					{sortedPlaces?.map(place => (
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
