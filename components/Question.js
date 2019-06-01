import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import { Dimensions } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {setAnswers, setCurrentQuestion, setRating} from "../redux/app-redux";
import {connect} from "react-redux";



const mapStateToProps = (state) => {
    return {
        userId: state.user._id,
        token: state.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => {dispatch(setCurrentQuestion(question))},
        setRating: (rating) => {dispatch(setRating(rating))}
    };
};

const width = Dimensions.get('window').width;

class Question extends React.Component {

    static navigationOptions = {
        header: null
    };


    constructor (props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>

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

                    <TouchableOpacity onPress={() => this.rateQuestion('like')} style={styles.action}>
                        <MaterialCommunityIcons  name="heart" size={24} color = {this.props.question.rating.likes.includes(this.props.userId) ? 'red' : 'white'} />
                        <Text style={styles.actionValue}>{this.props.question.rating.likes.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.rateQuestion('dislike')} style={styles.action}>
                        <MaterialCommunityIcons  name="heart-broken" size={24} color = {this.props.question.rating.dislike.includes(this.props.userId) ? 'blue' : 'white'} />
                        <Text style={styles.actionValue}>{this.props.question.rating.dislike.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openDetails()} style={styles.action}>
                        <FontAwesome  name="comment" size={24} color='white' />
                        <Text style={styles.actionValue}> {this.props.question.answers.length} </Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }



    async rateQuestion (rating){

        try {
            let response = await fetch('https://shielded-reef-97480.herokuapp.com/question/' + rating, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId: this.props.question._id,
                    userId: this.props.userId
                })
            });

            let responseCode = await response.status;
            response = await response.json();

            if (responseCode === 201) {
                this.props.setRating({
                    questionId: this.props.question._id,
                    obj: response
                });
            } else {
                throw response.message
            }
        } catch (errMsg) {
            Alert.alert(
                'Error',
                errMsg,
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )

        }

        this.forceUpdate();
    }


    openDetails(){
        // this.fetchAnswers();
        this.props.openDetails();
        this.props.setCurrentQuestion(this.props.question);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);


const styles = StyleSheet.create({
    container: {

        width: width - 20,
        margin: 10,
        height: 'auto',
        padding: 10,
        backgroundColor: '#E0358E',
        elevation: 10,
        borderRadius: 5
    },

    question: {
        width: '100%',
        height: 'auto',
    },
    questionTxt: {
        color: 'white',
        fontFamily: 'montserrat-semi-bold',
       // textOverflow: 'ellipsis',
        fontSize: 20,
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
        width: (width/3) - 20 - 4,
        margin: 4
    },

    actionValue: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'montserrat',
        marginLeft: 2,

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
    }

});
