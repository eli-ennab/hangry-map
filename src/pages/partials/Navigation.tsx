import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">HangryMap</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/tips">Tips</Nav.Link>
						<Nav.Link as={NavLink} to="/places">Places</Nav.Link>
						<Nav.Link as={NavLink} to="/update-profile">Update Profile</Nav.Link>
						<Nav.Link as={NavLink} to="/create-place">Create Places</Nav.Link>
						<Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
						<Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
						<Nav.Link as={NavLink} to="/logout">Log Out</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation