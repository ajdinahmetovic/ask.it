import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';



export default class LogIn extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput placeholder={"Username"} style={styles.inputText}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder={"Password"} secureTextEntry={true} style={styles.inputText}/>
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('MainComponent')} style={styles.loginButton}>
                    <Text style={{color: 'white'}}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={styles.register}>
                    <Text style={{color: 'white'}}> Don't have account ? </Text>
                    <Text style={{color: 'white'}}>Click here !</Text>
                </TouchableOpacity>

            </View>
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
    }
});
