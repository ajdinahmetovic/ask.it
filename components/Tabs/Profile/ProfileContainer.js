import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Profile from "./Profile";
import QuestionDetails from "../../QuestionDetails";
import EditProfile from "./EditProfile";
import LoadingComponent from "../../Loading/LoadingComponent";
import { InteractionManager, ActivityIndicator} from 'react-native';
import {clearQuestions, setCurrentQuestion, setQuestions, setStats} from "../../../redux/app-redux";
import {connect} from "react-redux";

const Routes = createStackNavigator ({

    Profile: {
        screen: Profile
    },

    QuestionDetails: {
        screen: QuestionDetails
    },

    EditProfile: {
        screen: EditProfile
    }


});

const mapStateToProps = (state) => {
    return {
        user: state.user,
        questions: state.questions,
        token: state.token

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setQuestions: (questions) => {dispatch(setQuestions(questions))},
        setCurrentQuestion: (question) => {dispatch(setCurrentQuestion(question))},
        clearQuestions: () => {dispatch(clearQuestions())},
        setStats: (stats) => {dispatch(setStats(stats))},

    };
};

let Navigation = createAppContainer(Routes);

class ProfileContainer extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            isReady: false
        };
    }


    componentDidMount() {

        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
            this.props.clearQuestions();
            this.fetchStats();
            this.fetchQuestions(1);

        });

    }


    render() {

        if(!this.state.isReady){
            return <LoadingComponent />
        }
        return (
            <Navigation/>
        );
    }

    async fetchStats (){
        this.setState({isReady: false});
        try {
            let response = await fetch('https://shielded-reef-97480.herokuapp.com/user/stats/' + this.props.user._id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            let responseCode = response.status;
            response = await response.json();

            if(responseCode === 201){
                //this.setState({stats: response})
                this.props.setStats(response);
            } else {
                throw response.message
            }

        } catch (e) {
            this.setState({isReady: true})
            Alert.alert(
                'Error', 'Failed to fetch your stats :(',
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )
        }

    }

    async fetchQuestions (count){
        try {
            let response = await fetch('https://shielded-reef-97480.herokuapp.com/question/my?userId=' + this.props.user._id + '&count=' + count, {
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
                this.setState({isReady: true})
            } else {
                throw response.message
            }
        } catch (e) {
            this.setState({isReady: true})
            Alert.alert(
                'Error', 'Failed to fetch your questions :(',
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )
        }
    }



}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
