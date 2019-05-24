import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {

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

    questions: [
        {
            id: 0,
            author: 'Ajdin',
            question: 'What is 2 + 2 ?',
            answers: {
                answerIds: ['', '', '', '']
            },
            rating: {
                likes: {
                    userIds: ['', '', '']
                },
                dislikes: {
                    userIds: ['', '', '']
                }
            },
            date: '14.08.2019'
        },

        {
            id: 1,
            author: 'Pearson 1',
            question: 'What am I seeing, hearing, feeling, smelling & tasting ?',
            answers: {
                answerIds: ['', '']
            },
            rating: {
                likes: {
                    userIds: ['']
                },
                dislikes: {
                    userIds: ['']
                }
            },
            date: '14.08.2019'
        },

        {
            id: 2,
            author: 'Pearson 2',
            question: 'What is the smallest planet in our solar system ?',
            answers: {
                answerIds: ['', '']
            },
            rating: {
                likes: {
                    userIds: ['']
                },
                dislikes: {
                    userIds: ['']
                }
            },
            date: '14.08.2019'
        },

        {
            id: 3,
            author: 'Albin',
            question: 'What are the dimensions in inches of the first footprint on Earth’s moon ?',
            answers: {
                answerIds: ['', '']
            },
            rating: {
                likes: {
                    userIds: ['']
                },
                dislikes: {
                    userIds: ['']
                }
            },
            date: '14.08.2019'
        }
    ],

    answers: [
        {
            user: {
                id: '0',
                publicData: {
                    username: 'ajdinahmetovic',
                    avatar: '',
                },
            },
            answer: 'It is 4',
            rating: {
                likes: {
                    userIds: ['']
                },
                dislikes: {
                    userIds: ['']
                }
            },
            date: ''
        }
    ],

    currentQuestionViewing: null

};

const reducer = (state = initialState, action) => {

    switch(action.type){
        case SET_CURRENT_QUESTION:
            return {...state, currentQuestionViewing: action.question};

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

export {setCurrentQuestion}

const testSomething = (val) => {
    return{
        type: 'test',
        val: val
    }
};
export {testSomething}
