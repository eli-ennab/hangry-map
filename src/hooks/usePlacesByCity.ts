import { QueryConstraint } from 'firebase/firestore';
import { placeCol } from '../services/firebase.ts';
import { Place } from '../types/Places.types.ts';
import useStreamCollectionWithConditions from './useStreamCollectionWithConditions.ts';

const usePlacesByCity = (city: string, queryConditions: QueryConstraint[]) => {
	// console.log(`Fetching places for city: ${city} and isApproved: true`)
    return useStreamCollectionWithConditions<Place>(
        placeCol, 
        queryConditions
    )
}

export default usePlacesByCity;