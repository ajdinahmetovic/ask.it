import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import LoadingComponent from "./Loading/LoadingComponent";



export default class SignUp extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B2B38',
            elevation: 0,

        },
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    render() {

        if(this.state.isLoading){
            return(
                <LoadingComponent/>
            )
        }

        return (
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        placeholder={"Full Name"}
                        style={styles.inputText}/>
                </View>


                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        placeholder={"Username"}
                        style={styles.inputText}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        placeholder={"Email"}
                        secureTextEntry={true}
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

                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        value={this.state.confirmPassword}
                        placeholder={"Confirm password"}
                        secureTextEntry={true}
                        style={styles.inputText}/>
                </View>

                <TouchableOpacity onPress={() => this.register()} style={styles.registerButton}>
                    <Text style={{color: 'white'}}>REGISTER</Text>
                </TouchableOpacity>

            </View>
        );
    }


    async register() {

        this.setState({isLoading: true});
        let response = await fetch('http://192.168.0.108:3000/user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                authData: {
                    username: this.state.username,
                    password: this.state.password,
                },
                userData: {
                    name: this.state.name,
                    email: this.state.email,
                    avatar: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'
                }
            })

        });

        let responseCode = response.status;
        response = await response.json();

        this.setState({isLoading: false});
        if(responseCode === 201){
            console.log(response);
            this.props.navigation.navigate('MainComponent')
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
        fontFamily: 'montserrat'
    },

    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'montserrat-semi-bold',
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
    }
});
