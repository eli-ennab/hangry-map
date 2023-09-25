import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const useAuth = () => {
	const authContext = useContext(AuthContext)
	
	if (!authContext) {
		throw new Error("Trying to use AuthContext outside of AuthContextProvider")
	}
	
	return authContext
}
    
export default useAuth