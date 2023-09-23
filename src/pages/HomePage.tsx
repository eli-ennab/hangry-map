import React, {useEffect, useMemo, useState} from "react"
import AutoComplete from "../components/AutoComplete"
import useGetPlacesApproved from "../hooks/useGetPlacesApproved"
import PlaceDetailsOffCanvas from "../components/PlaceDetailsOffCanvas"
import PlacesOffCanvas from "../components/PlacesOffCanvas"
import {LatLngLiteral, Place} from "../types/Places.types"
import {Button, Spinner} from "react-bootstrap"
import Map from '../components/Map.tsx'
import Alert from 'react-bootstrap/Alert'


const HomePage = () => {
	
	const [fetchPos, setFetchPos] = useState(false)
	const [error, setError] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')
	
	
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
	const [showPlacesCanvas, setShowPlacesCanvas] = useState(false)
	
	const [userPos, setUserPos] = useState<LatLngLiteral>({
		lat: 55.60500288357208,
		lng: 13.00195277298942
	})
	const [searchCenter, setSearchCenter] = useState<LatLngLiteral>({lat: 0,lng:0})
	const [zoom, setZoom] = useState(9)
	
	useEffect(() => {
		setError(false)
		if (navigator.geolocation) {
			setFetchPos(true)
			navigator.geolocation.getCurrentPosition((position) => {
				const newPos: LatLngLiteral = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
				
				setZoom(16)
				setUserPos(newPos)
				setFetchPos(false)
			}, (error) => {
				setErrorMsg(`Error getting location: ${error.message}. Try reloading and accept "Use your location" to get the best experience!  `)
				setFetchPos(false)
				setError(true)
			})
		} else {
			setErrorMsg("Geolocation not supported")
			setFetchPos(false)
			setError(true)
		}
	}, [])
	
	return (
			<>
				{error && <Alert variant="danger" className={'text-center mt-3 w-75 mx-auto'}>{errorMsg}</Alert>}
				{fetchPos && <Alert variant={'dark'} className={'text-center mt-3 w-75 mx-auto'}>Fetching your position...</Alert>}
				
				<Map userPos={userPos} setUserPos={setUserPos} zoom={zoom} setZoom={setZoom} searchCenter={searchCenter} setSearchCenter={setSearchCenter} />
				
				{/*<Button onClick={() => setShowPlacesCanvas(true)}>All places in your area</Button>*/}
				
				{/*<PlaceDetailsOffCanvas*/}
				{/*	selectedPlace={selectedPlace}*/}
				{/*	onHide={() => setSelectedPlace(null)}*/}
				{/*/>*/}
				
				{/*<PlacesOffCanvas*/}
				{/*	places={places}*/}
				{/*	show={showPlacesCanvas}*/}
				{/*	onHide={() => setShowPlacesCanvas(false)}*/}
				{/*/>*/}
			
			</>
	)
}

export default HomePage