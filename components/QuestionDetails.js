import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Dimensions, Modal } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";
import { InteractionManager, ActivityIndicator} from 'react-native';
import Answer from "./Answer";
import LoadingComponent from "./Loading/LoadingComponent";
import {setAnswers, addAnswer} from "../redux/app-redux";



const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        question: state.currentQuestionViewing,
        answers: state.answers,
        user: state.user,
        token: state.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAnswer: (answer) => {dispatch(addAnswer(answer))},
        setAnswers: (answers) => {dispatch(setAnswers(answers))},

    };
};

class QuestionDetails extends React.Component {


    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#E0358E',
            elevation: 0,
        },
        headerTintColor: '#fff',
    };

    constructor (props){
        super(props);

        this.state = {
            isReady: false,
        };

        this.postAnswer = this.postAnswer.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {

        this.fetchAnswers()
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                isReady: true
            })
        });
    }

    render() {
        if(!this.state.isReady){
            return <LoadingComponent />
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.containerQuestion}>

                    <View style={styles.userInfo}>
                        <Image style={styles.avatar}
                               source={{uri: 'https://ui-avatars.com/api/?background=714AE7&color=fff&name='+ this.props.question.author + '&rounded=true'}}/>

                        <Text numberOfLines={3} ellipsizeMode='tail' style={styles.userName}>
                            {this.props.question.author} asks:
                        </Text>

                    </View>

                    <View style={styles.question}>

                        <Text numberOfLines={3} ellipsizeMode='tail' style={styles.questionTxt}>
                            {this.props.question.question}
                        </Text>

                    </View>

                    <View style={styles.actionBar}>

                        <TouchableOpacity style={styles.action}>
                            <MaterialCommunityIcons  name="heart" size={24} color = {this.props.question.rating.likes.includes(this.props.user._id) ? 'red' : 'white'} />
                            <Text style={styles.actionValue}>{this.props.question.rating.likes.length}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action}>
                            <MaterialCommunityIcons  name="heart-broken" size={24} color = {this.props.question.rating.dislike.includes(this.props.user._id) ? 'red' : 'white'} />
                            <Text style={styles.actionValue}>{this.props.question.rating.dislike.length}</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                    <View style={styles.typeAnswerContainer}>

                        <TextInput
                            style={styles.answerInput}
                            placeholder={'Type your answer'}
                            onChangeText={(answer) => this.setState({answer})}
                            value={this.state.answer}
                            multiline={true}
                        />

                        <TouchableOpacity onPress={() => this.postAnswer()}>
                            <MaterialCommunityIcons name='check' size={32} color='white'/>
                        </TouchableOpacity>

                    </View>

                    {this.renderAnswers()}

                </ScrollView>
                {/*

                    <KeyboardAvoidingView style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
                                          behavior="position">
                        <View style={styles.typeAnswerContainer}>

                            <TextInput
                                style={styles.answerInput}
                                placeholder={'Type your answer'}
                                multiline={true}
                            />

                            <TouchableOpacity>
                                <MaterialCommunityIcons name='check' size={32} color='white'/>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>
                    */
                }
            </View>
        );
    }

    renderAnswers () {
        return this.props.answers.map((answer) => {
            return(
                <Answer key={answer._id} answer={answer}/>
            );

        })
    }

    async fetchAnswers (){

        let response = await fetch('https://shielded-reef-97480.herokuapp.com/answer?questionId='+ this.props.question._id +'&count=1&sort=date', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

        let responseCode = response.status;
        response = await response.json();
        this.props.setAnswers(response);
    }



    async postAnswer(){

        let response = await fetch('https://shielded-reef-97480.herokuapp.com/question/answer', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.props.user._id,
                answer:{
                    questionId: this.props.question._id,
                    author: this.props.user.authData.username,
                    answer: this.state.answer
                }
            })
        });

        response = await response.json();

        this.props.addAnswer(response);

        /*
        if(response.status === 201){
            response = await response.json();
            this.props.addAnswer(response)
        }
            */
        //
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B38'

    },

    containerQuestion: {

        width: width,
        height: 'auto',
        padding: 10,
        backgroundColor: '#E0358E',
    },


    question: {
        width: '100%',
        height: 'auto',
    },
    questionHeader: {
        height: 'auto',
        backgroundColor: '#E0358E',

    },
    userInfo: {
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        height: 35,
        marginBottom: 5,
        flexDirection: 'row',
    },
    avatar: {
        width: 35,
        height: 35,
    },
    userName: {

        fontFamily: 'montserrat',
        marginLeft: 5,
        fontSize: 15,
        color: 'white',
    },

    actionBar: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        height: 30,
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: (width/2) - 20 - 4,
        margin: 4
    },

    actionValue: {
        color: 'white',
        fontSize: 15,
        marginLeft: 2,
        fontFamily: 'montserrat',


    },

    questionTxt: {
        fontFamily: 'montserrat-semi-bold',

        color: 'white',
        // textOverflow: 'ellipsis',
        fontSize: 20,
    },

    typeAnswerContainer:{
        width: width - 20,
        margin: 10,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#2B2B38',
        elevation: 10,
        borderRadius: 5
    },

    answerInput:{
        color: 'white',
        fontFamily: 'montserrat',
        minHeight: 50,
        width: '90%',
        height: 'auto'
    },
});
