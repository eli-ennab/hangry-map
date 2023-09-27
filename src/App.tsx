import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import CreatePlacesPage from './pages/CreatePlacesPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/MapPage.tsx'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import EditPlacePage from './pages/EditPlacePage.tsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import Index from './pages/HomePage.tsx'
import PlacesPage from './pages/PlacesPage.tsx'
import RequireAuth from './components/RequireAuth'
import SignupPage from './pages/SignupPage'
import UpdateProfilePage from './pages/UpdateProfilePage'

import './assets/App.scss'

const App = () => {
	return (
		<div id='app'>
			<Navigation />

			<Routes>

				{/* Guest Routes */}
				<Route path='/' element={<Index />} />
				<Route path='/map' element={<HomePage />} />
				<Route path='/places' element={<PlacesPage />} />

				<Route path='/login' element={<LoginPage />} />
				<Route path='/logout' element={<LogoutPage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				<Route path='*' element={<NotFound />} />

				{/* RequireAuth */}
				<Route path='/user/create-places' element={
					<RequireAuth>
						<CreatePlacesPage />
					</RequireAuth>
				} />

				<Route path='/user/update-profile' element={
					<RequireAuth>
						<UpdateProfilePage />
					</RequireAuth>
				} />

				<Route path='/user/dashboard' element={
					<RequireAuth>
						<DashboardPage />
					</RequireAuth>
				} />

				<Route path='/places/:id' element={
					<RequireAuth>
						<EditPlacePage />
					</RequireAuth>
				} />
			</Routes>
		</div>
	)
}

export default App
