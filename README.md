# Samba exercise

This application's purpose is to convert a video using a web service, in order to display this video on the browser.

Both input and output files will be stored on [Amazon S3](https://aws.amazon.com/s3/).

## Samba server

Backend application based on Jersey. To run, just fire

```
gradle jettyRunWar
```

The following entrypoints are available

* POST /api/jobs
* GET /api/jobs
* GET /api/jobs/{id}

## Samba client

Frontend application crafted with ReactJS and Material Design. To run, just fire

```
npm install
npm start
```

## Tests

To run the test suites, fire the following commands

For the server:
```
gradle clean test
```

For the client:
```
gulp test
```
