/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppLoading, Login, Register, Track} from './src/Screens';
import Navigator from './src/Utils/Navigator';

global.isUserLoggedIn = false;
global.userData = null;

const AppStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        Navigator.setTopLevelNavigator(navigatorRef);
      }}>
      <View style={appStyles.container}>
        <AppStack.Navigator initialRouteName="AppLoading">
          <AppStack.Screen
            name="AppLoading"
            component={AppLoading}
            options={{
              headerShown: false,
            }}
          />
          <AppStack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              ...appStyles.headerNav,
            }}
          />
          <AppStack.Screen
            name="Register"
            component={Register}
            options={{
              title: 'Register',
              ...appStyles.headerNav,
            }}
          />
          <AppStack.Screen
            name="Track"
            component={Track}
            options={{
              title: 'F1 Car Racing',
              ...appStyles.headerNav,
            }}
          />
        </AppStack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const appStyles = {
  container: {
    flex: 1,
  },
  headerNav: {
    headerTitleStyle: {
      alignSelf: 'center',
    },
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
  },
};
