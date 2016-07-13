var React = require('react');
var ReactDOM = require('react-dom');
var { Router, Route, IndexRoute, useRouterHistory } = require('react-router');
var MainFrame = require('pages/MainFrame.jsx');
var JobsListPage = require('pages/JobsListPage.jsx');
var JobDetailsPage = require('pages/JobDetailsPage.jsx');
var NewJobPage = require('pages/NewJobPage.jsx');

var createHashHistory = require('history/lib/createHashHistory');
var theHistory = useRouterHistory(createHashHistory)({ queryKey: false });

var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;

var routes = (
	<Router history={theHistory}>
		<Route name="Home" path="/" component={wrap(MainFrame)}>
			<Route name="Jobs" path="jobs" component={wrap(JobsListPage)} />
			<Route name="New job" path="new" component={wrap(NewJobPage)} />
			<Route name="New job" path="jobs/:id" component={wrap(JobDetailsPage)} />
			<IndexRoute component={wrap(JobsListPage)} />
		</Route>
	</Router>
);

var content = document.createElement('div');
content.id = 'content';
document.body.appendChild(content);

exports.start = function() {
	ReactDOM.render(routes, content);
};

function wrap(component) {
	return React.createClass({
		render: function() {
			return (
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					{React.createElement(component, this.props)}
				</MuiThemeProvider>
			);
		}
	});
}
