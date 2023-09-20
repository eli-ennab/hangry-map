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
					<Link to={`/places/${props.row.original._id}`}>Edit place </Link>
				)
			}),
		],
	}),
]