import useAuth from "../hooks/useAuth"
import Table from '../components/Table.tsx'
import useGetAdmins from "../hooks/useGetAdmins.ts"
import useGetPlaces from '../hooks/useGetPlaces.ts'
import useGetUsers from '../hooks/useGetUsers.ts'
import { placesColumns } from '../tableSchema/Places.tsx'
import { userColumns } from '../tableSchema/Users.tsx'
import { adminColumns } from '../tableSchema/Admins.tsx'
import Badge from 'react-bootstrap/Badge'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import useGetImages from '../hooks/useGetImages.ts'
import {imagesColumns} from '../tableSchema/Images.tsx'

const DashboardPage = () => {
	const { currentUser, onAssignAdmin } = useAuth()
	const {data: places} = useGetPlaces()
	const {data: users} = useGetUsers()
	const {data: admins} = useGetAdmins()
	const {data: images} = useGetImages()

	const assignAdmin = (userId: string) => {		
		if (!users || !userId) {
			return
		}
		
		const user = users.filter(user => user._id === userId)

		if (user[0]) {
			user[0].admin === !user[0].admin
		}

		onAssignAdmin(userId)
	}
	
	// const approvedPlaces = <Badge bg="success" text={'dark'}>{places?.filter(p => p.isApproved) .length}</Badge>
	// const allPlaces = <Badge bg="danger" className={''} text={'dark'}>{places?.length}</Badge>
	
	const placesBadge = <span className={'d-block'}> <Badge bg="success" text={'dark'}>{places?.filter(p => p.isApproved) .length}</Badge> of <Badge bg="danger" className={''} text={'dark'}>{places?.length}</Badge> approved </span>
	const imagesBadge = <span className={'d-block'}> <Badge bg="success" text={'dark'}>{images?.filter(i => i.isApproved) .length}</Badge> of <Badge bg="danger" className={''} text={'dark'}>{images?.length}</Badge> approved </span>
	
	const adminsCount = <span className={'d-block'}>  <Badge bg="primary" text={'dark'}>{admins?.length}</Badge></span>
	const userCount = <span className={'d-block'}>  <Badge bg="warning" text={'dark'}>{users?.length}</Badge></span>
	return currentUser && places && users && admins && images ? (
			<>
				<Tabs
					defaultActiveKey="places"
					className="table-tabs mb-3"
					fill
				>
					<Tab eventKey="places" title={!placesBadge || places?.filter(p => p.isApproved).length === places.length  ? <><span>Places</span><span className={'d-block'}>Nothing to approve</span></> : <>Places {placesBadge}</>}>
						<Table 
							columns={placesColumns} 	
							data={places} 
						/>
					</Tab>
					<Tab eventKey="images" title={!imagesBadge || images?.filter(i => i.isApproved).length === images.length  ? <>Images<span className={'d-block'}>Nothing to approve</span></> : <> Images {imagesBadge}</>}>
                        <Table 
                            columns={imagesColumns}
                            data={images} 
                        />
                    </Tab>
					<Tab eventKey="users" title={!userCount || users.length === 0 ? 'Users' : <>Users {userCount}</>}>
						<Table 
							columns={userColumns(assignAdmin)} 
							data={users} 
						/>
					</Tab>
					<Tab eventKey="admins" title={!adminsCount || admins.length === 0 ? 'Admins' : <>Admins {adminsCount}</>}>
						<Table 
							columns={adminColumns} 
							data={admins} 
						/>
					</Tab>
				</Tabs>
			</>
	) : null
}

export default DashboardPage
