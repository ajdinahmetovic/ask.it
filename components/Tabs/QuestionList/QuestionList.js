import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Question from "../../Question";
import {setCurrentQuestion} from "../../../redux/app-redux";

const mapStateToProps = (state) => {
    return {
        questions: state.questions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => {dispatch(setCurrentQuestion(question))}
    };
};

class QuestionList extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor (props){
        super(props);

        this.openDetails = this.openDetails.bind(this);

    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text> ASK.IT </Text>
                </View>

                <ScrollView>
                  {this.renderQuestions()}
                </ScrollView>
            </View>
        );
    }


    renderQuestions() {
        return this.props.questions.map((question, index) =>{
            return(
                <Question openDetails={this.openDetails} key={index} question={question}/>
            )
        })
    }

    openDetails (){
        this.props.navigation.navigate('QuestionDetails');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B38',
    },

    header: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:  '#2B2B38',
    }

});
