import useAuth from "../hooks/useAuth"
import PlacesTable from '../components/PlacesTable.tsx'
import useGetAdmins from "../hooks/useGetAdmins.ts"
import useGetPlaces from '../hooks/useGetPlaces.ts'
import useGetUsers from '../hooks/useGetUsers.ts'
import { placesColumns } from '../tableSchema/Places.tsx'
import { userColumns } from '../tableSchema/Users.tsx'
import { adminColumns } from '../tableSchema/Admins.tsx'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const DashboardPage = () => {
	const { currentUser } = useAuth()
	const {data: places} = useGetPlaces()
	const {data: users} = useGetUsers()
	const {data: admins} = useGetAdmins()

	return currentUser && places && users && admins ? (
			<>
				<Tabs
					defaultActiveKey="places"
					className="table-tabs mb-3"
					fill
				>
					<Tab eventKey="places" title="Places">
						<PlacesTable 
							columns={placesColumns} 	
							data={places} 
						/>
					</Tab>
					<Tab eventKey="users" title="Users">
						<PlacesTable 
							columns={userColumns} 
							data={users} 
						/>
					</Tab>
					<Tab eventKey="admins" title="Admins">
						<PlacesTable 
							columns={adminColumns} 
							data={admins} 
						/>
					</Tab>
				</Tabs>
			</>
	) : null
}

export default DashboardPage
