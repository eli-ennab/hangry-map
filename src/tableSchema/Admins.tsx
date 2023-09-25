import { createColumnHelper } from '@tanstack/react-table'
import { User } from '../types/User.types.ts'
import Image from 'react-bootstrap/Image'

const columnUsersHelper = createColumnHelper<User>()
	
export const adminColumns = [
	columnUsersHelper.group({
		header: 'Admins',
		columns: [
			
			columnUsersHelper.accessor('photoURL', {
				header: 'IMG',
				cell: props => (
					<Image height={50} width={50} roundedCircle src={props.getValue() || (`https://placehold.co/100x100?text=${props.row.original.name}` ?? 'N/A')} />
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