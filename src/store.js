import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

// my reducers
import rootReducer from './reducers';

let initialState = {};

const middleware = [thunk];

let store = (
		process.env.NODE_ENV === 'development' ? createStore (
			rootReducer, 
			initialState, 
			compose (applyMiddleware (...middleware),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ ())) 
			
			: 

			createStore (
				rootReducer, 
				initialState, 
				compose (applyMiddleware (...middleware)))
);



// const composeEnhancers = composeWithDevTools ({
//     // options like actionSanitizer, stateSanitizer
// });

// const store = createStore (
//     rootReducer, 
//     initialState, 
//     composeEnhancers (
//         applyMiddleware (...middleware),
//         // other store enhancers if any
//     ));


export default store;