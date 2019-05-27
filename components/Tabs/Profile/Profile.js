import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Dimensions } from 'react-native'
import {connect} from "react-redux";
import Question  from "../../Question";
import {setCurrentQuestion} from "../../../redux/app-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InteractionManager, ActivityIndicator} from 'react-native';
import LoadingComponent from "../../QuestionDetails";



const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        user: state.user,
        questions: state.questions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => {dispatch(setCurrentQuestion(question))}
    };
};

class Profile extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor (props){
        super(props);

        this.state = {
            isReady: false
        };

        this.openDetails = this.openDetails.bind(this);

    }




    render() {

        return (
           <View style={styles.container}>

               <View>
                   <Text>
                       ASKIT
                   </Text>
               </View>

             <View style={styles.userInfoContainer}>

                 <View style={styles.avatarContainer}>
                     <Image style={styles.avatar} source={{uri: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'}}/>
                 </View>

                 <View style={styles.infoContainer}>
                     <View style={{flexDirection: 'row'}}>
                        <Text style={styles.nameTxt}>{this.props.user.userData.name}</Text>
                         <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')} style={{marginLeft: 5}}>
                            <MaterialCommunityIcons  name="settings" size={24} color='white' />
                         </TouchableOpacity>
                     </View>

                     <Text style={styles.usernameTxt}>@{this.props.user.authData.username}</Text>

                     <View style={{flexDirection: 'row', marginTop: 5}}>

                         <Text style={{fontSize: 15, color: '#8E8D93', fontFamily: 'montserrat',}}>
                             1 Questions
                         </Text>

                         <Text style={{fontSize: 15, color: '#8E8D93', fontFamily: 'montserrat', marginLeft: 5}}>
                             1 Answers
                         </Text>

                     </View>
                 </View>

             </View>

               <ScrollView>
                   {this.renderMyQuestions()}
               </ScrollView>

           </View>
        );
    }

    renderMyQuestions(){
        return this.props.questions.map((question, index) => {
            return(
                <Question openDetails={this.openDetails} key={index} question={question}/>
            )
        })
    }

    openDetails (){
        this.props.navigation.navigate('QuestionDetails');
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    container: {
          flex: 1,
          backgroundColor: '#2B2B38'
    },

    userInfoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: width,
        display: 'flex',
        flexDirection: 'row'
    },

    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: '40%',
    },

    avatar: {
        width: '60%',
        height: '60%'
    },

    infoContainer: {
        justifyContent: 'center',
        width: '60%',
        height: 150,
    },

    nameTxt: {
        fontFamily:'montserrat-semi-bold',
        fontSize: 18,
        color: 'white',
    },
    usernameTxt: {
        fontSize: 15,
        fontFamily: 'montserrat',
        color: '#8E8D93',
        marginTop: 5,
    }
});
