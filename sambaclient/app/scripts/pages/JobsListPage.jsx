var React = require('react');
var { Card, CardHeader, CardText, List, ListItem, LinearProgress, FloatingActionButton } = require('material-ui');
var JobService = require('services/JobService');
var _ = require('lodash');

var AutoRenewIcon = require('material-ui/svg-icons/action/autorenew').default;
var DoneIcon = require('material-ui/svg-icons/action/done').default;
var ErrorIcon = require('material-ui/svg-icons/alert/error-outline').default;
var ContentAddIcon = require('material-ui/svg-icons/content/add').default;

var JobsListPage = React.createClass({
	getInitialState: function() {
		return {
			loading: true,
			jobs: []
		};
	},
	componentDidMount: function() {
		this.loadJobs();
	},
	loadJobs: function() {
		var self = this;
		self.setState({loading: true});
		JobService.list().then(function(response) {
			self.setState({
				jobs: response.data,
				loading: false
			});
		});
	},
	navigateToJobDetails: function(id) {
		this.props.history.push(`/jobs/${id}`);
	},
	navigateToNewJob: function() {
		this.props.history.push('/new');
	},
	render: function() {
		return (
			<div>
				<Card style={{maxWidth: '60%', display: 'block', margin: 'auto', marginTop: '16px', marginBottom: '16px'}}>
					<CardText>
						{ this.state.loading && <LinearProgress mode="indeterminate" /> }
						{
							!this.state.loading &&
								<List>
									{ _.map(this.state.jobs, this.renderRow) }
								</List>
						}
					</CardText>
				</Card>

				<FloatingActionButton
					secondary={true}
					onClick={this.navigateToNewJob}
					style={{margin: 24, position: 'absolute', bottom: 0, right: 0}}
				>
					<ContentAddIcon />
				</FloatingActionButton>

			</div>
		);
	},
	renderRow: function(job) {
		var icon = <ErrorIcon />;
		switch(job.state) {
			case "FINISHED": icon = <DoneIcon />; break;
			case "PROGRESS": icon = <AutoRenewIcon />; break;
		}
		return (
			<ListItem
				key={job.id}
				primaryText={job.inputPath}
				secondaryText={job.createdAt.substr(0, 10)}
				rightIcon={icon}
				onClick={_.partial(this.navigateToJobDetails, job.id)}
			/>
		);
	}
});

module.exports = JobsListPage;
