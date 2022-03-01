const { sendResponse } = require('../../utils/helpers');

module.exports.handler = async (event) => sendResponse(
  200,
  { message: `Email ${event.requestContext.authorizer.claims.email} has been authorized` },
);
