var React = require('react');
var ReactDOM = require('react-dom');
var { Router, Route, IndexRoute, hashHistory } = require('react-router');
var MainFrame = require('pages/MainFrame.jsx');
var JobsListPage = require('pages/JobsListPage.jsx');
var JobDetailsPage = require('pages/JobDetailsPage.jsx');
var NewJobPage = require('pages/NewJobPage.jsx');

var routes = (
	<Router history={hashHistory}>
		<Route name="Home" path="/" component={MainFrame}>
			<Route name="Jobs" path="jobs" component={JobsListPage} />
			<Route name="New job" path="new" component={NewJobPage} />
			<Route name="New job" path="jobs/:id" component={JobDetailsPage} />
			<IndexRoute component={JobsListPage} />
		</Route>
	</Router>
);

var content = document.createElement('div');
content.id = 'content';
document.body.appendChild(content);

exports.start = function() {
	ReactDOM.render(routes, content);
};
