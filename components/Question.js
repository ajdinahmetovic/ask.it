import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';



const width = Dimensions.get('window').width;

export default class LogIn extends React.Component {

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
        );
    }
}

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
        marginLeft: 5,
        fontSize: 15,
        color: 'white',
    }

});
