import useGetPlacesApproved from '../hooks/useGetPlacesApproved.ts'
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import pin from '../assets/img/pin.png'
import LoadingSpinner from '../components/LoadingSpinner.tsx'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'

const PlacesPage = () => {
	const {data: places, loading} = useGetPlacesApproved()
	if (loading) return <LoadingSpinner />

	return (
		<Container className={'pt-3'}>
			<h2>Places</h2>
			{places && !loading ? (
				<Accordion>
					{places.map(p => (						
						<Accordion.Item eventKey={p._id}>
							<Accordion.Header><Image src={pin} />{p.name}, {p.city}</Accordion.Header>
							<Accordion.Body>
								<p>{p.offerings}{', '} {p.category}</p>								
								<p>"{p.description}"</p>
								<ListGroup variant="flush" className={'my-3'}>
									{p.phone && (
									<ListGroup.Item 
										key={p.phone} 
										action 
										as={Link} 
										to={`tel:${p.phone}`}
									>
											Phone number: {p.phone}
									</ListGroup.Item> )}
									<ListGroup.Item 
										key={p.address} 
									>
											Address: {p.address}, {p.city}
									</ListGroup.Item>
									
									{p.website && (
										<ListGroup.Item 
											key={p.website} 
											action 
											as={Link} 
											to={p.website} 
											target={'_blank'}>
												Visit their webpage{' '}
													<span className={'material-symbols-outlined infoIcon'}>
														open_in_new
													</span>
											</ListGroup.Item>)}
									{p.facebook && (
										<ListGroup.Item 
											key={p.facebook} 
											action 
											as={Link} 
											to={p.facebook} 
											target={'_blank'}>
												Visit their Facebook{' '}
													<span className={'material-symbols-outlined infoIcon'}>
														open_in_new
													</span>
										</ListGroup.Item>)}
									{p.instagram && (
										<ListGroup.Item 
											key={p.instagram} 
											action 
											as={Link} 
											to={p.instagram} 
											target={'_blank'}>
												Visit their Instagram{' '}
													<span className={'material-symbols-outlined infoIcon'}>
														open_in_new
													</span>
										</ListGroup.Item>)}
								</ListGroup>
								{p.images && (
									<div className={'mb-3 imgWrap'}>
										{p.images.map((p, index) => [
											<Image 
												key={index} 
												src={p.photoUrl} 
												alt={p.photoUrl}
												className={'img-fluid rounded shadow w-25'}
											/>
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

export default PlacesPage