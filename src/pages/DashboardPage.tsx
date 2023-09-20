import { createColumnHelper } from '@tanstack/react-table'
import useAuth from "../hooks/useAuth"
import { Link } from 'react-router-dom'
import PlacesTable from '../components/PlacesTable.tsx'
import useGetPlaces from '../hooks/useGetPlaces.ts'
import useGetUser from "../hooks/useGetUser.ts"
import useGetUsers from '../hooks/useGetUsers.ts'
import { Place } from '../types/Places.types.ts'
import { User } from '../types/User.types.ts'
import Image from 'react-bootstrap/Image'
import UploadImage from '../components/UploadImage.tsx'
import useGetPlace from '../hooks/useGetPlace.ts'
const DashboardPage = () => {
	const { currentUser } = useAuth()
	const {data: user} = useGetUser(currentUser!.uid)
	const {data: places} = useGetPlaces()
	const {data: users} = useGetUsers()
	
	const columnPlaceHelper = createColumnHelper<Place>()
	const columnUsersHelper = createColumnHelper<User>()
	
	const columns = [
		columnPlaceHelper.group({
			header: 'Place Details',
			columns: [
				columnPlaceHelper.accessor('name', {
					header: 'Name',
				}),
				columnPlaceHelper.accessor('address', {
					header: 'Address',
				}),
				columnPlaceHelper.accessor('city', {
					header: 'City',
				}),
				columnPlaceHelper.accessor('category', {
					header: 'Category',
				}),
				columnPlaceHelper.accessor('isApproved', {
					header: 'Is Approved',
				}),
				columnPlaceHelper.accessor('_id', {
					header: '',
					cell: props => (
						<Link to={`/places/${props.row.original._id}`}>
							Edit place
						</Link>
					)
				}),
			],
		}),
	]	
	
	const userColumns = [
		columnUsersHelper.group({
			header: 'Users',
			columns: [
				
				columnUsersHelper.accessor('photoURL', {
					header: 'IMG',
					cell: props => (
						<Image className={'w-25'} src={props.getValue()} />
					)
				}),
				columnUsersHelper.accessor('name', {
					header: 'Name',
				}),
				columnUsersHelper.accessor('email', {
					header: 'E-Mail',
				}),
				columnUsersHelper.accessor('admin', {
					header: 'Admin',
				}),
			],
		}),
	]
	return currentUser && places && users ? (
			<>
			<PlacesTable columns={columns} data={places} />
			<PlacesTable columns={userColumns} data={users} />

			</>
		
		// <Container>
		// 	<h2>Users</h2>
		// 	<Table responsive bordered hover>
		// 		<thead>
		// 			<th>Profile image</th>
		// 			<th>User</th>
		// 			<th>Id</th>
		// 			<th>Admin status</th>
		// 		</thead>
		// 		<tbody>
		// 			{exampleUsers.map(user => (
		// 				<tr key={user.id}>
		// 					<td>
		// 						<Image
		// 							src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
		// 							height={50}
		// 							width={50}
		// 							fluid
		// 						/>
		// 					</td>
		// 					<td>{user.email}</td>
		// 					<td>{user.id}</td>
		// 					<td>
		// 						<Button>
		// 							Change status
		// 						</Button>
		// 					</td>
		// 				</tr>
		// 			))}
		// 		</tbody>
		// 	</Table>
		//
		// 	<h2>Admin</h2>
		// 	<Table responsive bordered hover width={100}>
		// 		<thead>
		// 			<th>Profile Image</th>
		// 			<th>Admin</th>
		// 			<th>Id</th>
		// 		</thead>
		// 		<tbody>
		// 			{exampleAdmins.map(user => (
		// 				<tr key={user.id}>
		// 					<td>
		// 						<Image
		// 							src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
		// 							height={50}
		// 							width={50}
		// 							fluid
		// 						/>
		// 					</td>
		// 					<td>{user.email}</td>
		// 					<td>{user.id}</td>
		// 				</tr>
		// 			))}
		// 		</tbody>
		// 	</Table>
		//
		// 	<PlacesList onApprove={handleApprove} />
		// </Container>
	) : null
}

export default DashboardPage
