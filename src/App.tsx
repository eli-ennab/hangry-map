import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import CreatePlacesPage from './pages/CreatePlacesPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LogoutPage from './pages/LogoutPage'
import NotFound from './pages/NotFound'
import TipsPage from './pages/TipsPage'
import RequireAuth from './components/RequireAuth'

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
				<Route path="/tips" element={<TipsPage />} />
				{/* <Route path="/forgot-password" element={<ForgotPasswordPage />}/> */}
				<Route path="*" element={<NotFound />} />

				{/* RequireAuth */}
				<Route path="/user/create-places" element={
					<RequireAuth>
						<CreatePlacesPage />
					</RequireAuth>
				}/> 

				{/* <Route path="/user/update-profile" element={
					<RequireAuth>
						<UpdateProfilePage />
					</RequireAuth>
				}/>  */}

				<Route path="/user/dashboard" element={
					<RequireAuth>
						<DashboardPage />
					</RequireAuth>
				}/> 
			</Routes>
		</div>
	)
}

export default App
