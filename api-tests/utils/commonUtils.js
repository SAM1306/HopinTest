const { assert } = require('chai');

module.exports.handleErrorResponse = (requestType, error, params, logger) => {
  if (error.response.status) {
    if ([400, 401].includes(error.response.status)) {
      params.error = error.response.data;
      params.errorCode = error.response.data.errors[0].code;
      params.errorMessage = error.response.data.errors[0].display_message;
      params.requestStatus = error.response.status;
      console.log(params);
      logger.warn(params.requestStatus);
      logger.warn(params.errorMessage);
    } else if (error.response.status === 403) {
      params.error = `${requestType} - Forbidden Error: ${error.response.status}`;
    } else if (error.response.status === 500) {
      params.error = `${requestType} - Internal Server Error: ${error.response.status}`;
    } else if (error.response.status === 404) {
      params.error = `${requestType} - Not Found Error: ${error.response.status}`;
    }
  } else {
    // assertion error
    params.error = `${error}`;
    logger.warn(requestType);
  }
  logger.warn(params.error);
};


module.exports.assertErrorResponse = (status, msg, params) => {
  assert.equal(params.requestStatus, status);
  assert.equal(params.errorMessage, msg);
};
