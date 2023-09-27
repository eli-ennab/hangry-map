import React, {ChangeEvent, useEffect, useMemo, useState} from 'react'
import {GoogleMap, InfoWindowF, Libraries, MarkerF, useLoadScript} from '@react-google-maps/api'
import {orderBy, where} from 'firebase/firestore'
import usePlacesByCity from '../hooks/usePlacesByCity.ts'
import {LatLngLiteral} from '../types/Places.types.ts'
import AutoComplete from './AutoComplete.tsx'
import PlacesOffCanvas from './PlacesOffCanvas.tsx'
// img
import pin from '../assets/img/pin.png'
import needle from '../assets/img/needle.png'
// style
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import LoadingSpinner from './LoadingSpinner.tsx'
import UploadImage from './UploadImage.tsx'
import useAuth from '../hooks/useAuth.tsx'
import {PuffLoader} from 'react-spinners'

interface Props {
	zoom: number
	setZoom: React.Dispatch<React.SetStateAction<number>>
	mapCenter: LatLngLiteral
	setMapCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
	onGetLocation: () => void
	city: string | null
	haveUserPos: boolean
	userPos: LatLngLiteral | null | undefined
	fetchPos: boolean
	setFetchPos: React.Dispatch<React.SetStateAction<boolean>>
}

