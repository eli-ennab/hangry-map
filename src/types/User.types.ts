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