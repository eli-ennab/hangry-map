import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import {
	CollectionReference,
	collection,
	DocumentData,
	getFirestore,
	updateDoc,
	serverTimestamp, doc, getDoc
} from "firebase/firestore"
import { User } from '../types/User.types'
import {Place} from '../types/Places.types.ts'
import {Image} from '../types/Image.types.ts'
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)

const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>
}

export const approveImage = async (imgDocRef: string, isApproved: boolean, url: string, placeDocRef: string) => {
	console.log(isApproved)
	await updateDoc(doc(imgCol, imgDocRef), {
		updated_at: serverTimestamp(),
		isApproved: !isApproved
	})
	
	const getPlace = await  getDoc(doc(placeCol,placeDocRef))
	const imgArr = getPlace.data()?.images
	
	if (!isApproved) {
		const addPhoto = {photoUrl:  url}
		imgArr?.push(addPhoto)
		await updateDoc(doc(placeCol, placeDocRef), {
				images: imgArr
		})
	}
	if (isApproved) {
		const newImgArrWithoutImg = imgArr?.filter(f => f.photoUrl !== url)
		await updateDoc(doc(placeCol, placeDocRef), {
			images: newImgArrWithoutImg
		})
	}
}

export const userCol = createCollection<User>('users')
export const placeCol = createCollection<Place>('places')
export const imgCol = createCollection<Image>('images')

export default app