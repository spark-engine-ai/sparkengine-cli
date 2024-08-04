#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const glob = require('glob');
const fetch = require('node-fetch');
const os = require('os');

const program = new Command();

const API_KEY_PATH = path.join(os.homedir(), '.sparkengine_api_key');

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

const setApiKey = (key) => {
  fs.writeFileSync(API_KEY_PATH, key);
  console.log('API key added successfully.');
};

const replaceApiKey = (key) => {
  setApiKey(key);
  console.log('API key replaced successfully.');
};

const removeApiKey = () => {
  if (fs.existsSync(API_KEY_PATH)) {
    fs.removeSync(API_KEY_PATH);
    console.log('API key removed successfully.');
  } else {
    console.error('API key not found.');
  }
};

const getApiKey = () => {
  if (fs.existsSync(API_KEY_PATH)) {
    return fs.readFileSync(API_KEY_PATH, 'utf-8');
  }
  console.error('API key not found. Please add your API key first.');
  process.exit(1);
};

const sendPromptToProject = (projectId, prompt) => {
  const apiKey = getApiKey();
  fetch("https://sparkengine.ai/api/engine/completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      apiKey: apiKey,
      ProjectId: projectId,
      prompt: prompt
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
};

const promptUserForText = (projectId) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'prompt',
      message: 'Enter your prompt:',
    },
  ]).then((answers) => {
    sendPromptToProject(projectId, answers.prompt);
  });
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

program
  .command('key add <key>')
  .description('Add your Spark Engine API key')
  .action((key) => {
    setApiKey(key);
  });

program
  .command('key replace <key>')
  .description('Replace your Spark Engine API key')
  .action((key) => {
    replaceApiKey(key);
  });

program
  .command('key remove')
  .description('Remove your Spark Engine API key')
  .action(() => {
    removeApiKey();
  });

program
  .command('run <projectId>')
  .description('Send a prompt to a Spark Engine project')
  .action((projectId) => {
    promptUserForText(projectId);
  });

program.parse(process.argv);
