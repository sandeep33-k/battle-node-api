/**
*Base file for request mapping of all restAPI's
*files defined to handle to particular request
*/
const express 	= require('express');
const app 		= express.Router();

const access 	= require('../lib/auth');
const battle 		= require('./v1/controllers/battle');

/* GET ACCESS TOKEN FOR ALL APIS */
app.get('/api/v1/authorize', access.createAccess);

/* START BATTLE API*/
app.get('/api/v1/battle/list', access.validateJwt , battle.battleList);
app.get('/api/v1/battle/count', access.validateJwt , battle.battleCount);
app.get('/api/v1/battle/stats', access.validateJwt , battle.battleStats);
app.get('/api/v1/battle/search', access.validateJwt , battle.battleSearch);
/* END BATTLE APIS */


module.exports=app;
