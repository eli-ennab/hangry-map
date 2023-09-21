import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import {Image as TImages} from '../types/Image.types.ts'
import Image from 'react-bootstrap/Image'



const imagesColumnsHelper = createColumnHelper<TImages>()

export const imagesColumns = [
	imagesColumnsHelper.group({
		header: 'Place Details',
		columns: [
			imagesColumnsHelper.accessor('url', {
				header: 'Picture',
				cell: props => (
					<Image className={'w-25'} src={props.getValue()} />
				)
			}),
			imagesColumnsHelper.accessor('name', {
				header: 'Title',
			}),
	
			imagesColumnsHelper.accessor('created_at', {
				header: 'Added',
				cell: props => (
					<>
						<span className={'d-block'}>{props.getValue().toDate().toLocaleDateString()}</span>
						<span>{props.getValue().toDate().toLocaleTimeString()}</span>
					</>
				)
			}),
			imagesColumnsHelper.accessor('uploadedBy', {
				header: 'Added by',
			}),
			imagesColumnsHelper.accessor('isApproved', {
				header: 'Is Approved',
			}),
			imagesColumnsHelper.accessor('place', {
				header: 'Place',
				cell: props => (
					<Link to={`/places/${props.row.original._id}`}>{props.getValue()}</Link>
				)
			}),
		],
	}),
]