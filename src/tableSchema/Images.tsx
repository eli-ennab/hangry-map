import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import {Image as TImages} from '../types/Image.types.ts'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import {approveImage} from '../services/firebase.ts'




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
				cell: props => (
					<Button onClick={() => {
						approveImage(props.row.original._id, props.row.original.isApproved, props.row.original.url, props.row.original.place_id)}} 
									variant={props.getValue() === true ? 'outline-success' : 'outline-danger'}>
						{props.getValue() === true ? 'Approved' : 'Not Approved'}</Button>
				)
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