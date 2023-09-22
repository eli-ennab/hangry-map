import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useGetUser from '../../hooks/useGetUser.ts'
import logo from '../../images/logo.png'
// import logo_2 from '../../images/logo_2.png'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
	const {
		currentUser,
	} = useAuth()
	const userId = currentUser?.uid || 'no id'
	const {data: user} = useGetUser(userId)
	
	return (
		<Navbar className="navigation" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<Image src={logo} className="mx-2" height={35} alt="Hangry Map logo" />
					{/* <Image src={logo_2} className="mx-2" height={55} alt="Hangry Map logo" /> */}
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{currentUser || user?.admin ? (
							<> 
								{user?.admin ? <Nav.Link as={NavLink} to="/user/dashboard"><span className="admin">Dashboard</span></Nav.Link> : null}
								<Nav.Link as={NavLink} to="/user/update-profile">Update Profile</Nav.Link>
								<Nav.Link as={NavLink} to="/user/create-places">Create Places</Nav.Link>
								<Nav.Link as={NavLink} to="/logout">Log Out</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} to="/places">Places</Nav.Link>
								<Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
								<Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation