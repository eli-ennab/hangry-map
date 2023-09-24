import useGetPlacesApproved from '../hooks/useGetPlacesApproved.ts'
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const Places = () => {
	const {data: places, loading} = useGetPlacesApproved()
	if (loading) return <div>Fetching Places...</div>
	return (
		
		<Container className={'pt-3'}>
			<h2>Places</h2>
			{places && !loading ? (
				<Accordion>
					{places.map(p => (						
						<Accordion.Item eventKey={p._id}>
							<Accordion.Header>{p.name}, {p.city}</Accordion.Header>
							<Accordion.Body>
								<p>{p.offerings} {' '} {p.category}</p>								
								<p>{p.description}</p>
								<ListGroup variant="flush" className={'my-3'}>
									<ListGroup.Item action as={Link} to={`tel:${p.phone}`}>{p.phone}</ListGroup.Item>
									<ListGroup.Item action as={Link} to={`/map?lat=${p.lat}&lng=${p.lng}`}>{p.address}, {p.city} - Click to show on our map</ListGroup.Item>
									<ListGroup.Item action as={Link} to={p.gMapsLink} target={'_blank'} title={'Get directions...'}>Google Maps Directions <span className="material-symbols-outlined infoIcon">open_in_new</span></ListGroup.Item>
									
									{p.website && (
										<ListGroup.Item action as={Link} to={p.website} target={'_blank'}>Visit The Webpage{' '}<span className="material-symbols-outlined infoIcon">open_in_new</span></ListGroup.Item>)}
									{p.facebook && (
										<ListGroup.Item action as={Link} to={p.facebook} target={'_blank'}>Visit Their Facebook{' '}<span className="material-symbols-outlined infoIcon">open_in_new</span></ListGroup.Item>)}
									{p.instagram && (
										<ListGroup.Item action as={Link} to={p.instagram} target={'_blank'}>Visit Their Instagram{' '}<span className="material-symbols-outlined infoIcon">open_in_new</span></ListGroup.Item>)}
								</ListGroup>
								{p.images && (
									<div className="mb-3 imgWrap">
										{p.images.map(p => [
											<img key={p.photoUrl} src={p.photoUrl} alt={p.photoUrl}className="img-fluid rounded shadow w-25"/>
										])}
									</div>
								)}
							</Accordion.Body>
						</Accordion.Item>
					))}
				</Accordion>
			) : null}
		</Container>
	)
}

export default Places