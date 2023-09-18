import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const LogoutPage = () => {
	const navigate = useNavigate()
	const { logout } = useAuth()

	useEffect(() => {
		const logoutUser = async () => {
			await logout()
			setTimeout(() => navigate('/login'), 2000)
		}
		logoutUser()
	}, [logout, navigate])

	return (
		<Container className="">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">You are being logged out...</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default LogoutPage