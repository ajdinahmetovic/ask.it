import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {


    token: '',
    user: {},

    userData: {
        publicData: {
            username: 'ajdinahmetovic',
            avatar: '',
        },

        personalData: {
            name: 'Ajdin Ahmetovic',
            email: '',
            password: ''
        },

        questions: [
            {questionId: ''},
            {questionId: ''},
            {questionId: ''},
            {questionId: ''},

        ],

        answeredQuestions: [
            {questionId: ''}
        ]
    },

    questions: [],

    currentQuestionViewing: null,

    tabBarVisibility: true

};

const reducer = (state = initialState, action) => {

    switch(action.type){
        case SET_CURRENT_QUESTION:
            return {...state, currentQuestionViewing: action.question};

        case SET_USER:
            const newState = state;
            newState.user = action.user.user;
            newState.token = action.user.token;
            return {...state, newState};

        case SET_TOKEN:
            return {...state, token: action.token};

        case ADD_QUESTION:
            const {questions} = state;
            questions.push(action.question);
            return {questions};
        case SET_QUESTIONS:
            return {...state, questions: action.questions};

        default: return initialState;

    }

};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
const setCurrentQuestion = (question) => {
    return{
        type: SET_CURRENT_QUESTION,
        question: question
    }
};

const SET_USER = 'SET_USER';
const setUserData = (userInfo) => {
    return{
        type: SET_USER,
        user: userInfo
    }
};

const SET_TOKEN = 'SET_TOKEN';
const setToken = (token) => {
    return{
        type: SET_TOKEN,
        token: token
    }
};

const ADD_QUESTION = 'ADD_QUESTION';
const addQuestion = (question) => {
    return{
        type: ADD_QUESTION,
        question: question
    }
};

const SET_QUESTIONS = 'SET_QUESTIONS';
const setQuestions = (questions) => {
    return{
        type: SET_QUESTIONS,
        questions: questions
    }
};

export {setUserData, setCurrentQuestion, addQuestion, setToken, setQuestions};
