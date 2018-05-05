import moment from 'moment';
import winston from 'winston';

export const getLogger = (level) => new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return moment().format();
      },
      formatter: function(options) {
        // Return string will be passed to logger. 
        return `[${options.timestamp()}]` +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      },
      level
    })
  ]
});
