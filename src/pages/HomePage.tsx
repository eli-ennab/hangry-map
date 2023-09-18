import { GoogleMap, LoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
	width: '100%',
	height: '500px',
}

// Malmö
const center = {
	lat: 55.604981,
	lng: 13.003822
}

const HomePage = () => {
	return (
		<LoadScript googleMapsApiKey={import.meta.env.VITE_GMAP_API_KEY}>
			<GoogleMap
				id="example-map"
				mapContainerStyle={mapContainerStyle}
				zoom={13}
				center={center}
			>

			</GoogleMap>
		</LoadScript>
	)
}

export default HomePage