import useAuth from "../hooks/useAuth"
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

const DashboardPage = () => {
	const {currentUser} = useAuth()

	const exampleUsers = [
		{
			id: 1,
			email: 'eli@gmail.com',
		},
		{
			id: 2,
			email: 'harald@gmail.com',
		}
	]

	const exampleAdmins = [
		{
			id: 1,
			email: 'jonas@gmail.com',
		},
		{
			id: 2,
			email: 'johan@gmail.com',
		}
	]

	return currentUser ? (
		<Container>
			<h2>Users</h2>
			<Table responsive bordered hover>
				<thead>
					<th>Profile image</th>
					<th>User</th>
					<th>Id</th>
					<th>Admin status</th>
				</thead>
				<tbody>
					{exampleUsers.map(user => (
						<tr key={user.id}>
							<td>
								<Image 
									src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" 
									height={50} 
									width={50} 
									fluid 
								/>
							</td>
							<td>{user.email}</td>
							<td>{user.id}</td>
							<td>
								<Button>
									Change status
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<h2>Admin</h2>
			<Table responsive bordered hover width={100}>
				<thead>
					<th>Profile Image</th>
					<th>Admin</th>
					<th>Id</th>
				</thead>
				<tbody>
					{exampleAdmins.map(user => (
						<tr key={user.id}>
							<td>
								<Image 
									src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" 
									height={50} 
									width={50} 
									fluid 
								/>
							</td>
							<td>{user.email}</td>
							<td>{user.id}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	) : null
}

export default DashboardPage
