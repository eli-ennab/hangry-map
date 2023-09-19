import useAuth from '../hooks/useAuth'
import UpdateProfile from '../components/UpdateProfile.tsx'
const UpdateProfilePage = () => {
	
	const {
		userEmail,
		userName,
		userPhotoUrl,
		currentUser,
		onNameChange,
		onMailChange,
		onPassword,
		onPhotoUrl,
		reloadUser
	} = useAuth()
	
	if (!currentUser) {
		return (<p>Loading ...</p>)
	}
	
	return (
		<UpdateProfile 
				currentUser={currentUser}
				userName={userName}
				userEmail={userEmail}
				userPhotoUrl={userPhotoUrl}
				onNameChange={onNameChange}
				onMailChange={onMailChange}
				onPassword={onPassword}
				onPhotoUrl={onPhotoUrl}
				reloadUser={reloadUser}
				
		/>	
	)
}

export default UpdateProfilePage