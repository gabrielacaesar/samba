var React = require('react');
var { Card, CardHeader, CardMedia, Avatar } = require('material-ui');
var JobService = require('services/JobService');

var JobsListPage = React.createClass({
	propTypes: {
		params: React.PropTypes.shape({
			id: React.PropTypes.string.isRequired //the id of the job
		}).isRequired
	},
	getInitialState: function() {
		return {
			job: null,
			loading: true
		};
	},
	componentDidMount: function() {
		var self = this;
		self.setState({loading: true});
		JobService.get(this.props.params.id).then(function(response) {
			self.setState({
				job: response.data,
				loading: false
			});
		});
	},
	render: function() {
		return (
			<Card style={{maxWidth: '60%', display: 'block', margin: 'auto', marginTop: '16px', marginBottom: '16px'}}>
				<CardHeader
					title={<span>Job #{this.props.params.id}</span>}
					subtitle={this.state.job ? this.state.job.inputPath : 'Loading...'}
					avatar={this.state.job ? <Avatar>{this.state.job.state.substr(0, 1)}</Avatar> : ''}
				/>
				{ this.state.job && this.renderJob() }
			</Card>
		);
	},
	renderJob: function() {
		var job = this.state.job;
		if(job.state == 'FINISHED') {
			return (
				<CardMedia>
					<video controls style={{margin: 'auto', display: 'block'}}>
						<source src={job.outputPath} type="video/mp4" />
						<p>Your browser does not support the video tag.</p>
					</video>
				</CardMedia>
			);
		} else {
			return (
				<p>{JSON.stringify(this.state.job)}</p>
			);
		}

	}
});

module.exports = JobsListPage;
