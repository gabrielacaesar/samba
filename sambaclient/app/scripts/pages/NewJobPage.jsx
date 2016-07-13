var React = require('react');
var { Card, CardHeader, CardText, CardActions, FlatButton, RaisedButton, TextField, Avatar, Snackbar } = require('material-ui');
var JobService = require('services/JobService');

var BackupIcon = require('material-ui/svg-icons/action/backup').default;

var NewJobPage = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			input: '',
			error: false
		};
	},
	submit: function() {
		var self = this;
		self.setState({
			loading: true,
			error: false
		});
		JobService
			.create(this.state.input)
			.then(function(response) {
				if(response.status == 200) {
					self.setState({ loading: false, input: '', error: false });
					self.props.history.push(`/jobs/${response.data.id}`);
				} else {
					self.setState({error: true});
				}
			});
	},
	navigateToList: function() {
		this.props.history.push('/');
	},
	updateValue: function(e) {
		this.setState({
			input: e.target.value
		});
	},
	render: function() {
		return (
			<div>
				<Card style={{maxWidth: '60%', display: 'block', margin: 'auto', marginTop: '16px', marginBottom: '16px'}}>
					<CardHeader
						title="Create new job"
						subtitle="Subtitle" //inputFile
						avatar={<Avatar icon={<BackupIcon />} />}
					/>
				<CardText style={{paddingTop: 0}}>
						<TextField
							ref="input"
							hintText="Place an S3 link here"
							floatingLabelText="Input file"
							fullWidth={true}
							value={this.state.input}
							onChange={this.updateValue}
						/>
					</CardText>
					<CardActions>
						<FlatButton label="Cancel" onClick={this.navigateToList}/>
						<RaisedButton label="Submit" onClick={this.submit} primary style={{float: 'right'}}/>
					</CardActions>
				</Card>

				<Snackbar
					open={this.state.error}
					message="Eita! Algo deu erado!"
					autoHideDuration={4000}
		        />
			</div>
		);
	}
});

module.exports = NewJobPage;
