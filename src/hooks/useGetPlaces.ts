import {orderBy, where} from 'firebase/firestore'
import useStreamCollection from './useStreamCollection.ts'
import {placeCol,} from '../services/firebase.ts'
import {Place} from '../types/Places.types.ts'

const useGetPlaces = () => {

    return useStreamCollection<Place>(placeCol, 
		orderBy('name'),
		where('isApproved', '==', true)
	)
}
    
export default useGetPlaces