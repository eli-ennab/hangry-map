import { createColumnHelper } from '@tanstack/react-table'
import useAuth from "../hooks/useAuth"

import PlacesTable from '../components/PlacesTable.tsx'
import useGetPlaces from '../hooks/useGetPlaces.ts'
import useGetUser from "../hooks/useGetUser.ts"
import useGetUsers from '../hooks/useGetUsers.ts'

import { User } from '../types/User.types.ts'
import Image from 'react-bootstrap/Image'


import {placesColumns} from '../tableSchema/Places.tsx'

const DashboardPage = () => {
	const { currentUser } = useAuth()
	const {data: user} = useGetUser(currentUser!.uid)
	const {data: places} = useGetPlaces()
	const {data: users} = useGetUsers()
	

	const columnUsersHelper = createColumnHelper<User>()
	
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
				
			<PlacesTable columns={placesColumns} data={places} />
			<PlacesTable columns={userColumns} data={users} />

			</>
		
	) : null
}

export default DashboardPage
