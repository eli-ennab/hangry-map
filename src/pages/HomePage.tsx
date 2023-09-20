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
import PlaceDetailsOffCanvas from "../components/PlaceDetailsOffCanvas"
import { Place } from "../types/Places.types"
import { Button } from "react-bootstrap"
import PlacesOffCanvas from "../components/PlacesOffCanvas"

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

	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
	const [showPlacesCanvas, setShowPlacesCanvas] = useState(false)

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
		mapTypeControl: false
	}

	console.log(places)

	return (
		<>
			<GoogleMap options={mapOptions} mapContainerStyle={containerStyle}>
				{places && places.map(place => (
					<Marker
						key={place._id}
						position={{ lat: Number(place.lat), lng: Number(place.lng) }}
						onClick={() => setSelectedPlace(place)}
					/>
				))}
				<MarkerF position={marker} />
			</GoogleMap>

			<div className="overlay-container">
				{isLoaded && (
					<AutoComplete
						setZoom={setZoom}
						setUserPos={setUserPos}
						setMapCenter={setMapCenter}
						setMarker={setMarker}
					/>
				)}

				<hr />

				<Button onClick={getLocation}>Get Location</Button>
				{userPos && (
					<span>
						User location:
						{userPos.lat} {userPos.lng}
					</span>
				)}

				<hr />
				<Button onClick={() => setShowPlacesCanvas(true)}>All places in your area</Button>

				<PlaceDetailsOffCanvas
					selectedPlace={selectedPlace}
					onHide={() => setSelectedPlace(null)}
				/>

				<PlacesOffCanvas
					places={places}
					show={showPlacesCanvas}
					onHide={() => setShowPlacesCanvas(false)}
				/>
			</div>
		</>
	)
}

export default HomePage