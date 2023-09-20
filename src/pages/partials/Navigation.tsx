import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useGetUser from '../../hooks/useGetUser.ts'

const Navigation = () => {
	const {
		currentUser,
	} = useAuth()
	const userId = currentUser?.uid || 'no id'
	const {data: user} = useGetUser(userId)
	
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">HangryMap</Navbar.Brand>

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
							<p>No user</p>
								<Nav.Link as={NavLink} to="/tips">Tips</Nav.Link>
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