
const getBattleCount = ()=>{
	return new Promise((resolve, reject)=>{
		_MODEL.TBL_BATTLE.aggregate([
			{
				$group: {
					_id : null,
					total : { $sum: "$battle_number" },
					count: { $sum: 1 }
				}
			}
		]).then((data)=>{
			
			let total = 0;
			if(data[0].total !== undefined){
				total =  data[0].total;
			}

			return resolve(total);
		}).catch(e=>{
			_LOGGER.info('------DB GET COUNT ERROR---------');
			_LOGGER.info(e);
			_LOGGER.info('------END DB  ERROR---------');
			return reject(e.toString())
		});
	});
}


const getMostActive = ()=>{
	return new Promise((resolve, reject)=>{
		_MODEL.TBL_BATTLE.aggregate([
			{
                 $group: {
                    _id: { attacker: "$king.attacker",defender: "$king.defender"},
                    battle: { $push:  { name: "$battle_name", region: "$region" , number_battle:{ $max:"$battle_number"} } },
                    count: { $sum: 1 }
                 },
            },
            { "$sort": { "count": -1 } },
            { "$limit": 1 },

            { $project:{ 
                    _id:0,
                    defender: "$_id.defender",
                    attacker :"$_id.attacker",
                    battle: { $arrayElemAt: [ "$battle", -1 ] }
                } 
            } 
		]).then((data)=>{
			
			let resp = {};
			if(Object.keys(data[0]).length > 0){
				resp.attacker_king  = (data[0].attacker !== undefined) ? data[0].attacker : "";
				resp.defender_king  = (data[0].defender !== undefined) ? data[0].defender : "";
				resp.region  		= (data[0].battle !== undefined) ? data[0].battle.region : "";
				resp.name  			= (data[0].battle !== undefined) ? data[0].battle.name : "";
			}

			return resolve(resp);
		}).catch(e=>{
			_LOGGER.info('------DB MOST ACTIVE ERROR---------');
			_LOGGER.info(e);
			_LOGGER.info('------END DB  ERROR---------');
			return reject(e.toString())
		});
	});
}


const getOtherStats = ()=>{
	return new Promise((resolve, reject)=>{
		_MODEL.TBL_BATTLE.aggregate([
			{
                $group: {
                    _id :null,
                    totalWin: {  
                        "$sum": { 
                            "$cond": [ { "$eq": [ "$attacker_outcome", "win" ] }, 1,0 ]
                        }
                    },
                    totalLoss: {  
                        "$sum": { 
                            "$cond": [ { "$eq": [ "$attacker_outcome", "loss" ] }, 1,0 ]
                        }
                    },
                    battle_type: {  
                        "$addToSet": { 
                            $cond: { if: { $ne: [  "$battle_type","" ] }, then: "$battle_type", else:"no_type" }
                        }
                    },
                    defenderAvg: { $avg: "$battle_size.defender" },
                    defenderMin: { $min: "$battle_size.defender" },
                    defenderMax: { $max: "$battle_size.defender" },

                    count: { $sum: 1 }
                }
            },

            { "$sort": { "count": -1 } },
            { "$limit": 1 } ,
        
            { $project:{ 
                    _id:0,
                    totalWin: 1,
                    totalLoss :1,
                    battle_type :1 ,
                    defenderMin:1,
                    defenderMax:1,
                    defenderAvg: { $trunc: "$defenderAvg" } 
                } 
            }
		]).then((data)=>{
			
			let attacker_outcome,battle_type,defender_size;
			if(Object.keys(data[0]).length > 0){
				attacker_outcome = {
					win  : (data[0].totalWin !== undefined) ? data[0].totalWin : 0,
					loss : (data[0].totalLoss !== undefined) ? data[0].totalLoss : 0
				};

				battle_type = (data[0].battle_type !== undefined) ? data[0].battle_type : [];

				defender_size = {
					average : (data[0].defenderAvg !== undefined) ? data[0].defenderAvg : "",
					min : (data[0].defenderMin !== undefined) ? data[0].defenderMin : "",
					max : (data[0].defenderMax !== undefined) ? data[0].defenderMax : "",
				};

			}

			return resolve({outcome:attacker_outcome, type:battle_type, defender:defender_size});
		}).catch(e=>{
			_LOGGER.info('------DB OTHER STATS ERROR---------');
			_LOGGER.info(e);
			_LOGGER.info('------END DB  ERROR---------');
			return reject(e.toString())
		});
	});
}



module.exports = {
	getBattleCount:getBattleCount,
	getMostActive:getMostActive,
	getOtherStats:getOtherStats
};