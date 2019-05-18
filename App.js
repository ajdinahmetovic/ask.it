import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import MainComponent from "./components/MainComponent";
import QuestionDetails from "./components/QuestionDetails";
import Question from "./components/Question";
import QuestionList from "./components/Tabs/QuestionList/QuestionList";


const Routes = createStackNavigator ({

  MainComponent: {
    screen: MainComponent
  },

  LogIn: {
    screen: LogIn
  },

  SignUp: {
    screen: SignUp
  },

  QuestionDetails: {
    screen: QuestionDetails
  },

  Question: {
    screen: Question
  },

  QuestionList: {
    screen: QuestionList
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
