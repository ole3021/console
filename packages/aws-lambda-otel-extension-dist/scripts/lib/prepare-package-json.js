'use strict';

const path = require('path');
const fsp = require('fs').promises;
// TODO: Remove next comment after first publication and adding packaage to package.json
// eslint-disable-next-line import/no-extraneous-dependencies
const sourcePkgJson = require('@serverless/aws-lambda-otel-extension/package');

const pkgJsonFilename = path.resolve(__dirname, '../../package.json');

module.exports = async () => {
  const pkgJson = JSON.parse(await fsp.readFile(pkgJsonFilename, 'utf-8'));
  pkgJson.version = sourcePkgJson.version;
  await fsp.writeFile(pkgJsonFilename, JSON.stringify(pkgJson));
};
