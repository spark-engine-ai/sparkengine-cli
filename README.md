# sparkengine-cli
Our NPM package for creating and executing Spark Engine multi-agent systems.

## Getting Started

First, install our CLI:

```bash
npm install -g sparkengine
```

During the installation, you will be prompted to configure all `.spk` files on your computer to use our favicon.

## Creating a New Project

To create a project in your directory:

```bash
npx sparkengine my-new-project
```

## Configuring Favicon for .spk Files Later

If you choose not to configure the favicon during installation, you can do it later using the following commands:

### Configure Favicon for a Specific Directory

To configure `.spk` files in a specific directory to use our favicon:

```bash
npx sparkengine configure-favicon <directory>
```

Replace `<directory>` with the path to the directory containing your `.spk` files.

### Configure Favicon for All .spk Files

To configure all `.spk` files on your computer to use our favicon:

```bash
npx sparkengine configure-all-spk
```

This command will search for all `.spk` files on your computer and configure them to use the favicon.

## Managing Your Spark Engine API Key

### Add Your API Key

To add your Spark Engine API key:

```bash
npx sparkengine key add "<your-api-key>"
```

Replace `<your-api-key>` with your actual API key.

### Replace Your API Key

To replace your Spark Engine API key:

```bash
npx sparkengine key replace "<your-new-api-key>"
```

Replace `<your-new-api-key>` with your new API key.

### Remove Your API Key

To remove your Spark Engine API key:

```bash
npx sparkengine key remove
```

## Sending a Prompt to a Spark Engine Project

To send a prompt to a Spark Engine project:

```bash
npx sparkengine run <projectId>
```

Replace `<projectId>` with the ID of your project. You will then be prompted to enter your text prompt.

## License

This project is licensed under the ISC License.