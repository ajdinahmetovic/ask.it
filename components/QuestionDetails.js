import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Dimensions, Modal } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";
import Answer from "./Answer";



const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        question: state.currentQuestionViewing,
        answers: state.answers
    };
};

const mapDispatchToProps = (dispatch) => {
    return { };
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

    }

    render() {
        return (
            <View style={styles.container}>

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

                        <TouchableOpacity onPress={() => this.props.openDetails(this.props.question)} style={styles.action}>
                            <FontAwesome  name="comment" size={24} color='white' />
                            <Text style={styles.actionValue}> {this.props.question.answers.answerIds.length} </Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <ScrollView>

                    {this.renderAnswers()}

                </ScrollView>


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



});
