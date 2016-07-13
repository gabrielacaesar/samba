var React = require('react');
var { mount } = require('enzyme');
var { FlatButton } = require('material-ui');
var ThemeWrapper = require('ThemeWrapper');
var NewJobPage = ThemeWrapper.wrap(require('pages/NewJobPage.jsx'));

describe('New Job Page', function() {

	it('should navigate to jobs list when user clicks cancel', function() {
		//given:
		var history = { push: function() { /* just a mock */} };
		spyOn(history, 'push');
		var component = mount(<NewJobPage history={history} />);

		//when
		var cancelBtn = component.findWhere(function(comp) {
			return comp.is(FlatButton) && comp.text() == 'Cancel';
		}).first();
		cancelBtn.simulate('click');

		//then
		expect(history.push).toHaveBeenCalledWith('/');
	});

});
