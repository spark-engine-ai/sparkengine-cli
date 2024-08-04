#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

const copyTemplate = (targetDir) => {
  const sourceDir = path.join(__dirname, 'template');

  fs.copySync(sourceDir, targetDir);

  console.log(`Project created at ${targetDir}`);
};

const configureFavicon = (directory) => {
  const faviconPath = path.join(__dirname, 'favicon.ico');
  const targetFaviconPath = path.join(directory, 'favicon.ico');

  fs.copySync(faviconPath, targetFaviconPath);

  console.log(`Favicon configured at ${targetFaviconPath}`);
};

program
  .version('1.0.0')
  .argument('<directory>', 'Directory to create the project in')
  .action((directory) => {
    copyTemplate(directory);
  });

program
  .command('configure-favicon <directory>')
  .description('Configure .spk files in a specific directory to use our favicon')
  .action((directory) => {
    configureFavicon(directory);
  });

program
  .command('configure-all-spk')
  .description('Configure all .spk files on the user\'s computer to use our favicon')
  .action(() => {
    configureAllSpkFiles();
  });

program.parse(process.argv);
