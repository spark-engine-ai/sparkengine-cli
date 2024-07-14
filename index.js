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

program
  .version('1.0.0')
  .argument('<directory>', 'Directory to create the project in')
  .action((directory) => {
    copyTemplate(directory);
  });

program.parse(process.argv);
