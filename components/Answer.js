import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';



const width = Dimensions.get('window').width;

export default class LogIn extends React.Component {


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.userInfo}>
                    <Image style={styles.avatar} source={{uri: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'}}/>

                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.userName}>
                       Ajdin says:
                    </Text>

                </View>

                <View style={styles.answer}>

                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.answerTxt}>
                        Answer to a question
                    </Text>

                </View>

                <View style={styles.actionBar}>

                    <TouchableOpacity style={styles.action}>
                        <MaterialCommunityIcons  name="heart" size={24} color='white' />
                        <Text style={styles.actionValue}>1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action}>
                        <MaterialCommunityIcons  name="heart-broken" size={24} color='white' />
                        <Text style={styles.actionValue}>1</Text>
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
