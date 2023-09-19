import useAuth from './useAuth.tsx'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {doc, serverTimestamp, setDoc} from 'firebase/firestore'
import {imgCol, storage} from '../services/firebase'
const useUploadImg = () => {
    const { currentUser } = useAuth()
    
    const [progress, setProgress] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    const [isError, setIsError] = useState<boolean | null>(null)
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
    const [isUploading, setIsUploading] = useState<boolean | null>(null)
    const upload = async (image: File) => {
        setError(null)
        setIsError(null)
        setIsSuccess(null)
        setIsUploading(true)
        try {
            const uuid = uuidv4()
            const storageRef = ref(storage, `img/placePic/${uuid}.${image.name.substring(image.name.lastIndexOf(".") + 1) }`)
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on('state_changed', snapshot => {
                setProgress(
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10
                )
            })
            await uploadTask.then()
            const url = await getDownloadURL(storageRef)
            setUrl(url)
            const docRef = doc(imgCol)
      
            await setDoc(docRef, {
                _id: docRef.id,
                name: image.name,
                created_at: serverTimestamp(),
                isApproved: false,
                size: image.size,
                type: image.type,
                uid: currentUser?.uid,
                url: url
            })
            
            //  TODO add url to the place in places collection in firestore
            
            setIsSuccess(true)
            setIsUploading(false)
            setProgress(null)
        } catch (err) {
            console.log("Something went wrong with the upload", err)
            setIsError(true)
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Something unexpected happened, try again... ")
            }
        } finally {
            setIsUploading(false)
            setTimeout(() => {
                setIsSuccess(null)
            },2000)
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