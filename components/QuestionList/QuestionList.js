import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    InteractionManager,
    ActivityIndicator, Alert,
} from 'react-native';

import { connect } from 'react-redux';
import Question from "../Question";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {setCurrentQuestion, setQuestions, clearQuestions} from "../../redux/app-redux";
import NewQuestion from "../NewQuestion";

const width = Dimensions.get('window').width;

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        token: state.token,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => {dispatch(setCurrentQuestion(question))},
        setQuestions: (questions) => {dispatch(setQuestions(questions))},
        clearQuestions: () => {dispatch(clearQuestions())},

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
            isReady: false,
            count: 1
        };


        this.openDetails = this.openDetails.bind(this);

    }

    componentDidMount() {
        //this.props.clearQuestions();
        //this.fetchQuestions(1);
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                isReady: true
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <NewQuestion/>
                {this.renderQuestions()}
                {this.showLoadMore()}
                </ScrollView>

            </View>
        );
    }


    showLoadMore(){

        if (!this.state.isReady) {
            return(
                <ActivityIndicator size="large" color="#E0358E"/>
            )
        } else if(this.props.questions.length % 20 === 0 && this.props.questions.length !== 0){
            return(

                <TouchableOpacity style={styles.loadContainer} onPress={() => this.fetchQuestions(this.getCount())}>
                    <Text style={{fontSize: 20, fontFamily: 'montserrat-bold', color: 'white'}}>Load more</Text>
                </TouchableOpacity>
            )
        }

    }

    getCount(){
        this.setState({count: this.state.count++});
        return this.state.count;
    }


    renderQuestions() {
        return this.props.questions.map((question) =>{
            return(
                <Question openDetails={this.openDetails} key={question._id} question={question}/>
            )
        })
    }

    async fetchQuestions (count){

        try {
            this.setState({isReady: false});
            let response = await fetch('https://shielded-reef-97480.herokuapp.com/question?count=' + count + '&sort=' + this.props.sorting, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            let responseCode = response.status;
            response = await response.json();
            if(responseCode === 201) {
                this.props.setQuestions(response);
                this.setState({isReady: true});
            } else {
                throw response.message;
            }


        } catch (e) {
            Alert.alert(
                'Error', 'Failed to fetch questions',
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )
        }
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

    loadContainer: {
        width: width,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
