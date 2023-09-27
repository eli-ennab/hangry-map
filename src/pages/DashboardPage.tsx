import useAuth from '../hooks/useAuth'
import Table from '../components/Table.tsx'
import useGetAdmins from '../hooks/useGetAdmins.ts'
import useGetImages from '../hooks/useGetImages.ts'
import useGetPlaces from '../hooks/useGetPlaces.ts'
import useGetUsers from '../hooks/useGetUsers.ts'
// table schema
import { adminColumns } from '../tableSchema/Admins.tsx'
import { placesColumns } from '../tableSchema/Places.tsx'
import { imagesColumns } from '../tableSchema/Images.tsx'
import { userColumns } from '../tableSchema/Users.tsx'
// style
import Badge from 'react-bootstrap/Badge'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const DashboardPage = () => {
	const { currentUser, onAssignAdmin } = useAuth()
	const { data: places } = useGetPlaces()
	const { data: users } = useGetUsers()
	const { data: admins } = useGetAdmins()
	const { data: images } = useGetImages()

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

	const placesBadge =
		<span className={'d-block'}>
			<Badge bg={'secondary'} className={'dashboard-badge m-1'}>{places?.filter(p => p.isApproved).length}</Badge> of {' '}
			<Badge bg={'secondary'} className={'dashboard-badge m-1'}>{places?.length}</Badge> approved
		</span>

	const imagesBadge =
		<span className={'d-block'}>
			<Badge bg={'secondary'} className={'dashboard-badge m-1'}>{images?.filter(i => i.isApproved).length}</Badge> of {' '}
			<Badge bg={'secondary'} className={'dashboard-badge m-1'}>{images?.length}</Badge> approved
		</span>

	const adminsCount =
		<span className={'d-block'}>
			<Badge bg={'secondary'} className={'dashboard-badge m-1'}>{admins?.length}</Badge>
		</span>

	const userCount =
		<span className={'d-block'}>
			<Badge bg={'secondary'} className={'dashboard-badge m-1'}>{users?.length}</Badge>
		</span>

	return currentUser && places && users && admins && images ? (
		<>
			<Tabs
				defaultActiveKey="places"
				className="table-tabs mb-3"
				fill
			>
				<Tab eventKey="places"
					title={!placesBadge || places?.filter(p => p.isApproved).length === places.length
						? <>
							<span>Places</span>
							<span className={'d-block'}>Nothing to approve</span>
						</> : <>Places {placesBadge}</>
					}>
					<Table
						columns={placesColumns}
						data={places}
					/>
				</Tab>
				<Tab eventKey="images"
					title={!imagesBadge || images?.filter(i => i.isApproved).length === images.length
						? <>
							<span>Images</span>
							<span className={'d-block'}>Nothing to approve</span>
						</> : <> Images {imagesBadge}</>
					}>
					<Table
						columns={imagesColumns}
						data={images}
					/>
				</Tab>
				<Tab eventKey="users"
					title={!userCount || users.length === 0
						? 'Users'
						: <>Users {userCount}</>
					}>
					<Table
						columns={userColumns(assignAdmin)}
						data={users}
					/>
				</Tab>
				<Tab eventKey="admins"
					title={!adminsCount || admins.length === 0
						? 'Admins'
						: <>Admins {adminsCount}</>
					}>
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
