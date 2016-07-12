var React = require('react');
var { Jumbotron } = require('react-bootstrap');

var JobsListPage = React.createClass({
	render: function() {
		return (
			<Jumbotron className="jumbotron">
				<h1>Hello, world!</h1>
				<p>The list of jobs will come here, eventually</p>
			</Jumbotron>
		);
	}
});

module.exports = JobsListPage;
