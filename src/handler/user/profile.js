const { sendResponse } = require('../../utils/helpers');
const statusCode = require('../../utils/statusCode');

module.exports.handler = async (event) => sendResponse(
  statusCode.OK,
  { message: `Email ${event.requestContext.authorizer.claims.email} has been authorized` },
);
