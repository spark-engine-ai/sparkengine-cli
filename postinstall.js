#!/usr/bin/env node

const inquirer = require('inquirer');
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

const configureFavicon = (directory) => {
  const faviconPath = path.join(__dirname, 'favicon.ico');
  const targetFaviconPath = path.join(directory, 'favicon.ico');

  fs.copySync(faviconPath, targetFaviconPath);

  console.log(`Favicon configured at ${targetFaviconPath}`);
};

const configureAllSpkFiles = () => {
  const homeDir = require('os').homedir();
  const pattern = `${homeDir}/**/*.spk`;

  glob(pattern, (err, files) => {
    if (err) {
      console.error('Error searching for .spk files:', err);
      return;
    }

    files.forEach(file => {
      const fileDir = path.dirname(file);
      configureFavicon(fileDir);
    });

    console.log(`Configured ${files.length} .spk files to use our favicon.`);
  });
};

const askToConfigureAllSpkFiles = () => {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'configureAll',
      message: 'Would you like to configure all .spk files on your computer to use our favicon?',
      default: true,
    },
  ]).then((answers) => {
    if (answers.configureAll) {
      configureAllSpkFiles();
    }
  });
};

askToConfigureAllSpkFiles();
