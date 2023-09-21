import { orderBy, where} from 'firebase/firestore'
import useStreamCollection from './useStreamCollection.ts'
import {User} from '../types/User.types.ts'
import {userCol} from '../services/firebase.ts'

const useGetUsers = () => {
    return useStreamCollection<User>(userCol, 
		orderBy('email'),
		where('admin', '==', false)
	)
}
    
export default useGetUsers