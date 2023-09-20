
import {doc, serverTimestamp, updateDoc} from 'firebase/firestore'
import {imgCol, placeCol} from '../services/firebase.ts'
import UploadImage from '../components/UploadImage.tsx'
import useGetPlace from '../hooks/useGetPlace.ts'

import useUploadImg from '../hooks/useUploadImg.ts'

const UploadImgPage = () => {
	// const { currentUser } = useAuth()
	// const {data: user} = useGetUser(currentUser!.uid)
	const {data: place} = useGetPlace('Cx6xibYTb2rLHnsidoMn')
	const uploadImg = useUploadImg()
	const updateDb = async () => {
		if (!uploadImg || !place || !uploadImg.imgRef) {
			return
		}
		console.log(place._id)
		console.log(uploadImg.url)
		const placeDocRef = doc(placeCol, place._id)
		const imgDocRef = doc(imgCol, uploadImg.imgRef)
		await updateDoc(placeDocRef, {
			photoUrl: uploadImg?.url,
			updated_at: serverTimestamp()
		})
		
		await updateDoc(imgDocRef, {
			place_id: place?._id,
			updated_at: serverTimestamp()
		})
	}
    return (
        <>
			<UploadImage place={place} />
        </>
    ) 
}
    
export default UploadImgPage