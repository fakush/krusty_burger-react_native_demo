# Instructions for web Debugging

## Web debugging setup

> This is a temporary fix for a known bug of Expo 49.

Follow these steps to implement this fix:

* Incorporate the following lines into your dependencies at package.json file:

```code
"expo-asset": "^8.9.1",
"expo-asset-web": "npm:expo-asset@8.7.0"
```

Bear in mind, we'll be employing distinct versions of expo-asset for web, iOS, and Android.

* Open your webpack.config.js file and include the following content: (If the webpack.config.js file is not located in the root directory of your project, please refer to these instructions to customize it: <https://docs.expo.dev/guides/customizing-webpack/>)

```code
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);
    // Insert the following code snippet: 👇
    config.resolve.alias['expo-asset'] = 'expo-asset-web';
    // Rest of your code...
    return config;
};
```

* Execute the command: `rm -rf package.lock node_modules``

* In the root directory of your project, create a postinstall.sh file and include the following content:

```code
#!/bin/sh
rm -rf node_modules/expo-asset-web/node_modules/@expo/config-plugins/build
```

* Return to your package.json file, find the scripts section, and add this script:

```code
"postinstall": "chmod +x ./postinstall.sh && ./postinstall.sh"
``````

This step is vital to ensure no conflict arises between expo-asset and expo-asset-web packages when using Native modules in Android/iOS environments.

* Save and close your package.json file.

Run:

```sh
npm cache clean --force
npm install
npx expo start --web
```

Now, you should be able to launch your project on the web without encountering any issues.
