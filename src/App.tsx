import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LogoutPage from './pages/LogoutPage'
import NotFound from './pages/NotFound'
import TipsPage from './pages/TipsPage'
import CreatePlacesPage from './pages/CreatePlacesPage'

import './assets/App.scss'
import UpdateProfile from './pages/UpdateProfile'

const App = () => {
	return (
		<div id='app'>
			<Navigation />

			<Routes>

				{/* Guest Routes */}
				<Route path="/" element={<HomePage />} />

				<Route path="/login" element={<LoginPage />}/>
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/signup" element={<SignupPage />} />

				{/* <Route path="/forgot-password" element={<ForgotPasswordPage />}/> */}
				<Route path="*" element={<NotFound />} />

				<Route path="/tips" element={<TipsPage />} />

				<Route path="/create-place" element={<CreatePlacesPage />} />

				{/*

            <Route path="/places" element={}/>
            <Route path="/places/:id" element={}/>

            {/* RequireAuth */}
			
            <Route path="/update-profile" element={<UpdateProfile />}/> 

			</Routes>
		</div>
	)
}

export default App
