import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { GoogleMap, InfoWindowF, Libraries, MarkerF, useLoadScript } from '@react-google-maps/api'
import useGetPlacesApproved from '../hooks/useGetPlacesApproved.ts'
import { LatLngLiteral } from '../types/Places.types.ts'
import AutoComplete from './AutoComplete.tsx'
import Form from 'react-bootstrap/Form'
import person from '../assets/img/person.png'
import pin from '../assets/img/pin.png'
import Animation = google.maps.Animation
import Alert from 'react-bootstrap/Alert'
import PlacesOffCanvas from './PlacesOffCanvas.tsx'
import { Button } from 'react-bootstrap'
import usePlacesByCity from '../hooks/usePlacesByCity.ts'
import { orderBy, where } from 'firebase/firestore'

interface Props {
	zoom: number
	setZoom: React.Dispatch<React.SetStateAction<number>>
	mapCenter: LatLngLiteral
	setMapCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
	onGetLocation: (city: string | null) => void
	city: string | null
}

const Map: React.FC<Props> = ({ zoom, setZoom, mapCenter, setMapCenter, onGetLocation, city }) => {

	const [userCity, setUserCity] = useState<string | null>('Malmö')

	const queryConditions = useMemo(() => {
		return [orderBy('name'), where('city', '==', userCity!), where('isApproved', '==', true)]
	}, [userCity])

	const { data: places, loading } = usePlacesByCity(userCity!, queryConditions)


	useEffect(() => {
		if (city) {
			setUserCity(city)
		}
	}, [city])

	//const {data: places, loading} = useGetPlacesApproved()

	const [showPlacesCanvas, setShowPlacesCanvas] = useState(false)
	const [activeMarker, setActiveMarker] = useState<string | null>(null)
	const [selectCat, setSelectCat] = useState<string | null>(null)
	const [selectOffer, setSelectOffer] = useState<string | null>(null)

	const libraries: Libraries = useMemo(() => ["places"], [])

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GMAP_API_KEY,
		libraries,
	})

	const handleActiveMarker = (marker: string) => {
		if (marker === activeMarker) return
		setActiveMarker(marker)
	}


	const onCatSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectCat(e.currentTarget.value);
	}

	const onOfferSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectOffer(e.currentTarget.value);
	}

	if (!isLoaded) return <div id={'initial-loader'}>Loading Map</div>

	if (!places) return
	const filtCatPlaces = places.filter(p => p.category === selectCat)
	const filtOfferPlaces = places.filter(p => p.offerings === selectOffer)

	const handleCitySelect = (selectedCity: string) => {
		setUserCity(selectedCity)
	}


	return (
		<>
			{loading && <Alert variant="dark" className={'text-center mt-3 w-75 mx-auto'}>Fetching places...</Alert>}

			<div className={'sub-nav-menu-wrap'}>
				<div className="sub-nav-menu">
					<Button onClick={() => setShowPlacesCanvas(true)}>All places in your area</Button>
					<Button onClick={() => {
						onGetLocation(city)
						setUserCity(city)
					}}>Get Current Location</Button>
					<AutoComplete
						setZoom={setZoom}
						setSearchMarker={setMapCenter}
						onCitySelect={handleCitySelect}
					/>
					<div className={'selectWrap'}>
						<Form.Select size="sm" onChange={onCatSelect}>
							<option value=''>Select a category</option>
							<option value="Café">Café</option>
							<option value="Restaurant">Restaurant</option>
							<option value="FastFood">Fastfood</option>
							<option value="KioskGrill">Kiosk/Grill</option>
							<option value="FoodTruck">Foodtruck</option>
						</Form.Select>

						<Form.Select size="sm" onChange={onOfferSelect}>
							<option value=''>Select type of offerings</option>
							<option value="Lunch">Lunch</option>
							<option value="AfterWork">After work</option>
							<option value="Dinner">Dinner/Á la carte</option>
						</Form.Select>
					</div>
				</div>
			</div>

			<PlacesOffCanvas
				places={places}
				show={showPlacesCanvas}
				onHide={() => setShowPlacesCanvas(false)}
			/>

			<GoogleMap
				onClick={() => setActiveMarker(null)}
				mapContainerStyle={{ width: "100dvw", height: '91dvh' }}
				options={{
					zoom: zoom,
					center: mapCenter,
					mapTypeControl: false,
				}}
				clickableIcons={false}
				onMouseDown={() => null}
			>

				<MarkerF
					position={mapCenter}
					icon={person}
				// animation={Animation.BOUNCE}
				/>

				{places && places.map(p => (
					<MarkerF
						icon={pin}
						// animation={Animation.DROP}
						key={p._id}
						position={{ lat: Number(p.lat), lng: Number(p.lng) }}
						onClick={() => handleActiveMarker(p._id)}
					>

						{activeMarker === p._id ? (
							<InfoWindowF onCloseClick={() => setActiveMarker(null)}>
								<div className={'infoWindowWrap'}>
									<span className={'infoHeading'}>{p.name}</span>
									<p>{p.category} {' '} {p.offerings}</p>
									<p>{p.description}</p>

									<p><strong>Directions:</strong>{' '}
										<a href={p.gMapsLink} target={'_blank'} className="text-decoration-none">Google Maps Directions <span className="material-symbols-outlined infoIcon">open_in_new</span></a>
									</p>
									<div>
										{p.website && (
											<p><strong>Website:</strong>{' '}
												<a href={p.website} target={'_blank'} className="text-decoration-none">{p.website}
													<span className="material-symbols-outlined infoIcon">open_in_new</span></a>
											</p>
										)}
										{p.facebook && (
											<p><strong>Facebook:</strong>{' '}
												<a href={p.facebook} target={'_blank'} className="text-decoration-none">Visit <span className="material-symbols-outlined infoIcon">open_in_new</span></a>
											</p>
										)}
										{p.instagram && (
											<p><strong>Instagram:</strong>{' '}
												<a href={p.instagram} target={'_blank'} className="text-decoration-none">{p.instagram}
													<span className="material-symbols-outlined infoIcon">open_in_new</span></a>
											</p>
										)}
										{p.images && (
											<div className="mb-3 imgWrap">
												{p.images.map(p => [
													<img key={p.photoUrl} src={p.photoUrl} alt={p.photoUrl} className="img-fluid rounded shadow w-25" />
												])}
											</div>
										)}
									</div>
								</div>

							</InfoWindowF>
						) : null}

					</MarkerF>
				))}

			</GoogleMap>
		</>
	)
}

export default Map