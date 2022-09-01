# URL shortening service


### Setup

#### Prerequisites
1. Docker
2. Docker compose
3. NodeJS

#### Running the project

To run the service, in the root folder, run;
```
docker compose up --build
```
This is only required the first time. For the subsequent runs;
```
docker compose up
```

#### Running tests
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


#### More
1. [Assignment](mds/Assignment.md)
