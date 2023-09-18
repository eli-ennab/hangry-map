import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import {doc, setDoc, serverTimestamp} from "firebase/firestore";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	UserCredential,
	User,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

import {userCol} from '../services/firebase.ts'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential | undefined>,
	logout: () => Promise<void>
	signup: (email: string,	password: string) => Promise<UserCredential | undefined>
}

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [userEmail, setUserEmail] = useState<string | null>(null)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}
	
	const logout = () => {
		return signOut(auth)
	}

	const signup = async (email: string, password: string) => {
		const newUser = await  createUserWithEmailAndPassword(auth, email, password)
		const docRef = doc(userCol, newUser.user.uid)
		await setDoc(docRef, {
			_id: newUser.user.uid,
			email: email,
			created_at: serverTimestamp(),
			name: '',
			Photo_url: '',
			admin: false,		
		})		
		return newUser
	}




useEffect(() => {
	 return onAuthStateChanged(auth, (user) => {
		setCurrentUser(user)
		
		if (user) {
			
			setUserEmail(user.email)

		} else {
		
			setUserEmail(null)

		}
		setLoading(false)
	})
	
	
},[])

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				login,
				logout,
				signup,
			}}
		>
			{loading ? (<p>Loading</p>) : (<>{children}</>)}
		</AuthContext.Provider>
	)
}
export default AuthContextProvider
