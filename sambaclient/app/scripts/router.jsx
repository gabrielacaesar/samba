var React = require('react');
var ReactDOM = require('react-dom');
var { Router, Route, IndexRoute, useRouterHistory } = require('react-router');
var MainFrame = require('pages/MainFrame.jsx');
var JobsListPage = require('pages/JobsListPage.jsx');
var JobDetailsPage = require('pages/JobDetailsPage.jsx');
var NewJobPage = require('pages/NewJobPage.jsx');
var ThemeWrapper = require('ThemeWrapper');

var createHashHistory = require('history/lib/createHashHistory');
var theHistory = useRouterHistory(createHashHistory)({ queryKey: false });

var routes = (
	<Router history={theHistory}>
		<Route name="Home" path="/" component={ThemeWrapper.wrap(MainFrame)}>
			<Route name="Jobs" path="jobs" component={ThemeWrapper.wrap(JobsListPage)} />
			<Route name="New job" path="new" component={ThemeWrapper.wrap(NewJobPage)} />
			<Route name="New job" path="jobs/:id" component={ThemeWrapper.wrap(JobDetailsPage)} />
			<IndexRoute component={ThemeWrapper.wrap(JobsListPage)} />
		</Route>
	</Router>
);

var content = document.createElement('div');
content.id = 'content';
document.body.appendChild(content);

exports.start = function() {
	ReactDOM.render(routes, content);
};
