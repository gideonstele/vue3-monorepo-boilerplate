const isDocker = require('./utils/isDocker');
const isCi = require('./utils/isCi');
/**
 * @type {import('shelljs')}
 */
const shell = require('shelljs');
if (isDocker()) {
  shell.exit(1);
}
shell.echo('Project will be initilized...');
shell.cd(__dirname);
shell.cd('..');
if (!isCi) {
  shell.exec('husky install');
  shell.exec('chmod ug+x .husky/*');
}
shell.cp('-u', 'scripts/template/env.development.local.template', 'env/.env.development.local');
shell.cp('-u', 'scripts/template/proxy.json.template', 'proxy.json');
