const {
    QUESTIONS_URL
} = require("../../utils/constants").URLS;

export default {
    state: {
        questions: [],
    },

    getters: {
        questions(state) {
            return state.questions;
        }
    },

    mutations: {
        updateQuestions: (state, questions) => (state.questions = questions),
    },

    actions: {
        getQuestionsFromDB({
            commit
        }) {

            return fetch(QUESTIONS_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access-token')
                },
                mode: "cors"
            })
            .then(res => res.json())
            .then(res => {

                if (res.success) {

                    commit("updateQuestions", res.questions);
                    return res.questions;
                }
                return [];
            })
            .catch(err => {
                console.log(err);
                return [];
            });
        },

        addQuestion({
            dispatch
        }, question) {

            return fetch(QUESTIONS_URL, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                },
                body: JSON.stringify(question)
            })
            .then(res => res.json())
            .then(res => {

                setTimeout(function(){ dispatch("getQuestionsFromDB"); }, 300);
                
                return res.success;
            })
            .catch(err => {

                console.log(err);
                return false;
            });
        },

        updateQuestion({
            dispatch
        }, payload) {

            return fetch(QUESTIONS_URL + payload.questionId, {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                },
                body: JSON.stringify(payload.data)
            })
            .then(res => res.json())
            .then((res) => {
                dispatch("getQuestionFromDB");
                return res.success;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        },

        deleteQuestion({
            dispatch
        }, questionId) {

            return fetch(QUESTIONS_URL + questionId, {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                }
            })
            .then((res) => {

                dispatch("getQuestionsFromDB");
                return res.status === 204;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        }
    }
};