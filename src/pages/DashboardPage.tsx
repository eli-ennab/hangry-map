import useAuth from "../hooks/useAuth"
import PlacesTable from '../components/PlacesTable.tsx'
import useGetPlaces from '../hooks/useGetPlaces.ts'
// import useGetUser from "../hooks/useGetUser.ts"
import useGetUsers from '../hooks/useGetUsers.ts'
import { placesColumns } from '../tableSchema/Places.tsx'
import { userColumns } from '../tableSchema/Users.tsx'

const DashboardPage = () => {
	const { currentUser } = useAuth()
	// const {data: user} = useGetUser(currentUser!.uid)
	const {data: places} = useGetPlaces()
	const {data: users} = useGetUsers()
	
	return currentUser && places && users ? (
			<>
				
				<PlacesTable 
					columns={placesColumns} 	
					data={places} 
				/>
				
				<PlacesTable 
					columns={userColumns} 
					data={users} 
				/>

			</>
		
	) : null
}

export default DashboardPage
