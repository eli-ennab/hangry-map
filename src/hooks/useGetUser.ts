import { userCol } from '../services/firebase'
import { User } from '../types/User.types.ts'
import useStreamDocument from './useStreamDocument.ts'

const useGetUser = (userId: string) => {
	return useStreamDocument<User>(userCol, userId)
}

export default useGetUser
