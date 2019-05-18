import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';



export default class SignUp extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B2B38',
            elevation: 0,

        },
    };
    
    render() {
        return (
           <View style={styles.container}>

               <View style={styles.inputContainer}>
                   <TextInput placeholder={"Username"} style={styles.inputText}/>
               </View>

               <View style={styles.inputContainer}>
                   <TextInput placeholder={"Email"} secureTextEntry={true} style={styles.inputText}/>
               </View>

               <View style={styles.inputContainer}>
                   <TextInput placeholder={"Password"} style={styles.inputText}/>
               </View>

               <View style={styles.inputContainer}>
                   <TextInput placeholder={"Confirm password"} secureTextEntry={true} style={styles.inputText}/>
               </View>

               <TouchableOpacity style={styles.loginButton}>
                   <Text style={{color: 'white'}}>REGISTER</Text>
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
