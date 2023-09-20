import { Offcanvas } from 'react-bootstrap'
import { Place } from '../types/Places.types'

type PlacesOffCanvasProps = {
	places: Place[] | null
	show: boolean
	onHide: () => void
}

const PlacesOffCanvas: React.FC<PlacesOffCanvasProps> = ({ places, show, onHide }) => {

	return (
		<Offcanvas show={show} onHide={onHide} placement="start" title="All Places">
			<Offcanvas.Body>
				{places?.map(place => (
					<div key={place._id} className="mb-3">
						<strong>{place.name}</strong><br />
						{place.address}<br />
						<hr />
					</div>
				))}
			</Offcanvas.Body>
		</Offcanvas>
	)
}

export default PlacesOffCanvas;
