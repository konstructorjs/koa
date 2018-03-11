const Koa = require('koa');
const chalk = require('chalk');

module.exports = class koa {
  static setup(app) {
    app.severStartTime = Date.now();
    app.koa = new Koa();

    app.use = (...args) => {
      app.koa.use(...args);
    };

    app.env = app.koa.env;

    app.listen = async (...args) => new Promise((resolve) => {
      const show = (args.length === 0);
      if (args.length === 0) {
        args[0] = process.env.PORT || 3000;
      }
      if (show) {
        return resolve(app.koa.listen(args[0], () => {
          console.log(chalk.bold.underline('konstructor'));
          console.log(`node ${chalk.bold(process.version)}`);
          console.log(`listening on ${chalk.bold(args[0])}`);
          const startTime = Date.now() - app.severStartTime;
          console.log(`server started in ${startTime} ms`);
        }));
      }
      return resolve(app.koa.listen(...args));
    });
  }
};
