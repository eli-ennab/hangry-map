import { useParams } from 'react-router-dom'
import useGetPlace from '../hooks/useGetPlace'

const PlacePage = () => {
	const { id } = useParams()
	const { data: place } = useGetPlace(id!)

	if (!id) {
		throw new Error("Error.")
	}
	
	return (
		<>
			{place && 
				<>
					<h1 className="mb-3">{place.name}</h1>
				</>
			}
		</>
	)
}

export default PlacePage