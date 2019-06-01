import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Dimensions, Alert} from 'react-native';
import {addQuestion} from "../redux/app-redux";
import {connect} from "react-redux";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import LoadingModalComponent from "./Loading/LoadingModalComponent";



const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        user: state.user,
        token: state.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: (question) => dispatch(addQuestion(question))
    };
};

class NewQuestion extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            questionTxt: '',
            isLoading: false,

        }
    }

    render() {
        return (
            <View style={styles.typeAnswerContainer}>
                <LoadingModalComponent isLoading={this.state.isLoading}/>
                <TextInput
                    onChangeText={(questionTxt) => this.setState({questionTxt})}
                    value={this.state.questionTxt}
                    style={styles.answerInput}
                    placeholder={'Type your question here'}
                    multiline={true}
                />
                <TouchableOpacity onPress={() => this.postQuestion()}>
                    <MaterialCommunityIcons name='check' size={32} color='white'/>
                </TouchableOpacity>
            </View>
        );
    }

    async postQuestion () {

        this.setState({isLoading: true});
        const user = this.props.user;
        let questionObj = {
            userId: user._id,
            author: user.authData.username,
            question: this.state.questionTxt,
        };

        let response = await fetch('https://shielded-reef-97480.herokuapp.com/question',{
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionObj)
        });

        let responseCode = response.status;
        // console.log(response);
        response = await response.json();
        this.setState({isLoading: false, questionTxt: ''});
        if(responseCode === 201) {
            this.props.addQuestion(response);
        } else {
            Alert.alert(
                'Failed',
                response.message,
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )
        }

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);

const styles = StyleSheet.create({

    typeAnswerContainer:{
        width: width - 20,
        margin: 10,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#E0358E',
        elevation: 10,
        borderRadius: 5
    },

    answerInput:{
        fontFamily: 'montserrat-semi-bold',
        color: 'white',
        minHeight: 50,
        width: '90%',
        height: 'auto'
    },

});
