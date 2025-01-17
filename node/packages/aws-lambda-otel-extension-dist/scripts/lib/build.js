'use strict';

const path = require('path');
const unlink = require('fs2/unlink');
const mkdir = require('fs2/mkdir');
const build = require('@serverless/aws-lambda-otel-extension/scripts/lib/build');

const distFilename = path.resolve(__dirname, '../../extension.zip');

module.exports = async () => {
  await Promise.all([
    unlink(distFilename, { loose: true }),
    mkdir(path.dirname(distFilename), { intermediate: true, silent: true }),
  ]);
  await build(distFilename);
};

module.exports.distFilename = distFilename;
