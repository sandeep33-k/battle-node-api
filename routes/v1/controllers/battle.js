
const _battleHelper  = require('../helpers/battleHelper');

//total Battle list api 
module.exports.battleList = async (req, res, next)=> {
	try {
      	
      	let battles =[];

      	battles = await _MODEL.TBL_BATTLE.find({enabled:1},{created_on:0,updated_on:0,enabled:0,__v:0});
       	
        res.send(_COMMON.parseOK({ message : "API status is success", battles :battles}));

    } catch (e) {
       return next(e);
    }
};

//Number of battle api
module.exports.battleCount = async (req, res, next)=> {
	try {
      	//get battle count from helper
      	let obj = await _battleHelper.getBattleCount();

        res.send(_COMMON.parseOK({ message : "API status is success", total_battles: obj}));

    } catch (e) {
       return next(e);
    }
};


//Battle status API
module.exports.battleStats = async (req, res, next)=> {
	try {
      	

        //get battle most active from helper
        let objActive = await _battleHelper.getMostActive();

        //get battle other stats from helper
        let objStats = await _battleHelper.getOtherStats();

        let resp = {
            most_active:objActive,
            attacker_outcome:objStats.outcome,
            battle_type:objStats.type,
            defender_size:objStats.defender
        };

        res.send(_COMMON.parseOK(resp));

    } catch (e) {
       return next(e);
    }
};


//Search API
module.exports.battleSearch = async (req, res, next)=> {
    try {
        
        let seachKeys = Object.keys(req.query);
        
        let sql = {}, resp=[];
        
        //preparing sql search condtion
        if(seachKeys.includes('king') && req.query.king !== "" ){
            sql.$or = [
               { 'king.attacker' : req.query.king } ,
               { 'king.defender' : req.query.king } 
            ];
        }

        //preparing sql search condtion
        if(seachKeys.includes('location') && req.query.location !== "" ){
            sql.location = req.query.location;
        }

        //preparing sql search condtion
        if(seachKeys.includes('type') && req.query.type !== "" ){
            sql.battle_type = req.query.type;
        }

        if(Object.keys(sql).length > 0){
            resp = await _MODEL.TBL_BATTLE.find(sql,{created_on:0,updated_on:0,enabled:0,__v:0});
        }

        res.send(_COMMON.parseOK(resp));

    } catch (e) {
       return next(e);
    }
};