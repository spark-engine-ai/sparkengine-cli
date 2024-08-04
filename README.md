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

## License

This project is licensed under the ISC License.