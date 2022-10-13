# URL shortening service

#### Prerequisites:
1. Docker
2. Docker compose
3. NodeJS

#### Setup:
There are two configurations needed; one for running the service and the other for running tests.

**Running the service**
1. Create a new `.env` file and copy the contents of `.env.example` into it.
2. Fill in the missing values in the `.env` file. For example `PORT = "8080"`.

**Running tests**
1. Edit the file `./.jest/setEnvVars.js` and include all the environment variable tests will need.

#### Running the project

To run the service, in the root folder, run;
```
docker compose up --build
```
This is only required the first time. For the subsequent runs;
```
docker compose up
```

#### Running tests:

There are two groups of tests include.
To run unit tests;
```
npm run unit-tests
```

To run integration tests;
```
npm run integration-tests
```

To run all of tests at the same time;
```
npm test
```
Running all the tests creates an html test coverage report which can be view on the browser. This file is located here;
```
./coverage/lcov-report/index.html
```

#### API Documentation.
To access the API documentation;
1. Start the service
```
docker compose up
```
2. Access the docs [here](http://localhost:8080/api-docs/)



#### More:
1. I have included a description of the work [here](mds/SystemDocumentation.md)
2. More [thoughts](mds/Scaling.md)
