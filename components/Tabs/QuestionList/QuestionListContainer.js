import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import QuestionList from "./QuestionList";
import QuestionDetails from "../../QuestionDetails";
import Question from "../../Question";


const Routes = createStackNavigator ({

    QuestionList: {
        screen: QuestionList
    },

    QuestionDetails: {
      screen: QuestionDetails
    },

    Question: {
        screen: Question
    }

});

let Navigation = createAppContainer(Routes);

export default class QuestionListContainer extends React.Component {
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
