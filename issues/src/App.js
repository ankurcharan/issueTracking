import React from 'react';
import { Switch, Route } from "react-router-dom";

import { Home } from "./components/Home/Home.jsx";
import { Issues } from './components/Issues/Issues.jsx';
import { Issue } from './components/Issue/Issue';
import { AddIssue } from './components/Issue/AddIssue.jsx';

function App() {
	return (
			<div className="container">
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/issues/:id' component={Issues} />
					<Route path='/issue/:id' component={Issue} />
					<Route path='/add-issues' component={AddIssue} />
				</Switch>
			</div>
		);
	}
	
	export default App;
	