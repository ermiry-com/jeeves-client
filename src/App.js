import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect }  from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

// main components
import Landing from './components/main/Landing';

// auth components
import Login from './components/auth/Login';

// dashboard
import Jobs from './components/dashboard/Jobs';
import Job from './components/dashboard/Job';

// other
import NotFound from './router/NotFound'
// import PrivateRoute from './router/PrivateRoute';

// my actions
import { user_token_check } from './actions/authActions';

user_token_check (store);

class App extends Component {

	render () {
		return (
			<Provider store= { store }>
				<Router>
					<div className="App">
						<Switch>
							{/* Main */}
							<Route exact path='/' component={ Landing } />

							{/* Main */}
							<Route exact path="/login" component={ Login } />

							{/* Dashboard */}
							<Route exact path="/jobs" component={ Jobs } />
							<Route exact path="/job/:job_id" component={ Job } />

							{/* Other */}
							<Route exact path='/404' component={ NotFound } />
							<Redirect to="/404" />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}

}

export default App;