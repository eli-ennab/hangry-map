import useAuth from './useAuth.tsx'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, serverTimestamp, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { imgCol, placeCol, storage } from '../services/firebase'
import { Place } from '../types/Places.types.ts'
import useGetUser from './useGetUser.ts'

const useUploadImg = () => {
    const {currentUser} = useAuth()
    if (!currentUser) {
        throw new Error('Error.')
    }
    const {data: user} = useGetUser(currentUser?.uid)
    const [progress, setProgress] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isError, setIsError] = useState<boolean | null>(null)
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
    const [isUploading, setIsUploading] = useState<boolean | null>(null)
    
    const upload = async (image: File, place: Place) => {
        setError(null)
        setIsError(null)
        setIsSuccess(null)
        setIsUploading(true)
        try {
            const uuid = uuidv4()
						
            const storageRef = ref(storage, `img/placePic/${place.name}/${uuid}.${image.name.substring(image.name.lastIndexOf('.') + 1) }`)
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on('state_changed', snapshot => {
                setProgress(
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10
                )
            })
            
            await uploadTask.then()
            const url = await getDownloadURL(storageRef)
            const docRef = doc(imgCol)
      
            await setDoc(docRef, {
                _id: docRef.id,
                name: image.name,
                created_at: serverTimestamp(),
                isApproved: !!user?.admin,
                uploadedBy: currentUser?.displayName,
                place_id: place._id,
                place: place.name,
                url: url
            })
			
            const getPlace = await  getDoc(doc(placeCol, place._id))
			const imgArr = getPlace.data()?.images
			const addPhoto = {photoUrl: user?.admin ? url : ''}
			imgArr?.push(addPhoto)
			
            await updateDoc(doc(placeCol, place._id), {
                images: imgArr, 
				updated_at: serverTimestamp(),
            })
            
            setIsSuccess(true)
            setIsUploading(false)
            setProgress(null)
			
        } catch (err) {
            console.log('Something went wrong with the upload', err)
            setIsError(true)
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Something unexpected happened, try again...')
            }
        } finally {
            setIsUploading(false)
            setTimeout(() => {
                setIsSuccess(null)
            }, 2000)
        }
    }
    if (!currentUser) return
    return {
        upload,
        progress,
        error,
        isError,
        isSuccess,
        isUploading
    }
}
    
export default useUploadImg