<div align="center">
<img src="./src/Assets/Icons/krusty-burger-logo-1_500.png" height="167" width="209">
</div>

<h1 align="center">📱 Krusty Burger App ⚛️</h1>

![Node](https://img.shields.io/badge/Node-16-green)
![Expo](https://img.shields.io/badge/Expo-48-blue)
![React](https://img.shields.io/badge/React-18-blueviolet)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.6.0-red)

Krusty Burger App is a fan project developed for Android and iPhone devices in portrait mode. It allows fans of The Simpsons to explore the fictional world of Krusty Burger, a popular fast-food restaurant in the show.

**Disclaimer:** *This app is a fan project and is not affiliated with or endorsed by the owners of The Simpsons rights.*

## Prerequisites

- node >=14.0.0
- npm >=6.0.0
- expo >=41.0.0

## Features

- Create an account or log in with an existing account.
- Browse a menu of delicious Krusty Burger items.
- View images and descriptions of menu items.
- Add items to your cart and place an order.
- Find the nearest Krusty Burger restaurant.

## Installation

To run the Krusty Burger App on your local machine, follow these steps:

1. Clone this repository.

   ```bash
   git clone https://github.com/fakush/krusty_burger-react_native_demo.git
   ```

2. Navigate to the project directory.

   ```bash
   cd krusty_burger-react_native_demo
   ```

3. Install dependencies.

   ```bash
   npm install --legacy-peer-deps
   ```

4. Start the app.

   ```bash
   npm start
   ```

5. Follow the Expo CLI instructions to open the app on your Android or iOS device or emulator.

> For web debugging follow instructions in `./webDebugSetup.md`.

## Development Notes

- Note: There is a lot of "cli garbagge" given by `reac-native-carousel-snap` library
  - This is a known bug of that library. As a temporary fix Comment library import and component while working on the app. Just remember to uncomment before push.

- New libraries installation
  - As a rule we recommend the installation of new libraries done by `npx expo install` command as an alternative to regular npm installation. This helps to install Expo SDK compatible libraries if found.

```sh
npx expo install [library]
```

- Also we recommend using EXPO 49 SDK Reference to search for compatible libraries and installation instructions. <https://docs.expo.dev/versions/latest/>

## Building for Development Testing

Follow these steps for development testing build:

```shell
npm install -g eas-cli
```

If you haven´t already install EAS client and login.

```shell
eas build -p [platform*] --profile [profile*]
```

## Building for Production

When you're ready to build the app for production, you can use the following Expo CLI command:

Insert API Key in app.json
 Copy the API key provided with credentials in `android.config.googleMaps.apiKey` field.

> WARNING! - DO NOT PUSH API-KEY TO REPOSITORY

```shell
npm install -g eas-cli
```

If you haven´t already install EAS client and login.

```shell
eas build -p [platform*]
```

*Replace [platform] with the target platform (e.g., android or ios). This will guide you through the process of building a standalone APK or IPA file.

*Replace [profile] with the target configuration profile (e.g., preview).

## Main Libraries

**This is an Expo Managed React Native App**

- @faker-js/faker - Random information generator library
- @react-native-async-storage/async-storage - Persistence Library
- react-native-carousel-snap - Carousel View
- react-native-maps - Maps implementation.
- react-native-paper - Component UI library

## Credits

- The images used in this app were downloaded from the internet and the Freepik website. We do not claim ownership of these images, and they are used for educational and entertainment purposes only.

## License

- This project is licensed under the MIT License.
