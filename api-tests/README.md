### Set up
This solution is tested only on mac machine due to inaccessibility of windows machine

install the latest node js,
Once you have downloaded or cloned the repo you need to install the dependencies for the API. We do this using `npm`.

```cli
npm install
```

`Start the test-server`

### Run test suite
Mocha style e2e test covers the whole workflow and hits all the services

```cli
# mac machine
npm test
```

### Response/error validations
Chai assertions used to validate the successful and error responses according to specification
Used AJV lib for Schema validation

### Report
After first execution of `mochawesome` folder will created at the root of project with html/json reports. You can browse the html report from `mochawesome-report\mochawesome.html` in your favourite browser

### logs
Test Execution logs, request/response of api's are logged in the `logs\api.log`

### Testcases
1. Send a successful POST requestn and verify the response status. Verify the name is equal to the request body and verify the customers node exists. 
2. Verify the size of the company (Small, Medium or Large) based on requirements. There is a issue where the record number 4 displays incorrect company size (Based on Notes in requirements file: customer size is: Small, when # of employees is <= 10; Medium when it is <= 1000; Big otherwise). The test fails as the assertion fails based on the response returned. 
3. Verify the JSON schema for the response. It verfiies the response with the JSON schema. The test fails as record 4 does not contain customerInfo node. The detailed failure will be visible is logs. View api.log file.


