const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


/* Schema for table `Battle DB` */

let battleSchema = new mongoose.Schema({
  battle_name     	: String,
  battle_year     	: Number,
  battle_number		: Number,
  attacker_outcome  : String,
  battle_type		: String,
  major_death       : Boolean,
  major_capture     : Boolean,
  summer			: { type: Boolean, default: null },
  location			: { type: String, default: null },	
  region			: { type: String, default: null },
  note				: { type: String, default: null },
  attackers         : Array,
  defenders			: Array,
  king				: { 
	  					attacker : { type: String, default: null },	
	  					defender : { type: String, default: null },	
  					  },
  battle_size       : {
						attacker : { type: Number, default: null },	
						defender : { type: Number, default: null },	
					  },
  commander         : {
						attacker : { type: String, default: null },	
						defender : { type: String, default: null },	
					  },
  created_on      	: { type: Date, default: Date.now },
  updated_on        : { type: Date, default: Date.now },
  enabled           : { type: Number, default: 1 },
});

let Battle = mongoose.model('tbl_battles', battleSchema);

module.exports = {
  TBL_BATTLE:Battle,
};