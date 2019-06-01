import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Alert} from 'react-native';
import { Dimensions } from 'react-native'
import {connect} from "react-redux";
import Question  from "../../Question";
import {setCurrentQuestion, setUserData} from "../../../redux/app-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoadingModalComponent from "../../Loading/LoadingModalComponent";


const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (userInfo) => {dispatch(setUserData(userInfo))},
    };
};

class EditProfile extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B2B38',
            elevation: 0,

        },
    };

    constructor (props){
        super(props);

        this.state = {
            isLoading: false
        }

    }

    render() {

        return (
            <View style={styles.container}>

                <LoadingModalComponent isLoading={this.state.isLoading}/>
                <ScrollView>
                    <View style={{width: width, alignItems:'center', justifyContent: 'center'}}>

                        <View style={styles.inputContainer}>
                            <TextInput
                                onChangeText={(newPassword) => this.setState({newPassword})}
                                value={this.state.newPassword}
                                placeholder={"New Password"} style={styles.inputText}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                                value={this.state.confirmPassword}
                                placeholder={"Retype Password"} style={styles.inputText}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                onChangeText={(oldPassword) => this.setState({oldPassword})}
                                value={this.state.oldPassword}
                                placeholder={"Current password"} secureTextEntry={true} style={styles.inputText}/>
                        </View>

                        <TouchableOpacity onPress={() => this.changePassword()} style={styles.applyButton}>
                            <Text style={{color: 'white'}}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        );
    }


    async changePassword (){
        this.setState({isLoading: true});

        try{
            if(this.state.newPassword !== this.state.confirmPassword){
                throw 'Passwords do not match'

            }

            let response = await fetch('https://shielded-reef-97480.herokuapp.com/user/change',{
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: this.props.user._id,
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword
                })
            });

            let resCode = response.status;
            response = await response.json();

            console.log(this.props.user._id);
            console.log(response);

            if(resCode === 201){
                await this.props.setUserData(response);
                ToastAndroid.show('Password changed !', ToastAndroid.LONG);
                this.setState({isLoading: false});
                this.props.navigation.navigate('Profile')
            } else {
                throw response.message
            }

        } catch (errMsg) {
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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

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
    },

    applyButton: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width: 250,
        height: 50,
        backgroundColor: '#714AE7',
        borderRadius: 5,
        marginTop: 50,
        marginBottom: 10,
    },

    register: {
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      width: '100%',
      height: 100
    },

    avatar: {
        width: 90,
        height: 90
    }


});
