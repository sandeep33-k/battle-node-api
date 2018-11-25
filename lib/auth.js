
const jwt = require('./JWT');
const key  = require('../key')

/*create JWT Token */
module.exports.createAccess = async (req, res, next)=> {
  try {

  		/* validate input params */
        if(!req.query.username) throw ('username missing');
        if(!req.query.password) throw ('password missing');
        if(!req.query.grant) throw ('grant missing');
        if(key._API_USERNAME != req.query.username ) throw ('username mismatch');
        if(key._API_PASSWORD !=req.query.password ) throw ('password mismatch');
        if(key._API_GRANT != req.query.grant ) throw ('grant mismatch');
        
        //generate random userID number 
		let userId = _COMMON.generateRandom();

		//encrypt userID with secret key 
		let userEncrypt = _COMMON.encrypt(userId);

		//create object for jwt
		let obj = {
			name: req.query.username,
			grant:req.query.grant,
			password: req.query.password,
			userId: userId,
			userIdEncrypt:userEncrypt
		};
		
		//create token
		let resp = await jwt.createToken(obj);
        res.send(_COMMON.parseOK({message:'User access has been granted',access_token:resp.token}));

    } catch (e) {
       return next(e);
    }
};

module.exports.validateJwt = async (req, res, next)=> {
  	try {

		//get access token from header
		if(req.headers && req.headers['x-access-token']){
			let accessToken = req.headers['x-access-token'];
			let token 	 = await jwt.validateToken(accessToken);


			//if token or userEncrypt not available then throw err
			if(!token.userId || !token.userIdEncrypt) throw( 'err' )
			
			//decrypt userID from encryption
			let userIdDecrypt = _COMMON.decrypt(token.userIdEncrypt);
			
			//check encrypted userID and actual userID
			if(userIdDecrypt !== token.userId ) throw( 'err' )

			//check for token expire
			if(token.exp < new Date().getTime()) throw( 'err' )
			
			req.user = token; 
			return next();
		} 
		else 
		{	return res.send(_COMMON.parseERR(_ERR_TOKEN_NOT_FOUND));  }
	 } catch (e) {
       return res.send(_COMMON.parseERR(_ERR_TOKEN_NOT_FOUND));
    }
};
