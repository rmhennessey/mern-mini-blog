import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	postListReducer,
	postDetailsReducer,
	postSlugReducer,
	postCreateReducer,
	postUpdateReducer,
	postDeleteReducer,
} from './reducers/postReducers'
import {
	draftListReducer,
	draftDetailsReducer,
	draftCreateReducer,
	draftUpdateReducer,
	draftDeleteReducer,
} from './reducers/draftReducers'
import {
	ideaListReducer,
	ideaDetailsReducer,
	ideaCreateReducer,
	ideaUpdateReducer,
	ideaDeleteReducer,
} from './reducers/ideaReducers'
import {
	nuggetListReducer,
	nuggetDetailsReducer,
	nuggetCreateReducer,
	nuggetUpdateReducer,
	nuggetDeleteReducer,
} from './reducers/nuggetReducers'
import { emailListReducer, emailCreateReducer } from './reducers/emailReducers'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
	userLogin: userLoginReducer,
	postList: postListReducer,
	postDetails: postDetailsReducer,
	postSlug: postSlugReducer,
	postCreate: postCreateReducer,
	postUpdate: postUpdateReducer,
	postDelete: postDeleteReducer,
	draftList: draftListReducer,
	draftDetails: draftDetailsReducer,
	draftCreate: draftCreateReducer,
	draftUpdate: draftUpdateReducer,
	draftDelete: draftDeleteReducer,
	ideaList: ideaListReducer,
	ideaDetails: ideaDetailsReducer,
	ideaCreate: ideaCreateReducer,
	ideaUpdate: ideaUpdateReducer,
	ideaDelete: ideaDeleteReducer,
	nuggetList: nuggetListReducer,
	nuggetDetails: nuggetDetailsReducer,
	nuggetCreate: nuggetCreateReducer,
	nuggetUpdate: nuggetUpdateReducer,
	nuggetDelete: nuggetDeleteReducer,
	emailList: emailListReducer,
	emailCreate: emailCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
