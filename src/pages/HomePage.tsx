import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LatLngLiteral } from "../types/Places.types"
import Map from '../components/Map.tsx'
import Alert from 'react-bootstrap/Alert'

const HomePage = () => {
	const [searchParams] = useSearchParams()
	const latParam = searchParams.get('lat')
	const lngParam = searchParams.get('lng')
	
	const [fetchPos, setFetchPos] = useState(false)
	const [error, setError] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')

	const [userCity, setUserCity] = useState<string | null>(null)

	const navigate = useNavigate()
	const [mapCenter, setMapCenter] = useState<LatLngLiteral>(() => {
		if (latParam && lngParam) {
			return {
				lat: Number(latParam),
				lng: Number(lngParam),
			}
		}
		return {
			lat: 55.853268746696365,
			lng: 13.664624604034254,
		}
	})
	
	const [userPos, setuserPos] = useState<LatLngLiteral|null>(null)
	const [haveUserPos, setHaveUserPos] = useState(false)
	const [zoom, setZoom] = useState(10)

	useEffect(() => {
		if (latParam && lngParam) {
			const newCenter: LatLngLiteral = {
				lat: Number(latParam),
				lng: Number(lngParam),
			}
			setZoom(15)
			setMapCenter(newCenter)
		} else {
			getLocation()
		}
	}, [latParam, lngParam])

	useEffect(() => {
		const currentLat = mapCenter.lat.toFixed(7)
		const currentLng = mapCenter.lng.toFixed(7)

		if (currentLat !== latParam || currentLng !== lngParam) {
			navigate(`?lat=${currentLat}&lng=${currentLng}`)
		}
	}, [mapCenter])

	useEffect(() => {	
		setError(false)
		if (latParam && lngParam) {
			const fetchCityFromLatLng = async () => {
				try {
					const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latParam},${lngParam}&key=${import.meta.env.VITE_GMAP_API_KEY}`)
					const data = await response.json()
					const cityFromPlusCode = data.plus_code.compound_code.split(' ')[1].replace(',', '')
					if (cityFromPlusCode) {
						setUserCity(cityFromPlusCode)
					} else {
						setError(true)
						setErrorMsg('City not found..')
					}
				} catch (error) {
					setError(true)
					setErrorMsg(`Error fetching city from Google Maps API: ${error}`)
				}
			}
			fetchCityFromLatLng()
		}
	}, [latParam, lngParam])
	
	const getLocation = () => {
		setError(false)
		if (navigator.geolocation) {
			setFetchPos(true)
			navigator.geolocation.getCurrentPosition(async (position) => {
				const newPos: LatLngLiteral = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
				setZoom(15)
				setMapCenter(newPos)
				setFetchPos(false)
				setHaveUserPos(true)
				setuserPos(newPos)
				
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
	}

	return (
		<>
			{error && <Alert variant="danger" className={'text-center mt-3 w-75 mx-auto'}>{errorMsg}</Alert>}
			{fetchPos && <Alert variant={'dark'} className={'text-center mt-3 w-75 mx-auto'}>Fetching your position...</Alert>}
					
			
			<Map 
				zoom={zoom} 
				setZoom={setZoom} 
				mapCenter={mapCenter} 
				setMapCenter={setMapCenter} 
				onGetLocation={getLocation} 
				city={userCity} 
				haveUserPos={haveUserPos}
				userPos={userPos}/>
	</>
	)
}

export default HomePage