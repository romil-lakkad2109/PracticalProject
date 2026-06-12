
import React, {useEffect} from 'react';
import {LogBox, Platform, StatusBar, StyleSheet, View} from 'react-native';

//ASSETS & CONSTANT
import {COLORS, FONTS} from './src/assets';

//CONTEXT
import { AuthProvider } from './src/context';

//PACKAGES
import _ from 'lodash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNavigationContainerRef} from '@react-navigation/native';

//SCREENS
import SCREENS from './src/screen';


const {Navigator, Screen} = createNativeStackNavigator();

LogBox.ignoreAllLogs();

const App = () => {
  return (    
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <View style={styles.container}>
            <StatusBar
              translucent={true}
              backgroundColor={'transparent'}
              barStyle={'dark-content'}
            />
                <AuthProvider>
                  <NavigationContainer ref={createNavigationContainerRef()}>                    
                    <Navigator
                      screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                      }}
                      initialRouteName={SCREENS.Splash.identifier}>
                      {_.toArray(SCREENS).map((item: any) => {
                        return item.component ? (
                          <Screen
                            key={item.identifier}
                            name={item.identifier}
                            component={item.component}
                            options={{
                              gestureEnabled:
                                Platform.OS === 'ios' ? true : false,
                            }}
                          />
                        ) : null;
                      })}
                    </Navigator>
                  </NavigationContainer>                  
                </AuthProvider>              
          </View>
        </GestureHandlerRootView>
      </SafeAreaProvider>    
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS._FFF,
  },
  successToast: {
    backgroundColor: COLORS._FFF,
    borderLeftColor: 'green',
  },
  erroToast: {
    backgroundColor: COLORS._FFF,
    borderLeftColor: 'red',
  },
  infoToast: {
    backgroundColor: COLORS._FFF,
    borderLeftColor: 'gray',
  },
  successToastContentContainer: {
    paddingHorizontal: 15,
  },
});
