import { Timestamp } from "firebase/firestore"

export type LoginCredentials = {
	email: string
	password: string
}

export type SignUpCredentials = {
	email: string
	password: string
	passwordConfirm: string
	admin: boolean
}

export type ForgotPasswordFormData = {
	email: string
}

export type UpdateProfileFormData = {
	name: string
	photoFile: FileList
	email: string
	password: string
	passwordConfirm: string
	admin: boolean
}

export type User = {
	_id: string
	name: string
	email: string
	photoURL: string
	admin: boolean
	created_at: Timestamp
}