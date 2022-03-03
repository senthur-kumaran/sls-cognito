const AWS = require('aws-sdk');
const { sendResponse, validateInput } = require('../../utils/helpers');
const statusCode = require('../../utils/constants');

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  try {
    const isValid = validateInput(event.body);
    if (!isValid) return sendResponse(statusCode.BAD_REQUEST, { message: 'Invalid input' });

    const { email, password } = JSON.parse(event.body);
    const { userPoolId, clientId } = process.env;
    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId: userPoolId,
      ClientId: clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    const response = await cognito.adminInitiateAuth(params).promise();
    return sendResponse(statusCode.OK, { message: 'Success', token: response.AuthenticationResult.IdToken });
  } catch (error) {
    const message = error.message ? error.message : 'Internal server error';
    return sendResponse(statusCode.INTERNAL_SERVER_ERROR, { message });
  }
};
