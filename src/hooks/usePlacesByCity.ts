import { useState, useEffect } from 'react'
import { query, where, getDocs } from 'firebase/firestore'
import { placeCol } from '../services/firebase.ts'
import { Place } from '../types/Places.types.ts'

const usePlacesByCity = (city: string) => {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlaces = async () => {
      const q = query(
        placeCol, 
        where('city', '==', city),
        where('isApproved', '==', true)
      )
      const querySnapshot = await getDocs(q)
      const placesData: Place[] = []
      querySnapshot.forEach((doc) => {
        placesData.push(doc.data() as Place)
      });
      setPlaces(placesData)
      setLoading(false)
    }

    fetchPlaces()
  }, [city])

  return { places, loading }
}

export default usePlacesByCity
