var React = require('react');
var { Jumbotron } = require('react-bootstrap');

var NewJobPage = React.createClass({
	render: function() {
		return (
			<Jumbotron className="jumbotron">
				<h1>Hello, world!</h1>
				<p>The form to create a new job will come here, eventually</p>
			</Jumbotron>
		);
	}
});

module.exports = NewJobPage;
