import {Routes, Route} from 'react-router-dom'

import './assets/App.scss'

const App = () => {
  return (
	<Routes>
				
		{/* Guest Routes */}
		<Route path="/" element={ <HomePage/> }/>

		<Route path="/login" element={<LoginPage/>}/>
		<Route path="/logout" element={<LogoutPage/>}/>
		<Route path="/signup" element={<SignupPage/>}/>

		<Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
		<Route path="*" element={<NotFound/>}/>

		
		<Route path="/tips" element={}/>
	
		<Route path="/places" element={}/>
		<Route path="/places/:id" element={}/>

		{/* RequireAuth */}
		<Route path="/user/:id" element={}/>
		<Route path="/user/:id/create" element={}/>
		<Route path="/user/:id/update-profile" element={}/>

	</Routes>

  )
}

export default App
