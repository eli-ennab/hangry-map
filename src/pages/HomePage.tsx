import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import hangry from '../assets/img/ideogram(8).jpeg'

const HomePage = () => {
	return (
		<>
			<Container className="py-3">
				<Row>
					<Col md={{span: 10, offset: 1}}>
						<Image fluid rounded className={'mx-auto mb-5 w-75 d-block'} src={hangry} alt={'Courtesy of https://ideogram.ai/'}  />
						
						<div className={'indexWrap'}>
							<div>
								<h1>Hangry Map</h1>
								<p>Are you tired of those frustrating moments when hunger strikes, and you can't find a decent place to eat? Say goodbye to hanger-induced meltdowns because Hangry Map is here to save the day!</p>
							</div>	
							<div>
								<h2>Contribute to the Culinary Adventure!</h2>
								<p>At Hangry Map, we believe in the power of community and collective culinary wisdom. That's why we've made it super easy for you to contribute and add new places to our restaurant database. Whether you've stumbled upon a hidden gem or want to share a beloved local haunt, your input is invaluable.</p>
							</div>	
							<div>
								<h4>Why Contribute?</h4>
								
								<p>
									By adding new places to Hangry Map, you're not just satisfying your own cravings; you're helping hungry travelers and locals discover fantastic dining experiences they might have otherwise missed. Your culinary knowledge could be the key to someone's perfect meal.
									Join us in building the most comprehensive hangry-proof dining guide ever! Let's explore, share, and savor every culinary delight together. Start contributing today, and let the food adventures continue!
								</p>
								<h3 className={'text-center my-5'}>How to Add a New Place</h3>
								<p>
									<span>Register or Log In </span>
									To start contributing, please create an account or log in to your existing Hangry Map profile. This ensures that your contributions are properly attributed to you.
								</p>
								<p>
									<span>Add New Place </span>
									Once you're logged in, navigate to the "Add A Place" section. Here, you'll fill out the form and post it for review by one of our admin users!"
								</p>
								<p>
									<span>Fill in the Details </span>
									Provide as much information as possible about the new restaurant or cafe you'd like to add. Include its name, adress, city, contact information, cuisine type, and any other relevant details. The more information you provide, the better!
								</p>
								<p>
									<span>Submit for Review </span>
									After completing all the necessary details, hit the "Submit Place" button. Your submission will then undergo a quick review by our team to ensure accuracy and authenticity.
								</p>
								<p>
									<span>Upload Photos </span>
									Once Your submission is approved you (or other users) have the ability to upload a photo of the place, Don't forget to capture the ambiance and deliciousness with photos! Upload images to give fellow Hangry Map users a visual taste of what to expect.
								</p>
								
								<p>
									<span>Share the Love </span>
									Once your addition is approved, your newly added place will become accessible to the Hangry Map community. Share it with your friends, family, and fellow food enthusiasts to spread the love.
								</p>							
							</div>
						</div>
					
					</Col>
				</Row>
			</Container>
		</>
	)
}
    
export default HomePage