import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import MainComponent from "./components/MainComponent";

const Routes = createStackNavigator ({

  LogIn: {
    screen: LogIn
  },
  SignUp: {
    screen: SignUp
  },
  MainComponent: {
    screen: MainComponent
  }



});

let Navigation = createAppContainer(Routes);

export default class App extends React.Component {
  render() {
    return (
        <Navigation/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
