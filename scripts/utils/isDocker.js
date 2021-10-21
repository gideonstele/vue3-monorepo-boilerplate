const fs = require('node:fs');

let isDockerCached;

function hasDockerEnv() {
  try {
    fs.statSync('/.dockerenv');
    return true;
  } catch (e) {
    return false;
  }
}

function hasDockerCGroup() {
  try {
    return fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
  } catch (e) {
    return false;
  }
}

function isDocker() {
  // TODO: Use `??=` when targeting Node.js 16.
  if (isDockerCached === undefined) {
    isDockerCached = hasDockerEnv() || hasDockerCGroup();
  }

  return isDockerCached;
}

module.exports = isDocker;