import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { Place } from '../types/Places.types.ts'

const columnPlaceHelper = createColumnHelper<Place>()

export const placesColumns = [
	columnPlaceHelper.group({
		header: 'Place Details',
		columns: [
			columnPlaceHelper.accessor('name', {
				header: 'Name',
			}),
			columnPlaceHelper.accessor('city', {
				header: 'City',
			}),
			columnPlaceHelper.accessor('category', {
				header: 'Category',
			}),
			columnPlaceHelper.accessor('isApproved', {
				header: 'Approved',
				cell: props => (
					props.row.original.isApproved 
						? <span className={'material-symbols-outlined text-success'}> check </span> 
						: <span className={'material-symbols-outlined text-danger'}> cancel </span>
				)
			}),
			columnPlaceHelper.accessor('_id', {
				header: 'Edit Details',
				cell: props => (
					<Link to={`/places/${props.row.original._id}`}>
						<span className={'material-symbols-outlined'}>edit</span>
					</Link>
				)
			}),
		],
	}),
]
	
	