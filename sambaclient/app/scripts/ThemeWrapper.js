var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var React = require('react');

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

module.exports = {
	wrap: wrap
};
