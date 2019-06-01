import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    ScrollView
} from 'react-native';
import LoadingComponent from "./Loading/LoadingComponent";
import LoadingModalComponent from "./Loading/LoadingModalComponent";
import {AppLoading} from "expo";
import {setUserData} from "../redux/app-redux";
import {setToken} from "../redux/app-redux";

import {connect} from "react-redux";


const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {dispatch(setToken(token))},
        setUserData: (userInfo) => {dispatch(setUserData(userInfo))},
    };
};

class LogIn extends React.Component {
    static navigationOptions = {
       title: 'ASKIT',
        headerStyle: {
            backgroundColor: '#2B2B38',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'montserrat-bold'
        },
    };

    constructor(props){
        super(props);
        this.state= {
            isLoading: false,
        }
    }


    render() {

        return (
            <View style={styles.container}>

                <LoadingModalComponent isLoading={this.state.isLoading}/>

                <ScrollView style={{marginTop: 30}}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                            placeholder={"Username"}
                            style={styles.inputText}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            style={styles.inputText}/>
                    </View>

                    <TouchableOpacity onPress={() => this.login()} style={styles.loginButton}>
                        <Text style={{color: 'white', fontFamily: 'montserrat-semi-bold'}}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={styles.register}>
                        <Text style={{color: 'white', fontFamily: 'montserrat'}}> Don't have account ? </Text>
                        <Text style={{color: 'white', fontFamily: 'montserrat'}}>Click here !</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }



    async login (){
        this.setState({isLoading: true});
        let response = await fetch('https://shielded-reef-97480.herokuapp.com/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                authData: {
                    username: this.state.username,
                    password: this.state.password,
                }
            })
        });

        let responseCode = response.status;
        response = await response.json();

        if(responseCode === 201){
            try {
                this.props.setUserData(response);
                await AsyncStorage.setItem('USER', JSON.stringify(response));
            } catch (error) {
                Alert.alert(
                    'Error',
                    error,
                    [
                        {text: 'Try again', style: 'cancel'},
                    ],
                    { cancelable: true }
                )

            }

            this.setState({isLoading: false});
            this.props.navigation.navigate('AppStack')
        } else {
            Alert.alert(
                'Error',
                response.message,
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )
        }


    }
}
export default connect(null, mapDispatchToProps)(LogIn);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B38',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputContainer: {
        width: 250,
        height: 50,
        paddingHorizontal: 5,
        backgroundColor: '#E0358E',
        borderRadius: 5,
        marginBottom: 20
    },

    inputText: {
        width: 250,
        height: 50,
        color: 'white',
        fontFamily: 'montserrat'
    },

    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width: 250,
        height: 50,
        backgroundColor: '#714AE7',
        borderRadius: 5,
        fontFamily: 'montserrat-semi-bold',
        marginTop: 50
    },

    register: {
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    modal: {
        width: 100,
        height: 100,
        backgroundColor: '#E0358E',
        alignItems:'center',
        justifyContent: 'center',
    }
});
