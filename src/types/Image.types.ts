import { Timestamp } from 'firebase/firestore'

export type Image = {
	_id: string
	name: string
	created_at: Timestamp
	updated_at?: Timestamp
	isApproved: boolean
	uploadedBy: string | null
	url: string
	place: string
	place_id: string
}