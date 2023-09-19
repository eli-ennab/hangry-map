import useAuth from "../hooks/useAuth"
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import PlacesList from "../components/PlaceList"
import PlacesTable from '../components/PlacesTable.tsx'
import useGetPlaces from '../hooks/useGetPlaces.ts'
import {createColumnHelper} from '@tanstack/react-table'
import {Place} from '../types/Places.types.ts'
import useGetUsers from '../hooks/useGetUsers.ts'
import {User} from '../types/User.types.ts'
import useGetUser from "../hooks/useGetUser.ts"

const DashboardPage = () => {
	const { currentUser } = useAuth()
	const {data: user} = useGetUser(currentUser!.uid)

	const exampleUsers = [
		{
			id: 1,
			email: 'eli@gmail.com',
		},
		{
			id: 2,
			email: 'harald@gmail.com',
		}
	]

	const exampleAdmins = [
		{
			id: 1,
			email: 'jonas@gmail.com',
		},
		{
			id: 2,
			email: 'johan@gmail.com',
		}
	]

	const handleApprove = (placeId: string) => {
		// approval logic to be 
		console.log(`Approved place with ID: ${placeId}`)
	}
	
const  {data: places} = useGetPlaces()
const  {data: users} = useGetUsers()
	
	const columnPlaceHelper = createColumnHelper<Place>()
	const columnUsersHelper = createColumnHelper<User>()
	
	const columns = [
		columnPlaceHelper.group({
			header: 'Place Details',
			columns: [
				columnPlaceHelper.accessor('name', {
					header: 'Name',
					// cell: props => (
					// 	<Link to={`/authors/${props.row.original.id}`}>
					// 		{props.getValue()}
					// 	</Link>
					// )
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
				columnPlaceHelper.accessor('_id', {
					header: 'ID',
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

	return user?.admin === true && places && users ? (
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
	) : <p>You must be an Admin to access the Dashboard.</p>
}

export default DashboardPage
