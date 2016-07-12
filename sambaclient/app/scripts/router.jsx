var React = require('react');
var ReactDOM = require('react-dom');
var { Router, Route, IndexRoute, browserHistory } = require('react-router');
var MainFrame = require('pages/MainFrame.jsx');
var JobsListPage = require('pages/JobsListPage.jsx');
var NewJobPage = require('pages/NewJobPage.jsx');

var routes = (
	<Router history={browserHistory}>
		<Route name="Home" path="/" component={MainFrame}>
			<Route name="Jobs" path="jobs" component={JobsListPage} />
			<Route name="New job" path="new" component={NewJobPage} />
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
