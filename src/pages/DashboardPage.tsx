import useAuth from "../hooks/useAuth"
import PlacesTable from '../components/PlacesTable.tsx'
import useGetAdmins from "../hooks/useGetAdmins.ts"
import useGetPlaces from '../hooks/useGetPlaces.ts'
import useGetUsers from '../hooks/useGetUsers.ts'
import { placesColumns } from '../tableSchema/Places.tsx'
import { userColumns } from '../tableSchema/Users.tsx'
import { adminColumns } from '../tableSchema/Admins.tsx'
import Badge from 'react-bootstrap/Badge'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { userCol } from "../services/firebase.ts"

const DashboardPage = () => {
	const { currentUser } = useAuth()
	const { data: places } = useGetPlaces()
	const { data: users } = useGetUsers()
	const { data: admins } = useGetAdmins()

	const onAssignAdmin = async (id: string) => {
		const userRef = doc(userCol, id)
		await updateDoc(userRef, {
			admin: true,
			updated_at: serverTimestamp()
		})
	}
	
	const assignAdmin = (userId: string) => {
		console.log(`Assign as Admin clicked for user with ID: ${userId}`)
		
		if (!users || !userId) {
			return
		}
		
		const user = users.filter(user => user._id === userId)
		console.log(user[0].admin)

		if (user[0]) {
			user[0].admin === !user[0].admin
		}

		onAssignAdmin(userId)
	}
	
	// const approvedPlaces = <Badge bg="success" text={'dark'}>{places?.filter(p => p.isApproved) .length}</Badge>
	// const allPlaces = <Badge bg="danger" className={''} text={'dark'}>{places?.length}</Badge>
	
	const placesBadge = <span className={'d-block'}> <Badge bg="success" text={'dark'}>{places?.filter(p => p.isApproved) .length}</Badge> of <Badge bg="danger" className={''} text={'dark'}>{places?.length}</Badge> approved </span>
	const adminsCount = <span className={'d-block'}>  <Badge bg="primary" text={'dark'}>{admins?.length}</Badge></span>
	const userCount = <span className={'d-block'}>  <Badge bg="warning" text={'dark'}>{users?.length}</Badge></span>
	
	return currentUser && places && users && admins ? (
			<>
				<Tabs
					defaultActiveKey="places"
					className="table-tabs mb-3"
					fill
				>
					<Tab eventKey="places" title={!placesBadge  ? 'Places' : <>Places {placesBadge}</>}>
						<PlacesTable 
							columns={placesColumns} 	
							data={places} 
						/>
					</Tab>
					<Tab eventKey="users" title={!userCount || users.length === 0 ? 'Users' : <>Users {userCount}</>}>
						<PlacesTable 
							columns={userColumns(assignAdmin)} 
							data={users} 
						/>
					</Tab>
					<Tab eventKey="admins" title={!adminsCount || admins.length === 0 ? 'Admins' : <>Admins {adminsCount}</>}>
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
