import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useGetUser from '../../hooks/useGetUser.ts'
import logo from '../../assets/img/logo.png'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation = () => {
	const {
		currentUser,
	} = useAuth()
	const userId = currentUser?.uid || 'no id'
	const {data: user} = useGetUser(userId)
	
	return (
		<Navbar className={'navigation'} variant='dark' expand='md'>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					<Image src={logo} className={'mx-2'} height={35} alt='Hangry Map logo' />
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto align-middle'>
						{currentUser || user?.admin ? (
							<> 
								{user?.admin 
									?	<Nav.Link as={NavLink} to='/user/dashboard'>
										<span className='material-symbols-outlined align-middle mx-1'>
											table
										</span> 
										Dashboard
									</Nav.Link> 
									:	null
								}

								<Nav.Link as={NavLink} title={'The Map'} to='/map'>
									<span className='material-symbols-outlined align-middle mx-1'>
										map
									</span> 
									Map
								</Nav.Link>

								<Nav.Link as={NavLink} title={'List All Places'} to='/places'>
									<span className='material-symbols-outlined align-middle mx-1'>
										where_to_vote
									</span> 
									Places
								</Nav.Link>

								<Nav.Link as={NavLink} to='/user/create-places' title={'Add A Place'}>
									<span className='material-symbols-outlined align-middle mx-1'>
										note_add
									</span> 
									Add a place
								</Nav.Link>

								<NavDropdown
									title={currentUser?.photoURL 
											? 	<>
													<Image src={currentUser.photoURL} height={30} width={30} fluid roundedCircle />{' '}{currentUser.displayName} 
												</> 
											: 	currentUser?.displayName}
									>
										
									<NavDropdown.Item as={NavLink} to='/user/update-profile' title={'Update Profile'}>
										<span className={'material-symbols-outlined align-middle mx-1'}>
											manage_accounts
										</span> 
										Update profile
									</NavDropdown.Item>

									<NavDropdown.Divider />

									<NavDropdown.Item as={NavLink} to='/logout'>
										<span className={'material-symbols-outlined align-middle mx-1'}>
											logout
										</span> 
										Log Out
									</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} title={'The Map!'} to="/map">
									<span className={'material-symbols-outlined align-middle mx-1'}>
										map
									</span> 
									Map
								</Nav.Link>

								<Nav.Link as={NavLink} title={'List All Places!'} to='/places'>
									<span className={'material-symbols-outlined align-middle mx-1'}>
										where_to_vote
									</span> 
									Places
								</Nav.Link>

								<Nav.Link as={NavLink} title={'Sing Up Now!'} to='/signup'>
									<span className={'material-symbols-outlined align-middle mx-1'}>
										person_add
									</span> 
									Sign Up
								</Nav.Link>

								<Nav.Link as={NavLink} title={'Log In'} to='/login'>
									<span className={'material-symbols-outlined align-middle mx-1'}>
										login
									</span> 
									Log In
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation