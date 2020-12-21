import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {
	Navbar,
	Nav,
	Container,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
	const dispatch = useDispatch()

	const history = useHistory()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const logoutHandler = () => {
		history.push('/')
		dispatch(logout())
	}

	return (
		<header style={{ position: 'fixed', width: '100%', zIndex: '1090' }}>
			<Navbar bg='light' expand='lg' collapseOnSelect>
				<Container>
					<Link
						className='brandLink'
						to='/'
						style={{ fontSize: '23px', color: '#2b3e50' }}
					>
						🍄 Religion of Rogan
					</Link>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav' style={{ flex: 'none' }}>
						<Route render={({ history }) => <SearchBox history={history} />} />
						<Nav className='ml-auto' style={{ paddingLeft: '25px' }}>
							{userInfo && userInfo.isAdmin && (
								<>
									<Link
										className='navIcon'
										to='/posts/all'
										style={{ margin: '6px' }}
									>
										<OverlayTrigger
											overlay={
												<Tooltip id='allposts' style={{ zIndex: '2000' }}>
													See All Posts
												</Tooltip>
											}
											placement='bottom'
										>
											<i className='fas fa-book-dead'></i>
										</OverlayTrigger>
									</Link>
									<Link
										className='navIcon'
										to='/drafts/all'
										style={{ margin: '6px' }}
									>
										<OverlayTrigger
											overlay={
												<Tooltip id='allposts' style={{ zIndex: '2000' }}>
													See All Drafts
												</Tooltip>
											}
											placement='bottom'
										>
											<i className='fas fa-edit'></i>
										</OverlayTrigger>
									</Link>
									<Link
										className='navIcon'
										to='/ideas/all'
										style={{ margin: '6px' }}
									>
										<OverlayTrigger
											overlay={
												<Tooltip id='ideas' style={{ zIndex: '2000' }}>
													See Ideas
												</Tooltip>
											}
											placement='bottom'
										>
											<i className='far fa-lightbulb'></i>
										</OverlayTrigger>
									</Link>
									<Link
										className='navIcon'
										to='/nuggets/all'
										style={{ margin: '6px' }}
									>
										<OverlayTrigger
											overlay={
												<Tooltip id='nuggets' style={{ zIndex: '2000' }}>
													See Nuggets
												</Tooltip>
											}
											placement='bottom'
										>
											<i className='fas fa-cubes'></i>
										</OverlayTrigger>
									</Link>
									<Link
										className='navIcon'
										to='/emails/all'
										style={{ margin: '6px' }}
									>
										<OverlayTrigger
											overlay={
												<Tooltip id='emails' style={{ zIndex: '2000' }}>
													See Email List
												</Tooltip>
											}
											placement='bottom'
										>
											<i className='far fa-envelope'></i>
										</OverlayTrigger>
									</Link>
									<Link
										className='navIcon'
										to=''
										onClick={logoutHandler}
										style={{ margin: '6px' }}
									>
										<OverlayTrigger
											overlay={
												<Tooltip id='logout' style={{ zIndex: '2000' }}>
													Byebye
												</Tooltip>
											}
											placement='bottom'
										>
											<i className='fas fa-times'></i>
										</OverlayTrigger>
									</Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
