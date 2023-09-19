import {Timestamp} from 'firebase/firestore'

export type Image = {
	_id: string
	name: string
	created_at: Timestamp
	updated_at?: Timestamp
	isApproved: boolean
	size: number
	type: string
	uid?: string | null
	url: string
}