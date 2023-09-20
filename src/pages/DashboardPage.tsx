import useAuth from "../hooks/useAuth"
import PlacesTable from '../components/PlacesTable.tsx'
import useGetAdmins from "../hooks/useGetAdmins.ts"
import useGetPlaces from '../hooks/useGetPlaces.ts'
import useGetUsers from '../hooks/useGetUsers.ts'
import { placesColumns } from '../tableSchema/Places.tsx'
import { userColumns } from '../tableSchema/Users.tsx'
import { adminColumns } from '../tableSchema/Admins.tsx'

const DashboardPage = () => {
	const { currentUser } = useAuth()
	const {data: places} = useGetPlaces()
	const {data: users} = useGetUsers()
	const {data: admins} = useGetAdmins()

	return currentUser && places && users && admins ? (
			<>
				<PlacesTable 
					columns={placesColumns} 	
					data={places} 
				/>

				<PlacesTable 
					columns={userColumns} 
					data={users} 
				/>

				<PlacesTable 
					columns={adminColumns} 
					data={admins} 
				/>
			</>
		
	) : null
}

export default DashboardPage
