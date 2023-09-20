import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import CreatePlacesPage from './pages/CreatePlacesPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import PlacePage from './pages/PlacePage'
import RequireAuth from './components/RequireAuth'
import SignupPage from './pages/SignupPage'
import TipsPage from './pages/TipsPage'
import UpdateProfilePage from './pages/UpdateProfilePage'

import './assets/App.scss'

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

				<Route path="/user/update-profile" element={
					<RequireAuth>
						<UpdateProfilePage />
					</RequireAuth>
				}/> 

				<Route path="/user/dashboard" element={
					<RequireAuth>
						<DashboardPage />
					</RequireAuth>
				}/> 

				<Route path="/places/:id" element={
					<RequireAuth>
						<PlacePage />
					</RequireAuth>
				}/> 
			</Routes>
		</div>
	)
}

export default App
