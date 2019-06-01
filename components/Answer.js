import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {setAnswerRating, setCurrentQuestion} from "../redux/app-redux";
import {connect} from "react-redux";



const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        userId: state.user._id,
        username: state.user.authData.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => {dispatch(setCurrentQuestion(question))},
        setAnswerRating: (rating) => {dispatch(setAnswerRating(rating))}
    };
};

class Answer extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.userInfo}>
                    <Image style={styles.avatar}
                           source={{uri: 'https://ui-avatars.com/api/?background=714AE7&color=fff&name='+ this.props.answer.author + '&rounded=true'}}/>

                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.userName}>
                        {this.props.answer.author}
                    </Text>

                </View>

                <View style={styles.answer}>

                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.answerTxt}>
                        {this.props.answer.answer}
                    </Text>

                </View>

                <View style={styles.actionBar}>

                    <TouchableOpacity onPress={() => this.rateAnswer('like')} style={styles.action}>
                        <MaterialCommunityIcons  name="heart" size={24} color={this.props.answer.rating.likes.includes(this.props.userId) ? 'red' : 'white'} />
                        <Text style={styles.actionValue}> {this.props.answer.rating.likes.length} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.rateAnswer('dislike')} style={styles.action}>
                        <MaterialCommunityIcons  name="heart-broken" size={24}  color={this.props.answer.rating.dislike.includes(this.props.userId) ? 'blue' : 'white'} />
                        <Text style={styles.actionValue}> {this.props.answer.rating.dislike.length} </Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }


    async rateAnswer (rating){

        let response = await fetch('https://shielded-reef-97480.herokuapp.com/answer/' + rating, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answerId: this.props.answer._id,
                userId: this.props.userId
            })
        });

        let responseCode = await response.status;
        response = await response.json();

        if(responseCode === 201){
            this.props.setAnswerRating({
                answerId: this.props.answer._id,
                obj: response
            });
        }
        this.forceUpdate();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);


const styles = StyleSheet.create({
    container: {

        width: width - 20,
        margin: 10,
        height: 'auto',
        padding: 10,
        backgroundColor: '#2B2B38',
        elevation: 10,
        borderRadius: 5
    },

    answer: {
        width: '100%',
        height: 'auto',
    },
    answerTxt: {
        color: 'white',
        fontFamily: 'montserrat',
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
        marginLeft: 2,
        fontFamily: 'montserrat',


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
