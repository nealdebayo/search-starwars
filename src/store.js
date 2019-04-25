import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Starwars from './reducers/Starwars.reducer';
import SortOption from './reducers/SortOption';
import Loading from './reducers/Loading';
import Error from './reducers/Error';

const loggerMiddleware = createLogger()

const Store = (state = {}) => {

	const middlewares = [
			thunkMiddleware,
			loggerMiddleware
	]

	return createStore(
		combineReducers({
			SortOption,
			Starwars,
			Loading,
			Error
		}),
		state,
		applyMiddleware(...middlewares)
	)

}

export default Store

