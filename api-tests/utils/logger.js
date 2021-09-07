const log4js = require('log4js');

log4js.configure({
  appenders: {
    cheese: {
      type: 'file', filename: './logs/api.log', maxLogSize: 10485760, backups: 3, compress: true,
    },
  },
  categories: { default: { appenders: ['cheese'], level: 'ALL' } },
});

module.exports = log4js.getLogger('api');
