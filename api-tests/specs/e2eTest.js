const {
  customer,
} = require('../utils/unifiedCommonSpecs');
const params = require('../utils/defaultParams');

describe('API Automation Test', () => {
  it('Submit username and verify response', (done) => {
    customer.submitRequest(done, params);
  });

  it('Validate size of companies', function (done) {
    customer.validateSizeOfCompany(done);
  });

  it('Response Schema AJV Test', function (done) {
    customer.validateSchema(done);
  });
});
