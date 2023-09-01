import './ignoreWarnings'
import { useFonts } from 'expo-font';
import { fonts } from './src/Utils/Global/fonts';
import Navigator from './src/Components/Navigation/Navigator';
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
