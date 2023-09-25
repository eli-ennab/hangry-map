import {CollectionReference, onSnapshot, query, QueryConstraint} from 'firebase/firestore'
import {useEffect, useState} from 'react'
const useStreamCollectionWithConditions = <T>(
	colRef: CollectionReference<T>,
	queryConstraints: QueryConstraint[]
) => {
	const [data, setData] = useState<T[]|null>(null)
	const [loading, setLoading] = useState(true)
	
	useEffect( () => {
		const queryRef = query(colRef, ...queryConstraints)
		return onSnapshot(queryRef, (snapshot) => {
			const data: T[] = snapshot.docs.map(doc => {
				return {
					...doc.data(),
					_id: doc.id,
				}
			})
			setData(data)
			setLoading(false)
		})
		
	}, [colRef, queryConstraints])
	
	return {
		data,
		loading,
	}
}

export default useStreamCollectionWithConditions