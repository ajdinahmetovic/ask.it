import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import MainComponent from "./components/MainComponent";
import QuestionDetails from "./components/QuestionDetails";
import Question from "./components/Question";
import QuestionList from "./components/Tabs/QuestionList/QuestionList";
import { Font } from 'expo';
import {Provider} from "react-redux";
import {store} from "./redux/app-redux";

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

  constructor(props){
    super(props);

    this.state = {
      isReady: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'montserrat': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
      'montserrat-thin': require('./assets/font/Montserrat-Thin.ttf'),
      'montserrat-semi-bold': require('./assets/font/Montserrat-SemiBold.ttf'),

    });

    this.setState({isReady:true})
  }


  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading/>;
    }
    return (
        <Provider store={store}>
          <Navigation/>
        </Provider>
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
