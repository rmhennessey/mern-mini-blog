import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import CreateBlogFob from './components/CreateBlogFob'
import PostScreen from './screens/PostScreen'
import PostListScreen from './screens/PostListScreen'
import PostEditScreen from './screens/PostEditScreen'
import PostCreateScreen from './screens/PostCreateScreen'
import DraftScreen from './screens/DraftScreen'
import DraftListScreen from './screens/DraftListScreen'
import DraftEditScreen from './screens/DraftEditScreen'
import DraftCreateScreen from './screens/DraftCreateScreen'
import IdeaListScreen from './screens/IdeaListScreen'
import IdeaEditScreen from './screens/IdeaEditScreen'
import IdeaCreateScreen from './screens/IdeaCreateScreen'
import NuggetListScreen from './screens/NuggetListScreen'
import NuggetCreateScreen from './screens/NuggetCreateScreen'
import NuggetEditScreen from './screens/NuggetEditScreen'
import EmailListScreen from './screens/EmailListScreen'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/emails/all' component={EmailListScreen} exact />
					<Route path='/posts/all' component={PostListScreen} exact />
					<Route path='/:slug' component={PostScreen} exact />
					<Route
						path='/posts/all:pageNumber'
						component={PostListScreen}
						exact
					/>
					<Route path='/posts/:id/edit' component={PostEditScreen} exact />
					<Route path='/posts/create' component={PostCreateScreen} exact />
					<Route path='/drafts/all' component={DraftListScreen} exact />
					<Route path='/drafts/:id/edit' component={DraftEditScreen} exact />
					<Route path='/drafts/view/:slug' component={DraftScreen} />
					<Route path='/drafts/create' component={DraftCreateScreen} exact />
					<Route path='/ideas/all' component={IdeaListScreen} exact />
					<Route path='/ideas/create' component={IdeaCreateScreen} exact />
					<Route path='/ideas/:id/edit' component={IdeaEditScreen} exact />
					<Route path='/nuggets/all' component={NuggetListScreen} exact />
					<Route path='/nuggets/create' component={NuggetCreateScreen} exact />
					<Route path='/nuggets/:id/edit' component={NuggetEditScreen} exact />
					<Route path='/gofish/xyz' component={LoginScreen} exact />
					<Route path='/tag/:tag' component={HomeScreen} exact />
					<Route
						path='/tag/:tag/page/:pageNumber'
						component={HomeScreen}
						exact
					/>
					<Route path='/search/:keyword' component={HomeScreen} exact />
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={HomeScreen}
						exact
					/>
					<Route path='/page/:pageNumber' component={HomeScreen} exact />
					<Route path='/' component={HomeScreen} exact />
				</Container>
				<CreateBlogFob />
			</main>
			<Footer />
		</Router>
	)
}

export default App
