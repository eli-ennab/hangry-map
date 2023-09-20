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

	return user?.admin === true && places && users ? (
		<>
			<PlacesTable columns={columns} data={places} />
			<PlacesTable columns={userColumns} data={users} />
		</>

	) : <p>You must be an Admin to access the Dashboard.</p>
}

export default DashboardPage
