import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	UserCredential,
	User,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

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

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
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
