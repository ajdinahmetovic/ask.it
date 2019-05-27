import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Dimensions, Modal } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";
import { InteractionManager, ActivityIndicator} from 'react-native';
import Answer from "./Answer";
import LoadingComponent from "./Loading/LoadingComponent";
import {addAnswer} from "../redux/app-redux";



const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        question: state.currentQuestionViewing,
        answers: state.answers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAnswer: (answer) => {dispatch(addAnswer(answer))}
    };
};

class QuestionDetails extends React.Component {


    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#E0358E',
            elevation: 0,
        },

    };

    constructor (props){
        super(props);

        this.state = {
            isReady: false,
        };

        this.postAnswer = this.postAnswer.bind(this);
    }

    componentDidMount() {

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
                        <Image style={styles.avatar} source={{uri: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'}}/>

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
                            <MaterialCommunityIcons  name="heart" size={24} color='white' />
                            <Text style={styles.actionValue}>{this.props.question.rating.likes.userIds.length}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action}>
                            <MaterialCommunityIcons  name="heart-broken" size={24} color='white' />
                            <Text style={styles.actionValue}>{this.props.question.rating.dislikes.userIds.length}</Text>
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

                        <TouchableOpacity onPress={() => this.postAnswer(this.state.answer)}>
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
        return this.props.question.answers.answerIds.map((answer, index) => {
            return(
                <Answer key={index}/>
            );

        })
    }

    postAnswer(answer){
        this.props.addAnswer(answer)
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
