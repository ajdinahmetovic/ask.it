import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import QuestionList from "./QuestionList";
import QuestionDetails from "../QuestionDetails";
import Question from "../Question";
import LoadingComponent from "../Loading/LoadingComponent";
import {clearQuestions, setQuestions} from "../../redux/app-redux";
import {connect} from "react-redux";


const Routes = createStackNavigator ({

    QuestionList: {
        screen: QuestionList
    },

    QuestionDetails: {
      screen: QuestionDetails
    },

    Question: {
        screen: Question
    }

});

let Navigation = createAppContainer(Routes);

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        clearQuestions: () => {dispatch(clearQuestions())},
        setQuestions: (questions) => {dispatch(setQuestions(questions))},
    };
};

class QuestionListContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isReady: false
        }
    }


    componentDidMount() {
        this.props.navigation.addListener('willFocus', (route) => {
            this.fetchQuestions(1, route.state.routeName === 'RecentQuestions' ? 'date' : 'hot');
        });
    }

    render() {
        if(!this.state.isReady){
            return(<LoadingComponent/>)
        }
        return (
            <Navigation/>
        );
    }

    async fetchQuestions (count, sorting){

        try {
            this.props.clearQuestions();
            this.setState({isReady: false});
            let response = await fetch('https://shielded-reef-97480.herokuapp.com/question?count=' + count + '&sort=' + sorting, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            let responseCode = response.status;
            response = await response.json();
            if (responseCode === 201) {
                this.props.setQuestions(response);
                this.setState({isReady: true});
            } else {
                throw response.message
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
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionListContainer);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
