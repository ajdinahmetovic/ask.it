import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import NewQuestion from "./Tabs/NewQuestion";
import QuestionListContainer from "./Tabs/QuestionList/QuestionListContainer";
import ProfileContainer from "./Tabs/Profile/ProfileContainer";


const TabNavigator = createBottomTabNavigator({

        QuestionList: {
            screen: QuestionListContainer,
            navigationOptions: {
                tabBarLabel: '',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons  name="comment-question-outline" size={32} color={tintColor} />
                )
            }
        },

        NewQuestion: {
            screen: NewQuestion,
            navigationOptions: {
                tabBarLabel: '',
                tabBarIcon: () => (
                    <MaterialIcons  name="add-circle" size={64} color='#714AE7' />
                )
            }
        },

        Profile: {
            screen: ProfileContainer,
            navigationOptions: {
                tabBarLabel: '',
                tabBarIcon: ({tintColor}) => (
                        <MaterialCommunityIcons  name="account-outline" size={32} color={tintColor} />
                )
            }
        },

    },

    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#E0358E',
            inactiveTintColor: '#6D6C71',
            style:{
                backgroundColor: '#2B2B38',
                height: 66,
            },
        },
    }

);


let TabNav = createAppContainer(TabNavigator);

export default class MainComponent extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
                <TabNav/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B38',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
