import { Offcanvas } from 'react-bootstrap'
import { Place } from "../types/Places.types"

type PlaceDetailsOffCanvasProps = {
	selectedPlace: Place | null
	onHide: () => void
}

const PlaceDetailsOffCanvas: React.FC<PlaceDetailsOffCanvasProps> = ({ selectedPlace, onHide }) => {
	return (
		<Offcanvas show={selectedPlace !== null} onHide={onHide} placement="end">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>{selectedPlace?.name}</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				{selectedPlace && (
					<>
						<p><strong>Address:</strong> {selectedPlace.address}, {selectedPlace.city}</p>
						<p><strong>Description:</strong> {selectedPlace.description}</p>
						<p><strong>Category:</strong> {selectedPlace.category}</p>
						<p><strong>Offerings:</strong> {selectedPlace.offerings}</p>

						{selectedPlace.email && <p><strong>Email:</strong> {selectedPlace.email}</p>}
						{selectedPlace.phone && <p><strong>Phone:</strong> {selectedPlace.phone}</p>}

						{selectedPlace.website && (
							<p><strong>Website:</strong> <a href={selectedPlace.website} className="text-decoration-none">{selectedPlace.website}</a></p>
						)}
						{selectedPlace.facebook && (
							<p><strong>Facebook:</strong> <a href={selectedPlace.facebook} className="text-decoration-none">{selectedPlace.facebook}</a></p>
						)}
						{selectedPlace.instagram && (
							<p><strong>Instagram:</strong> <a href={selectedPlace.instagram} className="text-decoration-none">{selectedPlace.instagram}</a></p>
						)}
						{selectedPlace.photoUrl && (
							<div className="mb-3">
								<img src={selectedPlace.photoUrl} alt={selectedPlace.name} className="img-fluid rounded shadow" />
							</div>
						)}
					</>
				)}
			</Offcanvas.Body>
		</Offcanvas>
	)
}

export default PlaceDetailsOffCanvas