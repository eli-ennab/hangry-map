import { createColumnHelper } from '@tanstack/react-table'
import { User } from '../types/User.types.ts'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const columnUsersHelper = createColumnHelper<User>()

export const userColumns = (assignAdmin: (userId: string) => void) => [
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
				cell: (props) => (
					<Button
						onClick={() => assignAdmin(props.row.original._id)}
					>
						Assign as Admin
					</Button>
				)
			}),
		],
	}),
]