import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, AsyncStorage, KeyboardAvoidingView, ScrollView} from 'react-native';
import LoadingComponent from "./Loading/LoadingComponent";
import {setToken, setUserData} from "../redux/app-redux";
import {connect} from "react-redux";


const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {dispatch(setToken(token))},
        setUserData: (userInfo) => {dispatch(setUserData(userInfo))},
    };
};


class SignUp extends React.Component {

    static navigationOptions = {
        title: 'Sign Up',
        headerStyle: {
            backgroundColor: '#2B2B38',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'montserrat-bold'
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
                    <ScrollView style={{marginTop: 30}}>
                        <KeyboardAvoidingView behavior="padding" enabled>
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
                        </KeyboardAvoidingView>
                    </ScrollView>
            </View>
        );
    }


    async register() {
        try {
            this.setState({isLoading: true});
            if(this.state.password !== this.state.confirmPassword){
                throw 'Passwords dont match'
            }
            let response = await fetch('https://shielded-reef-97480.herokuapp.com/user', {
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
            if (responseCode === 201) {
                await AsyncStorage.setItem('USER', JSON.stringify(response));
                this.props.setUserData(response);
                this.setState({isLoading: false});
                this.props.navigation.navigate('AppStack')
            } else {
                throw response.message
            }
        } catch(errMsg) {
            this.setState({isLoading: false});
            Alert.alert(
                'Error',
                errMsg,
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )
        }
    }
}

export default connect(null, mapDispatchToProps)(SignUp);


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

    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'montserrat-semi-bold',
        width: 250,
        height: 50,
        marginBottom: 30,
        backgroundColor: '#714AE7',
        borderRadius: 5,
        marginTop: 50
    },

    register: {
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }
});
