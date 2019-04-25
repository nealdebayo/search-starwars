import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';


it('renders without crashing', () => {
	const middlewares = [thunk]
	const mockStore = configureMockStore(middlewares)
	const initialState = {Error: {value: false},
						Loading:  { value : false},
						SortOption:  { option : 'none'},
						Starwars: {total: 0, results: []}}
	const store = mockStore(initialState)

	const div = document.createElement('div');
	ReactDOM.render(<Provider store={store}>
						<App />
					</Provider>, div);
	ReactDOM.unmountComponentAtNode(div);
});
