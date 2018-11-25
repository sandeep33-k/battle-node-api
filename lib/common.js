
const crypto    = require('crypto');



const generateRandom = function(){
    
     return Math.random().toString(36).slice(2)+new Date().getTime();

};


const encrypt = function(data){
    let cipher = crypto.createCipher('aes-256-cbc', _CRYPT_KEY);
    let crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    
    return crypted;
};

const decrypt = function(data){
    let decipher = crypto.createDecipher('aes-256-cbc', _CRYPT_KEY);
    let decrypted = decipher.update(data, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

    return decrypted;    
};


const parseOK = function(v){
	return {
        status: { ok: true, code: 200, message: (typeof v == 'string')?v:undefined },
        version: "1.0.0",
        data: (typeof v != 'string')?v:undefined
    };
};

const parseERR = function(e,c=204){
	return {
        status: { ok: false , code:c, reason: e },
        version: "1.0.0",
        data: undefined,
    };
};



module.exports ={		
	parseOK:parseOK,
	parseERR:parseERR,
    decrypt:decrypt,
    encrypt:encrypt,
    generateRandom:generateRandom
};
