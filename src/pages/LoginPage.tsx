import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginCredentials } from '../types/User.types'
// style
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

const LoginPage = () => {
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const { handleSubmit, register, formState: { errors } } = useForm<LoginCredentials>()
	const navigate = useNavigate()
	const { login } = useAuth()

	const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
		setErrorMessage(null)

		try {
			setLoading(true)
			await login(data.email, data.password)
			navigate('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage("The stars was not aligned and the whole vibe was off, please try again.")
			}
			setLoading(false)
		}
	}

	return (
		<Container className="py-3">
			<Row>
				<Col md={{span: 6, offset: 3}}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Log In</Card.Title>

							{errorMessage && (<Alert variant="dark">{errorMessage}</Alert>)}

							<Form onSubmit={handleSubmit(onLogin)}>
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
											placeholder="mail@example.com"
											type="email"
											{...register('email', {
												required: 'E-Mail required'
											})}
										/>
									{errors.email && 
										<p>
											{errors.email.message ?? "Invalid value"}
										</p>
									}
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										{...register('password', {
											required: "Password required",
											minLength: {
												value: 6,
												message: "Please enter at least 6 characters"
											}
										})}
									/>
									{errors.password && 
										<p>
											{errors.password.message ?? "Invalid value"}
										</p>
									}
									<Form.Text>You must have least 6 characters</Form.Text>
								</Form.Group>

								<Button
										disabled={loading}
										className={'btnGradient'}
										type="submit"
									>
										{loading
											? "Logging in..."
											: "Log In"}
								</Button>
							</Form>

							<div>
								<Link to="/forgot-password">Did you forget your password?</Link>
							</div>
						</Card.Body>
					</Card>

					<div>
						Haven't signed up yet? <Link to="/signup">Sign Up</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginPage
