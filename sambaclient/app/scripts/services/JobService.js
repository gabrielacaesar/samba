var axios = require('axios');

module.exports = {
	get: getById,
	create: create
};


//implkementation
var api = axios.create({
  baseURL: 'http://localhost:8080/sambaserver/api',
  timeout: 1000,
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
