
import React, { useEffect, useMemo, useState } from "react"
import AutoComplete from "../components/AutoComplete"
import useGetPlacesApproved from "../hooks/useGetPlacesApproved"
import PlaceDetailsOffCanvas from "../components/PlaceDetailsOffCanvas"
import PlacesOffCanvas from "../components/PlacesOffCanvas"
import {LatLngLiteral, Place} from "../types/Places.types"
import { Button } from "react-bootstrap"
import Map from '../components/Map.tsx'


const HomePage = () => {

	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
	const [showPlacesCanvas, setShowPlacesCanvas] = useState(false)
	const [userPos, setUserPos] = useState<LatLngLiteral>({
		lat: 55.8604395,
		lng: 55.8604395,
	})
	const [zoom, setZoom] = useState(9)

	useEffect(() => {		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const newPos: LatLngLiteral = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				
				setZoom(14)
				setUserPos(newPos)
				
			}, (error) => {
				console.error("Error getting location:", error)
			})
		} else {
			console.log("Geolocation not supported")
		}
	}, [])
	return (
		<>

			
			
			<Map userPos={userPos} zoom={zoom} />


			
				
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