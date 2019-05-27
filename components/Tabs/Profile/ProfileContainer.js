import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Profile from "./Profile";
import QuestionDetails from "../../QuestionDetails";
import EditProfile from "./EditProfile";
import LoadingComponent from "../../Loading/LoadingComponent";
import { InteractionManager, ActivityIndicator} from 'react-native';

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

    constructor (props){
        super(props);
        this.state = {
            isReady: false
        };
    }


    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({
                isReady: true
            })
        });
    }


    render() {

        if(!this.state.isReady){
            return <LoadingComponent />
        }
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
