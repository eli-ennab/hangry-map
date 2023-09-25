import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { GoogleMap, InfoWindowF, Libraries, MarkerF, useLoadScript } from '@react-google-maps/api'
import { orderBy, where } from 'firebase/firestore'
import { LatLngLiteral } from '../types/Places.types.ts'
import AutoComplete from './AutoComplete.tsx'
import Form from 'react-bootstrap/Form'
import needle from '../assets/img/needle.png'
import pin from '../assets/img/pin.png'
import Alert from 'react-bootstrap/Alert'
import PlacesOffCanvas from './PlacesOffCanvas.tsx'
import usePlacesByCity from '../hooks/usePlacesByCity.ts'
import Button from 'react-bootstrap/Button'

interface Props {
	zoom: number
	setZoom: React.Dispatch<React.SetStateAction<number>>
	mapCenter: LatLngLiteral
	setMapCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
	onGetLocation: (city: string | null) => void
	city: string | null
	haveUserPos: boolean
}

const Map: React.FC<Props> = ({ zoom, setZoom, mapCenter, setMapCenter, onGetLocation, city, haveUserPos }) => {
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

	const [infoWindowCenter, setInfoWindowCenter] = useState(true)

	const [showPlacesCanvas, setShowPlacesCanvas] = useState(false)
	const [activeMarker, setActiveMarker] = useState<string | null>(null)
	const [selectCat, setSelectCat] = useState<string | null>(null)
	const [selectOffer, setSelectOffer] = useState<string | null>(null)
const [dist, setDist] = useState(0)
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

	const categories = [...new Set(places?.map(place => place.category))]
	const offerings = [...new Set(places?.map(place => place.offerings))]

	const filteredPlaces = places.filter(p =>
		(!selectCat || p.category === selectCat) &&
		(!selectOffer || p.offerings === selectOffer)
	)

	const handleCitySelect = (selectedCity: string) => {
		setUserCity(selectedCity)
	}
	const rad = (x: number) => {
		return x * Math.PI / 180;
	}

	const getDistance = (PLlat: number, PLlng: number, p1: LatLngLiteral) => {
		const p2: LatLngLiteral = {
			lat: PLlat,
			lng: PLlng
		}
		const R = 6378137
		const dLat = rad(p2.lat - p1.lat)
		const dLong = rad(p2.lng - p1.lng)
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
			Math.sin(dLong / 2) * Math.sin(dLong / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		const d = R * c
		//setDist(d)
		return d
	}

	const sortedFilteredPlaces = [...filteredPlaces].map(place => {
		const distance = getDistance(place.lat!, place.lng!, mapCenter)
		return {
			...place,
			distance
		}
	}).sort((a, b) => a.distance - b.distance)



	return (
		<>
			{loading && <Alert variant="dark" className={'text-center mt-3 w-75 mx-auto'}>Fetching places...</Alert>}

			<div className={'sub-nav-menu-wrap'}>
				<div className="sub-nav-menu">
					<Button
						onClick={() => setShowPlacesCanvas(true)}
						className="mb-2 my-1"
					>
						Places by city, category or offerings
					</Button>
					<Button onClick={() => {
						onGetLocation(city)
						setUserCity(city)
					}}
						className="mb-2 my-1"
					>
						Get your current location
					</Button>
					<AutoComplete
						setZoom={setZoom}
						setSearchMarker={setMapCenter}
						onCitySelect={handleCitySelect}
					/>
					<div className={'selectWrap'}>
						<Form.Select size="sm" onChange={onCatSelect}>
							<option value=''>Select a category</option>
							{categories.map(category =>
								<option value={category}>{category}</option>)
							}
						</Form.Select>

						<Form.Select size="sm" onChange={onOfferSelect}>
							<option value=''>Select type of offerings</option>
							{offerings.map(offering =>
								<option value={offering}>{offering}</option>)
							}
						</Form.Select>
					</div>
				</div>
			</div>

			<PlacesOffCanvas
				places={sortedFilteredPlaces}
				show={showPlacesCanvas}
				onHide={() => setShowPlacesCanvas(false)}
			/>

			<GoogleMap
				onClick={() => setActiveMarker(null)}
				mapContainerStyle={{ width: "100vw", height: '91vh' }}
				options={{
					zoom: zoom,
					center: mapCenter,
					mapTypeControl: false,
				}}
				clickableIcons={false}
				onMouseDown={() => null}
			>
				
				{haveUserPos ? (	<MarkerF
					position={mapCenter}
					icon={needle}
					onClick={() => setInfoWindowCenter(!infoWindowCenter)}
				>
					{infoWindowCenter && (
						<InfoWindowF onCloseClick={() => setInfoWindowCenter(!infoWindowCenter)} position={mapCenter} >
							<div className={'infoWindowWrap'}>Showing Places for {city}</div>
						</InfoWindowF>
					)}
				</MarkerF>): null}


				{sortedFilteredPlaces && sortedFilteredPlaces.map(p => (
					<MarkerF
						icon={pin}
						key={p._id}
						position={{ lat: Number(p.lat), lng: Number(p.lng) }}
						onClick={
						() => {
							handleActiveMarker(p._id)
							getDistance(p.lat!, p.lng!, mapCenter)
						} }
					>

						{activeMarker === p._id ? (
							<InfoWindowF onCloseClick={() => setActiveMarker(null)}>
								<div className={'infoWindowWrap'}>
									<span className={'infoHeading'}>{p.name}</span>
									<p>{p.category} {' '} {p.offerings}</p>
									<p className={'my-2'}>{p.description}</p>
									<p className={'mb-2'}><a href={`tel:${p.phone}`}>{p.phone}</a></p>
									<p>{p.address}, {p.city}</p>
									
									{/*TODO lägga till formatering av talet!*/}
									<p>Distance: {Math.ceil(p.distance!)} meters from your position</p>
									<p>
										<a
											href={`https://www.google.se/maps/dir/${mapCenter.lat},${mapCenter.lng}${p.gMapsLink}`}
											target={'_blank'}
											className="text-decoration-none">
											Google Maps Direction
											<span className="material-symbols-outlined infoIcon">
												open_in_new
											</span>
										</a>
									</p>
									<div>
										{p.website && (
											<p>
												<a
													href={p.website}
													target={'_blank'}
													className="text-decoration-none">
													{p.website}
													<span className="material-symbols-outlined infoIcon">
														open_in_new
													</span>
												</a>
											</p>
										)}
										{p.facebook && (
											<p><strong>Facebook:</strong>{' '}
												<a
													href={p.facebook}
													target={'_blank'}
													className="text-decoration-none">
													Visit
													<span className="material-symbols-outlined infoIcon">
														open_in_new
													</span>
												</a>
											</p>
										)}
										{p.instagram && (
											<p><strong>Instagram:</strong>{' '}
												<a
													href={p.instagram}
													target={'_blank'}
													className="text-decoration-none">
													Visit
													<span className="material-symbols-outlined infoIcon">
														open_in_new
													</span>
												</a>
											</p>
										)}
										{p.images && (
											<div className="my-3 imgWrap">
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