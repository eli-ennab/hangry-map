import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
	Libraries,
	Marker
} from "@react-google-maps/api"
import { useMemo, useState } from "react"
import AutoComplete from "../components/AutoComplete"
import useGetPlacesApproved from "../hooks/useGetPlacesApproved"

// css for map to cover screen
const containerStyle = {
	width: "100vw",
	height: "90vh",
}
//  type for geo object
export type LatLngLiteral = {
	lat: number
	lng: number
}

const HomePage = () => {
	const { data: places, loading } = useGetPlacesApproved()

	// states
	const [userPos, setUserPos] = useState<google.maps.LatLngLiteral>({
		// malmö, default position
		lat: 55.60503328539537,
		lng: 13.002552442039073,
	})
	const [marker, setMarker] = useState<google.maps.LatLngLiteral>({
		// malmö, default position
		lat: 55.60503328539537,
		lng: 13.002552442039073,
	})
	const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
		// malmö, default position
		lat: 55.60503328539537,
		lng: 13.002552442039073,
	})
	const [zoom, setZoom] = useState(14)

	// workaround for error when loading page
	const libraries: Libraries = useMemo(() => ["places"], [])

	//  google map init
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GMAP_API_KEY,
		libraries,
	})

	if (!isLoaded) return <div>Loading...</div>

	//  Get user location
	const getLocation = () => {
		console.log("Locating...")

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const newPos: LatLngLiteral = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
				console.log("Got location:", newPos)
				// update state with new values
				setZoom(14)
				setUserPos(newPos)
				setMarker(newPos)
			})
		} else {
			console.log("Geolocation not supported")
		}
	}

	// options for map
	const mapOptions = {
		zoom: zoom,
		center: userPos ?? mapCenter,
	}

	console.log(places)

	return (
		<>
			{/* input field with autocomplete functionallity */}
			{isLoaded && (
				<AutoComplete
					setZoom={setZoom}
					setUserPos={setUserPos}
					setMapCenter={setMapCenter}
					setMarker={setMarker}
				/>
			)}

			<hr></hr>

			{/* get user location */}
			<button onClick={getLocation}>Get Location</button>
			{userPos && (
				<span>
					User location:
					{userPos.lat} {userPos.lng}
				</span>
			)}

			<hr></hr>

			{/* main map view */}
			<GoogleMap options={mapOptions} mapContainerStyle={containerStyle}>
				{places && places.map(place => (
					<Marker
						key={place._id}
						position={{ lat: Number(place.lat), lng: Number(place.lng) }}
					//title={place.name}
					// onClick?
					/>
				))}
				<MarkerF position={marker} />
			</GoogleMap>
		</>
	)
}

export default HomePage