import React from 'react'
import {createContext, useEffect, useState} from 'react'
import {auth} from '../services/firebase'
import {doc, updateDoc, setDoc, serverTimestamp} from "firebase/firestore";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	UserCredential,
	User,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	updateEmail,
	updatePassword
} from 'firebase/auth'

import {userCol} from '../services/firebase.ts'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential | undefined>,
	logout: () => Promise<void>
	signup: (email: string, password: string) => Promise<UserCredential | undefined>
	
	userEmail: string | null
	userName: string | null
	userPhotoUrl: string | null
	
	reloadUser: () => Promise<boolean>
	onNameChange: (name: string) => Promise<void>
	onMailChange: (email: string) => Promise<void>
	onPassword: (password: string) => Promise<void> | undefined
	onPhotoUrl: (photoUrl: string) => Promise<void> | undefined
}

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({children}) => {
	
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [userName, setUserName] = useState<string | null>(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)
	
	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}
	
	const logout = () => {
		return signOut(auth)
	}
	
	const signup = async (email: string, password: string) => {
		const newUser = await createUserWithEmailAndPassword(auth, email, password)
		const docRef = doc(userCol, newUser.user.uid)
		await setDoc(docRef, {
			_id: newUser.user.uid,
			email: email,
			created_at: serverTimestamp(),
			name: '',
			photoURL: '',
			admin: false,
		})
		return newUser
	}
	
	const onNameChange = async (name: string) => {
		if (!currentUser) return
		await updateProfile(currentUser, {displayName: name})
		const userRef = doc(userCol, currentUser?.uid)
		await updateDoc(userRef, {
			name,
			updated_at: serverTimestamp()
		})
	}
	
	const onMailChange = async (email: string) => {
		if (!currentUser) return		
		await updateEmail(currentUser, email)
		const userRef = doc(userCol, currentUser?.uid)
		await updateDoc(userRef, {
			email,
			updated_at: serverTimestamp()
		})		
	}
	
	const onPassword = (password: string) => {
		if (!currentUser) return
		return updatePassword(currentUser, password)
	}
	
	const onPhotoUrl = async (photoURL: string) => {
		if (!currentUser) return
		setUserPhotoUrl(photoURL)
		await updateProfile(currentUser, {photoURL})
		const userRef = doc(userCol, currentUser?.uid)
		await updateDoc(userRef, {
			photoURL,
			updated_at: serverTimestamp()
		})
	}
	
	const reloadUser = async () => {
		if (!auth.currentUser) {
			return false
		}
		await auth.currentUser.reload()
		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		setUserPhotoUrl(auth.currentUser.photoURL)
		return true
	}
	
	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			
			if (user) {
				setUserName(user.displayName)
				setUserEmail(user.email)
				setUserPhotoUrl(user.photoURL)
			} else {
				setUserName(null)
				setUserEmail(null)
				setUserPhotoUrl(null)
			}
			setLoading(false)
		})
	}, [])
	
	return (
		<AuthContext.Provider
			value={{
				currentUser,
				userEmail,
				userName,
				userPhotoUrl,
				login,
				logout,
				signup,
				onNameChange,
				onMailChange,
				onPassword,
				onPhotoUrl,
				reloadUser
			}}
		>
			{loading ? (<p>Loading</p>) : (<>{children}</>)}
		</AuthContext.Provider>
	)
}
export default AuthContextProvider
