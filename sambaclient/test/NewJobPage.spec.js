var React = require('react');
var { mount } = require('enzyme');
var { FlatButton, RaisedButton, TextField } = require('material-ui');
var ThemeWrapper = require('ThemeWrapper');
var NewJobPage = ThemeWrapper.wrap(require('pages/NewJobPage.jsx'));
var JobService = require('services/JobService');

describe('New Job Page', function() {

	it('should navigate to jobs list when user clicks cancel button', function() {
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

	it('should send an API call to create a new job when user clicks submit button', function() {
		//given:
		spyOn(JobService, 'create').and.returnValue({
			then: function(fn) {
				fn({
					status: 200,
					data: {
						id: 12
					}
				});
			}			
		});
		var history = { push: function() { /* just a mock */} };
		spyOn(history, 'push');
		var component = mount(<NewJobPage history={history} />);

		//and:
		var theInput = component.find(TextField).find('input');
		theInput.node.value = 's3://someinputfile';
		theInput.simulate('change', theInput);

		//when
		var submitBtn = component.findWhere(function(comp) {
			return comp.is(RaisedButton) && comp.text() == 'Submit';
		}).first();

		submitBtn.find('button').simulate('click');

		//then
		expect(JobService.create).toHaveBeenCalledWith('s3://someinputfile');
		expect(history.push).toHaveBeenCalledWith('/jobs/12');
	});

});
