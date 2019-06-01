import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {


    token: '',
    user: {},
    topUsers: null,



    questions: [],
    currentQuestionViewing: null,
    answers: [],
    stats: {
        myQuestionsLen: 0,
        answeredQuestionsLen: 0,
    }

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
            return {...state, questions: [action.question, ...state.questions]};
        case SET_QUESTIONS:
            return {...state, questions: state.questions.concat(action.questions)};
        case SET_ANSWERS:
            return {...state, answers: action.answers};
        case ADD_ANSWER:
            return {...state, answers: [action.answer, ...state.answers]};
        case CLEAR_QUESTIONS:
            return {...state, questions: []};
        case SET_TOP_USERS:
            return {...state, topUsers: action.users};
        case SET_STATS:
            return {...state, stats: action.stats};
        case SET_RATING:
             //return state.questions.map(question => ((question._id !== action.rating.obj._id) ? action.rating.obj : question));
            // console.log(action.rating.obj)
            return { ...state, questions: state.questions.map((question) => {
                if(question._id === action.rating.questionId){
                    //console.log(action.rating.obj);
                    question.rating = action.rating.obj;
                    return question
                    //return action.rating.obj;
                }
                return question
            })};
        case SET_ANSWER_RATING:
            //return state.questions.map(question => ((question._id !== action.rating.obj._id) ? action.rating.obj : question));
            // console.log(action.rating.obj)
            return { ...state, answers: state.answers.map((answer) => {
                    if(answer._id === action.rating.answerId){
                        //console.log(action.rating.obj);
                        answer.rating = action.rating.obj;
                        return answer
                        //return action.rating.obj;
                    }
                    return answer
                })};

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

const SET_STATS = 'SET_STATS';
const setStats = (stats) => {
    return{
        type: SET_STATS,
        stats: stats
    }
};


const SET_ANSWERS = 'SET_ANSWERS';
const setAnswers = (answers) => {
    return{
        type: SET_ANSWERS,
        answers: answers
    }
};

const SET_RATING= 'SET_RATING';
const setRating = (rating) => {
    return{
        type: SET_RATING,
        rating: rating
    }
};

const SET_ANSWER_RATING= 'SET_ANSWER_RATING';
const setAnswerRating = (rating) => {
    return{
        type: SET_ANSWER_RATING,
        rating: rating
    }
};

const ADD_ANSWER= 'ADD_ANSWER';
const addAnswer = (answer) => {
    return{
        type: ADD_ANSWER,
        answer: answer
    }
};

const CLEAR_QUESTIONS   = 'CLEAR_QUESTIONS';
const clearQuestions = () => {
    return{
        type: CLEAR_QUESTIONS,
    }
};

const SET_TOP_USERS   = 'SET_TOP_USERS';
const setTopUsers = (users) => {
    return{
        type: SET_TOP_USERS,
        users: users
    }
};

export {
    setUserData,
    setCurrentQuestion,
    addQuestion,
    setToken,
    setQuestions,
    setAnswers,
    setRating,
    setAnswerRating,
    addAnswer,
    clearQuestions,
    setTopUsers,
    setStats
};
