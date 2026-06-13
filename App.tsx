import React, { ReactElement, useContext, useEffect, useRef } from 'react';
import {
  Linking,
  LogBox,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

//CONTEXT
import { AuthProvider } from './src/context';


//CONSTANT & ASSETS
import { getScaleSize } from './src/constant';
import { COLORS, FONTS } from './src/assets';

//REDUX
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

//SCREENS
import SCREENS from './src/screen';

//PACKAGES
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import _ from 'lodash';
import KeyboardManager from 'react-native-keyboard-manager';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';


LogBox.ignoreAllLogs(true);

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#2E7D32' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
        color: '#000000',
        fontFamily: FONTS.Regular,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#FF5959' }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
        color: '#000000',
        fontFamily: FONTS.Regular,
      }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#FF5959' }}
      {...props}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
        color: '#000000',
        fontFamily: FONTS.Regular,
      }}
    />
  ),
};



const { Navigator, Screen } = createStackNavigator();

function App(): any {
  // const toastRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
    }
  }, []);

  function AppWrraper(): ReactElement {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS._FFF} barStyle={'dark-content'} />
        <NavigationContainer>
          <Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
            initialRouteName={SCREENS.Splash.identifier}>
            {_.toArray(SCREENS).map((item: any, index: number) => {
              return item.component ? (
                <Screen
                  key={item.identifier}
                  name={item.identifier}
                  component={item.component}
                />
              ) : null;
            })}
          </Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1.0 }}>
      <Provider store={store}>
        <AuthProvider>
          {AppWrraper()}
        </AuthProvider>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: 'Transparent',
  },
});

export default App;
