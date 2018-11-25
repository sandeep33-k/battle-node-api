
/*  Define global varibaled*/

global._MOMENT		= require('moment');
global._COMMON		= require('./lib/common');
global._MODEL       = require('./dbSchema');
global._LOGGER      = require('./lib/logger');

global._ERR_TOKEN_NOT_FOUND = "Unauthorized Access: Access Token not found / expired";

global._JWT_SECRET = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOj";
global._JWT_ISSUER = "Battle Node API";
global._JWT_HEADER = "X-ACCESS-TOEKN";
global._JWT_EXPIRY = 604800;
global._CRYPT_KEY  = "E1MDc2MzQ5ODQsImp0aSI6IlwvUUlEVk0rVTJ1Zj";