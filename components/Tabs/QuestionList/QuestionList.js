import React from 'react';
import {
    StyleSheet,
    Text,
    View,

    ScrollView,
    Dimensions,
    InteractionManager
} from 'react-native';


import { connect } from 'react-redux';
import Question from "../../Question";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {setCurrentQuestion, setQuestions} from "../../../redux/app-redux";
import LoadingComponent from "../Profile/ProfileContainer";
import NewQuestion from "../../NewQuestion";

const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => {dispatch(setCurrentQuestion(question))},
        setQuestions: (questions) => {dispatch(setQuestions(questions))}
    };
};

class QuestionList extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false
    };

    constructor (props){
        super(props);

        this.state = {
            isReady: false
        };
        this.fetchQuestions()
        // console.log(this.props.user);

        this.openDetails = this.openDetails.bind(this);

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

                <View style={styles.header}>
                    <Text> ASK.IT </Text>
                </View>
                <ScrollView>
                    <NewQuestion/>
                  {this.renderQuestions()}
                </ScrollView>
            </View>
        );
    }

    renderQuestions() {
        console.log('Renderer');
        let ques = this.props.questions.reverse();
        console.log(ques.length);
        return ques.map((question) =>{
            return(
                <Question openDetails={this.openDetails} key={question._id} question={question}/>
            )
        })
    }

    async fetchQuestions (){

        let response = await fetch('http://192.168.0.108:3000/question?count=1&sort=date', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            let responseCode = response.status;
            response = await response.json();
            this.props.setQuestions(response);

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
    },


});
