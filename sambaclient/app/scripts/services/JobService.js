var axios = require('axios');

module.exports = {
	get: getById,
	create: create,
	list: list
};


//implkementation
var api = axios.create({
  baseURL: 'http://samba-bullkup.rhcloud.com/api',
  headers: {
	  'Content-Type': 'application/json',
	  'Accept': 'application/json'
  }
});

function getById(id) {
	return api.get(`/jobs/${id}`);
}

function create(path) {
	return api.post('/jobs', {
		inputPath: path
	});
}

function list() {
	return api.get('/jobs');
}