const Map: React.FC<Props> = ({
	zoom, 
	setZoom, 
	fetchPos, 
	setFetchPos, 
	mapCenter, 
	setMapCenter, 
	onGetLocation, 
	city, 
	haveUserPos, 
	userPos
}) => {
	const {currentUser} = useAuth()
	
	const [userCity, setUserCity] = useState<string | null>('Malmö')
	
	const queryConditions = useMemo(() => {
		return [orderBy('name'), where('city', '==', userCity!), where('isApproved', '==', true)]
	}, [userCity])
	
	const {data: places, loading} = usePlacesByCity(queryConditions)
	
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
	const libraries: Libraries = useMemo(() => ["places"], [])
	
	const {isLoaded} = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GMAP_API_KEY,
		libraries,
	})
	const handleActiveMarker = (marker: string) => {
		if (marker === activeMarker) return
		setActiveMarker(marker)
	}
	const onCatSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectCat(e.currentTarget.value)
	}
	const onOfferSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectOffer(e.currentTarget.value)
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
		return x * Math.PI / 180
	}
	
	const getDistance = (PLlat: number, PLlng: number, p1: LatLngLiteral | null | undefined) => {
		const p2: LatLngLiteral = {
			lat: PLlat,
			lng: PLlng
		}
		const R = 6378137
		const dLat = rad(p2.lat - p1!.lat)
		const dLong = rad(p2.lng - p1!.lng)
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(rad(p1!.lat)) * Math.cos(rad(p2.lat)) *
			Math.sin(dLong / 2) * Math.sin(dLong / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		const d = R * c
		return d
	}
	
	return (
		<>
			{loading && <LoadingSpinner/>}
			
			<div className={'sub-nav-menu-wrap'}>
				<div className={'sub-nav-menu'}>
					<div>				
						<Button
							onClick={() => setShowPlacesCanvas(true)}
						>
							<span className={'material-symbols-outlined align-middle'}>
								list
							</span>
						</Button>
						
						<Button onClick={() => {
							onGetLocation()
							setUserCity(city)
							setFetchPos(true)
						}}
						className={'mx-2'}
						>

						{fetchPos 
							? 	<PuffLoader color="#c3e6cb" size={20} cssOverride={{verticalAlign: 'middle' }} /> 
							: 	<span className="material-symbols-outlined align-middle">
									location_searching
								</span> 
						}
						</Button>

					</div>
					
					<AutoComplete
						setZoom={setZoom}
						setMapCenter={setMapCenter}
						onCitySelect={handleCitySelect}
					/>
					
					<div className={'selectWrap'}>
						<Form.Select size='sm' onChange={onCatSelect}>
							<option value=''>Select a category</option>
							{categories.map((category, index) =>
								<option key={index} value={category}>
									{category}
								</option>)
							}
						</Form.Select>
						
						<Form.Select size='sm' onChange={onOfferSelect}>
							<option value=''>Select type of offerings</option>
							{offerings.map((offering,index ) =>
								<option key={index} value={offering}>
									{offering}
								</option>)
							}
						</Form.Select>
					</div>
				</div>
			</div>
			
			{places && userPos ? (
				<PlacesOffCanvas
					filteredPlaces={filteredPlaces}
					show={showPlacesCanvas}
					onHide={() => setShowPlacesCanvas(false)}
					getDistance={getDistance}
					userPos={userPos}
					setActiveMarker={setActiveMarker}
					setInfoWindowCenter={setInfoWindowCenter}
				
				/>
			) : null}
			
			<GoogleMap
				onClick={() => setActiveMarker(null)}
				mapContainerStyle={{ width: '100vw', height: '91vh' }}
				options={{
					zoom: zoom,
					center: mapCenter,
					mapTypeControl: false,
				}}
				clickableIcons={false}
				onMouseDown={() => null}
			>
				
				{haveUserPos && userPos ? (<MarkerF
					position={userPos}
					icon={needle}
					onClick={() => setInfoWindowCenter(!infoWindowCenter)}
				>
					{infoWindowCenter && (
						<InfoWindowF onCloseClick={() => setInfoWindowCenter(!infoWindowCenter)} position={userPos}>
							<div className={'infoWindowWrap'}>Your location in {city}</div>
						</InfoWindowF>
					)}
				</MarkerF>) : null}
				
				
				{places && filteredPlaces.map(p => (
					<MarkerF
						icon={pin}
						key={p._id}
						position={{lat: Number(p.lat), lng: Number(p.lng)}}
						onClick={
							() => {
								handleActiveMarker(p._id)
								getDistance(p.lat!, p.lng!, userPos)
								setInfoWindowCenter(false)
							}}
					>
						
						{activeMarker === p._id ? (
							<InfoWindowF onCloseClick={() => setActiveMarker(null)}>
								<div className={'infoWindowWrap'} key={p._id}>
									<span className={'infoHeading'}>{p.name}</span>
									<p>{p.category} {' '} {p.offerings}</p>
									<p className={'my-2'}>{p.description}</p>
									<p className={'mb-2'}><a href={`tel:${p.phone}`}>{p.phone}</a></p>
									<p>{p.address}, {p.city}</p>
									
									{userPos ? (
										<>
											<p>{Math.ceil(getDistance(p.lat!, p.lng!, userPos)) / 1000} km from your position</p>
											<p>
												<a
													href={`https://www.google.se/maps/dir/${userPos.lat},${userPos.lng}${p.gMapsLink}`}
													target={'_blank'}
													className={'text-decoration-none'}>
														Google Maps Direction
													<span className="material-symbols-outlined infoIcon">
														open_in_new
													</span>
												</a>
											</p>
										</>
									) : null}

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
													className={'text-decoration-none'}
												>
													Visit
													<span className={'material-symbols-outlined infoIcon'}>
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
													className={'text-decoration-none'}
												>
													Visit
													<span className={'material-symbols-outlined infoIcon'}>
														open_in_new
													</span>
												</a>
											</p>
										)}

										{p.images && (
											<div className='my-3 imgWrap'>
												{p.images.map(p => [
													<img 
														key={p.photoUrl} 
														src={p.photoUrl} 
														alt={p.photoUrl} 
														className={'img-fluid rounded shadow w-25'} 
													/>
												])}
											</div>
										)}

										{currentUser ? (
											<div className={'w-75 mx-auto'}>
												<UploadImage place={p} text={'Add an image to this place'}/>
											</div>
										) : null}
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