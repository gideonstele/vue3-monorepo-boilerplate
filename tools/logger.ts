import log4js from 'log4js';

log4js.configure({
  appenders: {
    vite: {
      type: 'file',
      filename: 'debug.log',
    },
  },
  categories: {
    default: {
      appenders: ['vite'],
      level: 'ALL',
    },
  },
});

export default log4js.getLogger('vite');
