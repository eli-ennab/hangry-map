import { createColumnHelper } from '@tanstack/react-table'
import { User } from '../types/User.types.ts'
import Image from 'react-bootstrap/Image'

const columnUsersHelper = createColumnHelper<User>()
	
export const userColumns = [
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