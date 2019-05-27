import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {addQuestion} from "../redux/app-redux";
import {connect} from "react-redux";



const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => {dispatch(setCurrentQuestion(question))}
    };
};

const width = Dimensions.get('window').width;

class Question extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>

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
                        <Text style={styles.actionValue}>{this.props.question.rating.likes.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action}>
                        <MaterialCommunityIcons  name="heart-broken" size={24} color='white' />
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


    openDetails(){
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
