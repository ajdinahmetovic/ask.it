import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Profile from "./Profile";
import QuestionDetails from "../../QuestionDetails";
import EditProfile from "./EditProfile";

const Routes = createStackNavigator ({

    Profile: {
        screen: Profile
    },
    QuestionDetails: {
        screen: QuestionDetails
    },
    EditProfile: {
        screen: EditProfile
    }


});

let Navigation = createAppContainer(Routes);

export default class ProfileContainer extends React.Component {
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
