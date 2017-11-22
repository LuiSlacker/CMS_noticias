const winston = require('winston');
const fs = require('fs');
const WinstonDailyRotate = require('winston-daily-rotate-file');

// ensure log directory exist
function createLogDir() {
  const logPath = process.cwd() + '/logs';
  if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);
  return '/logs';
}

winston.configure({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      label: 'general',
      level: 'info',
      prettyPrint: true,
      timestamp: true,
    }),
    new WinstonDailyRotate({
      name: 'general-rotation-file',
      filename: `./${createLogDir()}/general.log`,
      prepend: true,
      datePattern: 'yyyy-MM-dd_',
      timestamp: true,
      level: 'info',
      json: true,
      maxFiles: 14,
    }),
  ],
});

const exceptionTransports = [
  new winston.transports.Console({
    colorize: true,
    prettyPrint: true,
    timestamp: true,
  }),
];

winston.handleExceptions(exceptionTransports);

winston.exitOnError = false;

winston.info('logger initialized!');
module.exports = winston;
