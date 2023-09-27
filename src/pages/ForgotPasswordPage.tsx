import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../services/firebase.ts'
import { ForgotPasswordFormData } from '../types/User.types.ts'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const ForgotPassword: React.FC = () => {
	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>()

	const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
		try {
			await sendPasswordResetEmail(auth, data.email);
			setMessage('Password reset email sent. Please check your inbox.')
		} catch (err) {
			setError('Error sending password reset email. Please try again.')
		}
	}

	return (
		<Container className={'py-3'}>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className={'mb-3'}>
						<Card.Body>
							<Card.Title className={'mb-3'}>Forgot Password</Card.Title>

							{message && <Alert variant='success'>{message}</Alert>}
							
							{error && <Alert variant='danger'>{error}</Alert>}

							<Form onSubmit={handleSubmit(onSubmit)}>
								<Form.Group controlId='email' className={'mb-3'}>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter your email'
										{...register('email', {
											required: 'Email is required'
										})}
									/>
									{errors.email && <p className={'text-danger'}>{errors.email.message}</p>}
								</Form.Group>

								<Button type='submit' className={'btnGradient'}>
									Send Password Reset Email
								</Button>
							</Form>

							<div className={'mt-3'}>
								Remembered? <Link to='/login'>Log In</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPassword
