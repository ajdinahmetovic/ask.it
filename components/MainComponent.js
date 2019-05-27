import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import QuestionListContainer from "./Tabs/QuestionList/QuestionListContainer";
import ProfileContainer from "./Tabs/Profile/ProfileContainer";
import {connect} from "react-redux";


const TabNavigator = createBottomTabNavigator({

        QuestionList: {
            screen: QuestionListContainer,
            navigationOptions: {
                tabBarLabel: '',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons  name="comment-question-outline" size={30} color={tintColor} />
                )
            }
        },

        HotQuestion: {
            screen: QuestionListContainer,
            navigationOptions: {
                tabBarLabel: '',
                tabBarIcon: ({tintColor}) => (
                    <SimpleLineIcons  name="fire" size={30} color={tintColor} />
                )
            }
        },

        TopUsers: {
            screen: QuestionListContainer,
            navigationOptions: {
                tabBarLabel: '',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons  name="format-list-numbers" size={30} color={tintColor} />
                )
            }
        },

        Profile: {
            screen: ProfileContainer,
            navigationOptions: {
                tabBarLabel: '',
                tabBarIcon: ({tintColor}) => (
                        <MaterialCommunityIcons  name="account-outline" size={30} color={tintColor} />
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
                height: 45,
            },
        },
    }

);


let TabNav = createAppContainer(TabNavigator);

const mapStateToProps = (state) => {
    return {
        tabBarVisibility: state.tabBarVisibility,
    };
};



class MainComponent extends React.Component {
    constructor (props){
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        header: null,
       // tabBarVisible: this.props.tabBarVisibility
    });

    render() {
        return (
                <TabNav/>
        );
    }
}

export default connect(mapStateToProps)(MainComponent);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B38',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
