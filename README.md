# AFTR.Market

AFTR Market is a site enabling users to create and configure AFTR vehicles. In short, AFTR vehicles are Arweave assets that encapsulate other Arweave assets. AFTR vehicles add a layer of security to your Arweave assets as management and governance are handled onchain.

## Installation

AFTR Market utilizes ViteJS (https://vitejs.dev) scaffolding as it plays nicely with Tailwind CSS.

To setup the site, additional environment variables are needed depending on the mode you're running the application in. A public env file (.env) is saved in the repository, but only includes variables that don't need to be stored privately. The other variables needed to run the application including the following:

```
# Development Mode Setup using Arlocal
VITE_ARWEAVE_HOST=localhost
VITE_ARWEAVE_PORT=1984
VITE_ARWEAVE_PROTOCOL=http

###### SMARTWEAVE VARIABLES - The contractSourceId changes when a new AFTR contract source is uploaded to Arweave
VITE_SMARTWEAVE_CONTRACT_SOURCE_ID=64l71KmgluNSX6rgHqmD0c2iyA2FTnfqkIgbg2MoI3c
#############
```

Environment files saved locally use the following naming conventions (.env.{MODE}.local):
- .env.development.local
- .env.test.local
- .env.production.local

To ensure you're running the application in the proper mode, edit the build entry in the package.json file. Then make sure you run **npm run build** before you run the **npm run dev** command to start the application.

Note that, in order to run the application, you'll need the base layer AFTR Protocol contract running on your backend Arweave instance. See [The AFTR Protocol](https://github.com/aftrmarket/aftr-contracts). If you're setting this up to run in a development environment, see the [Test Documentation](https://github.com/aftrmarket/aftr-contracts/tree/main/tests) in the tests folder.

Once setup, start the application as follows:

```
// Build the application the first time in the proper mode (see the package.json file)
npm run build

// Start the application
npm run dev