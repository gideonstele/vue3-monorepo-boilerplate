/**
 * @type {import('shelljs')}
 */
const shell = require('shelljs');

shell.cd(__dirname);
shell.cd('..');
shell.rm('-rf', 'shrinkwrap.yaml');
shell.rm('-rf', 'node_modules');
shell.rm('-rf', ['./node_modules', './packages/app/node_modules', './packages/core/node_modules']);