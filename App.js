import { useFonts } from 'expo-font';
import { fonts } from './src/Global/fonts';
import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import Store from './src/Redux/store';

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={Store}>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </Provider>
  );
}
