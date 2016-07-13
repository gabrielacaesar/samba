var React = require('react');
var { Card, CardHeader, CardMedia, CardActions, FlatButton } = require('material-ui');

var NewJobPage = React.createClass({
	render: function() {
		return (
			<Card>
				<CardHeader
					title="The list of jobs"
					subtitle="Subtitle" //inputFile
					avatar="http://lorempixel.com/100/100/nature/" //status
				/>
				<CardMedia>
					<img src="http://lorempixel.com/600/337/nature/" />
				</CardMedia>
				<CardActions>
					<FlatButton label="Action1" />
					<FlatButton label="Action2" />
				</CardActions>
			</Card>
		);
	}
});

module.exports = NewJobPage;
