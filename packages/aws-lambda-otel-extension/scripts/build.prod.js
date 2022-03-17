#!/usr/bin/env node

'use strict';

require('chai');

require('essentials');

const path = require('path');
const { execSync } = require('child_process');
const unlink = require('fs2/unlink');
const mkdir = require('fs2/mkdir');
const AdmZip = require('adm-zip');

const rootDir = path.resolve(__dirname, '../');
const optDir = path.resolve(rootDir, 'opt');
const buildDir = path.resolve(optDir, 'build');
const distDir = path.resolve(rootDir, 'dist');
const distFilename = path.resolve(distDir, 'extension.zip');

(async () => {
  const zip = new AdmZip();
  await Promise.all([
    unlink(distFilename, { loose: true }),
    mkdir(distDir, { silent: true }),
    zip.addLocalFile(path.resolve(buildDir, 'external/index.js'), 'otel-extension/external'),
    zip.addLocalFile(path.resolve(buildDir, 'internal/index.js'), 'otel-extension/internal'),
    zip.addLocalFolder(
      path.resolve(optDir, 'otel-extension/external/proto'),
      'otel-extension/external/proto'
    ),
    zip.addLocalFile(path.resolve(optDir, 'extensions/otel-extension'), 'extensions'),
  ]);
  zip.writeZip(distFilename);
  // Clean up build files
  execSync(`rm -r ${__dirname}/../opt/build`);
})();
