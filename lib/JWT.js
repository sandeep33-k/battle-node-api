
const jwt = require('jwt-simple');


const jwtAttributes = {
  SECRET: _JWT_SECRET,
  ISSUER: _JWT_ISSUER, 
  HEADER: _JWT_HEADER, 
  EXPIRY: parseInt(_JWT_EXPIRY),
};

module.exports.createToken = function(user) {
	return new Promise((resolve, reject) => {
		
        const { EXPIRY, ISSUER, SECRET } = jwtAttributes;
		let token;
		
        let expires = _MOMENT().add(EXPIRY, 'seconds').valueOf();
		
		let payload = {
            exp: expires,
            iss: ISSUER,
            name: user.name,
            userId:user.userId,
            userIdEncrypt: user.userIdEncrypt, 
        };
    
    try {
         token = jwt.encode(payload, SECRET);  
    
    }	catch(e) {
      return reject('Unauthorized Access: Access Token unable to create');  
    }
    
    return resolve({token:token});  	

	});
};

module.exports.validateToken = function(token) {
  return new Promise((resolve, reject) => {
    const { HEADER, SECRET } = jwtAttributes;
    let decodedToken;

    try {
      decodedToken = jwt.decode(token, SECRET);
    } catch(e){
      return reject('Unauthorized Access: Access Token is Invalid');  
    }
    
    return resolve(decodedToken);

  });
};