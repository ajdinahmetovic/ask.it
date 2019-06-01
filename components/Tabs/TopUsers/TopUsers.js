import React from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl, Image, Alert} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import {connect} from "react-redux";
import {setTopUsers} from "../../../redux/app-redux";
import LoadingComponent from "../../Loading/LoadingComponent";

const mapDispatchToProps = (dispatch) => {
    return {
        setTopUsers: (question) => {dispatch(setTopUsers(question))},
    };
};

const mapStateToProps = (state) => {
    return {
        topUsers: state.topUsers
    };
};



class TopUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            topUsers: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.fetchTopUsers()
    }

    static navigationOptions = {
        title: 'Top users',
        headerStyle: {
            backgroundColor: '#2B2B38',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'montserrat-bold',
            textAlign: 'center'
        },
    };

    render() {
        if(!this.state.isReady){
            return(<LoadingComponent/>)
        }
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.topUsers}
                    extraData={this.props}
                    renderItem={this.renderTopUsers}
                    numColumns={2}
                    keyExtractor={(user, index) => index}

                />


            </View>
        );
    }

    renderTopUsers = (user) => {
        if(user != null){
            return(
                <View style={styles.userContainer}>
                    <View style={styles.user}>

                        <Image style={styles.avatar}
                               source={{uri: 'https://ui-avatars.com/api/?background=714AE7&color=fff&name='+ user.item.authData.username + '&rounded=true&size=80'}}/>
                        <Text style={styles.nameTxt}>{user.item.userData.name}</Text>
                        <Text style={styles.usernameTxt}>@{user.item.authData.username}</Text>

                        <Text style={styles.usernameTxt}>{user.item.answeredQuestions.length + ' '} Answers</Text>
                        <Text style={styles.usernameTxt}>{user.item.myQuestions.length +' '} Questions</Text>


                    </View>
                </View>
            )
        }

    };

    async fetchTopUsers () {

        this.setState({refreshing: true});
        let response = await fetch('https://shielded-reef-97480.herokuapp.com/user/top',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if(response.status === 201){
            response = await response.json();
            this.setState({topUsers: response});
            await this.props.setTopUsers(response);
            this.setState({isReady: true});
            this.setState({refreshing: false})
        } else {

            Alert.alert(
                'Error',
                'Something happened',
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )
        }


    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TopUsers);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B38',
        alignItems: 'center',
        justifyContent: 'center',
    },

    userContainer: {
        width: '50%',
        height: 230,
        alignItems: 'center',
        justifyContent: 'center'
    },

    user: {
        width: '90%',
        height: 210,
        backgroundColor: '#E0358E',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    avatar: {
        width: 80,
        height: 80,
        marginBottom: 5

    },
    nameTxt: {
        fontFamily:'montserrat-semi-bold',
        fontSize: 15,
        color: 'white',
    },
    usernameTxt: {
        fontSize: 12,
        fontFamily: 'montserrat',
        color: 'white',
        marginTop: 5,
    }

});
