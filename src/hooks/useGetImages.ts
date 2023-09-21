import {orderBy} from 'firebase/firestore'
import useStreamCollection from './useStreamCollection.ts'
import {imgCol} from '../services/firebase.ts'
import {Image} from '../types/Image.types.ts'

const useGetPlacesApproved = () => {

    return useStreamCollection<Image>(imgCol, 
		orderBy('created_at'),
	)
}
    
export default useGetPlacesApproved