import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'



import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'
import firebase from 'firebase'
import { firebaseConfig } from './config';

//if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
//}


export default class App extends React.Component {
  render(){
    return <AppNavigator/>
  }
} 



const AppSwitchNavigation = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen
})
const AppNavigator = createAppContainer(AppSwitchNavigation)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
});



