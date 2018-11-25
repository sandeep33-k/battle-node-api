
var fs = require('fs');
var winston = require('winston');

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}
var filename = _MOMENT().format('YYYY-MM-DD')+'.log'; 
var logger = winston.createLogger({
  transports: [
    new (winston.transports.File)({
      name:'file info',
      filename: 'logs/'+filename,
      level: 'info',
      timestamp: function() { return _MOMENT().format('YYYY-MM-DDTHH:mm:ss'); }
    })
  ]
});

module.exports = logger;


