var React = require('react');
var { Jumbotron } = require('react-bootstrap');
var JobService = require('services/JobService');

var JobsListPage = React.createClass({
	propTypes: {
		params: React.PropTypes.shape({
			id: React.PropTypes.number.isRequired //the id of the job
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
			<Jumbotron className="jumbotron">
				<h1>Job #{this.props.params.id}</h1>
				{ this.state.loading && <p>Loading...</p> }
				{ !this.state.loading && this.renderJob() }
			</Jumbotron>
		);
	},
	renderJob: function() {
		var job = this.state.job;
		if(job.state == 'FINISHED') {
			return (
				<video controls style={{margin: 'auto', display: 'block'}}>
					<source src={job.outputPath} type="video/mp4" />
					<p>Your browser does not support the video tag.</p>
				</video>
			);
		} else {
			return (
				<p>{JSON.stringify(this.state.job)}</p>
			);
		}

	}
});

module.exports = JobsListPage;
