import { placeCol } from '../services/firebase'
import { Place } from '../types/Places.types.ts'
import useStreamDocument from './useStreamDocument.ts'

const useGetPlace = (placeId: string) => {
	return useStreamDocument<Place>(placeCol, placeId)
}

export default useGetPlace
