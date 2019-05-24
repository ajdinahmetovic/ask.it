import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Dimensions } from 'react-native'
import {connect} from "react-redux";
import Question  from "../../Question";
import {setCurrentQuestion} from "../../../redux/app-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        user: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
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

        }

    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={{width: width, alignItems:'center', justifyContent: 'center'}}>
                        <View style={styles.avatarContainer}>
                            <Image style={styles.avatar} source={{uri: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'}}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput value={this.props.user.publicData.username} placeholder={"Username"} style={styles.inputText}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput value={this.props.user.personalData.email} placeholder={"Email"} secureTextEntry={true} style={styles.inputText}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput value={this.props.user.publicData.password} placeholder={"Password"} style={styles.inputText}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput placeholder={"Current password"} secureTextEntry={true} style={styles.inputText}/>
                        </View>

                        <TouchableOpacity style={styles.applyButton}>
                            <Text style={{color: 'white'}}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        );
    }

    updateData(){



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
        borderRadius: 30,
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
        borderRadius: 30,
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
