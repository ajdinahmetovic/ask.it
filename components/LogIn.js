import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    Modal,
    ActivityIndicator
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
        header: null
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
                    <Text style={{color: 'white'}}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={styles.register}>
                    <Text style={{color: 'white'}}> Don't have account ? </Text>
                    <Text style={{color: 'white'}}>Click here !</Text>
                </TouchableOpacity>

            </View>
        );
    }



    async login (){
        this.setState({isLoading: true});
        let response = await fetch('http://192.168.0.108:3000/user/login', {
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

        this.setState({isLoading: false});
        if(responseCode === 201){
            try {
                //console.log(response.token);
                this.props.setToken(response.token);
                this.props.setUserData(response.user);
                await AsyncStorage.setItem('USER', JSON.stringify(response));
            } catch (error) {
                console.log(error)
            }

            this.props.navigation.navigate('AppStack')
        } else {
            console.log(response);
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
        borderRadius: 30,
        marginBottom: 20
    },

    inputText: {
        width: 250,
        height: 50,
    },

    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width: 250,
        height: 50,
        backgroundColor: '#714AE7',
        borderRadius: 30,
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
