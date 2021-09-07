const { assert } = require('chai');
const axios = require('axios');
const https = require('https');
const Ajv = require('ajv');
const utils = require('../utils/commonUtils');
const logger = require('../utils/logger');
const userSchema = require('./Schemas/Response_Schema.json');

let apiResponse;

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  timeout: 12000,
});

module.exports.submitRequest = (done, params) => {
  const body = {
    name: (params.name).toString(),
  };
  const request = {
    method: 'POST',
    url: `${params.baseUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    timeout: 60000,
  };
  instance(request)
    .then((response) => {
      logger.info('Request: ', request.url, body);
      apiResponse = response.data;
      logger.info('Response: ', apiResponse);
      assert.equal(response.status, 200);
      assert.equal(apiResponse.name, params.name);
      assert.exists(apiResponse.customers);
      done();
    })
    .catch((error) => {
      utils.handleErrorResponse(request.url, error, params, logger);
      utils.assertErrorResponse(401, 'BAD Request', params);
      done(error);
    });
};

module.exports.validateSizeOfCompany = (done) => {
  let customers = apiResponse.customers;
  for(let i = 0; i < customers.length; i++) {
    if (customers[i].employees <= 10) {
      assert.equal(customers[i].size, 'Small');
    } else if (customers[i].employees > 10 && customers[i].employees < 1000) {
      assert.equal(customers[i].size, 'Medium');
    } else if (customers[i].employees >= 1000) {
      assert.equal(customers[i].size, 'Big');
    } else {
      console.log('Mismatch in employee count and company size ', customers[i]);
    }
  }
  done();
}

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
});

function validate (schema, data) {
  return ajv.validate(schema, data)
    ? true : ajv.errors;
}
const errorMap = {};
const ajvSuccess = 'Contract Validation was successfull';

function filterAjvError (ajvErrors) {
  ajvErrors.forEach((errorNode) => {
    delete errorNode.schema;
    delete errorNode.parentSchema;
    delete errorNode.properties;
  });
  return ajvErrors;
}

module.exports.validateSchema = function (done) {
  const ajvErrors = validate(userSchema, apiResponse);
  const errors = ajvErrors === true ? ajvSuccess : filterAjvError(ajvErrors);
  errorMap.ApiResponse = errors;
  logger.info(JSON.stringify(errorMap));
  if (ajvErrors === true) {
    logger.info(ajvSuccess);
  } else {
    logger.info('Contract Validation is not successful');
    assert.fail('Contract Validation is not successful. Check api.log for details');
  }
  done();
};

