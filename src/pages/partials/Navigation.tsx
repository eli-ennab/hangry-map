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
					<Nav className="ms-auto align-middle">
						{currentUser || user?.admin ? (
							<> 
								{user?.admin ? <Nav.Link as={NavLink} to="/user/dashboard"><span className="material-symbols-outlined align-middle">table</span> Dashboard</Nav.Link> : null}
								<Nav.Link as={NavLink} to="/user/create-places"  title={'Add A Place'}><span className="material-symbols-outlined align-middle">note_add</span> Add a place</Nav.Link>
								<Nav.Link as={NavLink} to="/user/update-profile" title={'Update Profile'}><span className="material-symbols-outlined align-middle">manage_accounts</span> Update profile</Nav.Link>
								<Nav.Link as={NavLink} to="/logout"><span className="material-symbols-outlined align-middle">logout</span> Log Out</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} title={'List All Places'} to="/places">Places</Nav.Link>
								<Nav.Link as={NavLink} title={'Sing Up Now!'} to="/signup">Sign Up</Nav.Link>
								<Nav.Link as={NavLink} title={'Log In'} to="/login">Log In<span className="material-symbols-outlined align-middle">login</span></Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation