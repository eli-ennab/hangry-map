import { useState} from "react"
import {LatLngLiteral} from "../types/Places.types"
import Map from '../components/Map.tsx'
import Alert from 'react-bootstrap/Alert'
import {useSearchParams} from 'react-router-dom'
const HomePage = () => {	
	const [searchParams, setSearchParams] = useSearchParams()
	const latParam = searchParams.get('lat') 
	const lngParam = searchParams.get('lng') 
	
	const [fetchPos, setFetchPos] = useState(false)
	const [error, setError] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')
	
	const [mapCenter, setMapCenter] = useState<LatLngLiteral>(() => {
		if (latParam && lngParam) {
			return {
				lat: Number(latParam),
				lng: Number(lngParam),
			}
		}
		return {
			lat: 55.60505657215901,
			lng: 13.00283069278582,
		}
	})
	
	const [zoom, setZoom] = useState(13)	
	
	return (
			<>
				{error && <Alert variant="danger" className={'text-center mt-3 w-75 mx-auto'}>{errorMsg}</Alert>}
				{fetchPos && <Alert variant={'dark'} className={'text-center mt-3 w-75 mx-auto'}>Fetching your position...</Alert>}
				
				<Map zoom={zoom} setZoom={setZoom} mapCenter={mapCenter} setMapCenter={setMapCenter} />
				

			
			</>
	)
}

export default HomePage