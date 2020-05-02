const {
    LOGIN_URL,
    REGISTER_URL
} = require("../../utils/constants").URLS;

export default {
    state: {
        token: localStorage.getItem('access-token') || null,
        user: null
    },

    getters: {
        accessToken(state) {
            return state.token;
        }
    },

    mutations: {
        logout: (state) => {
            state.token = null;
            state.user = null;
        },

        setToken(state, token) {
            state.token = token;
        },

        setUser(state) {
            state.user = true;
        }
    },


    actions: {
        LOGIN: ({
            commit
        }, payload) => {

            return fetch(LOGIN_URL, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
                .then(res => res.json())
                .then(res => {

                    if (res.success) {
                        localStorage.setItem('access-token', res.token);
                        commit('setToken', res.token);
                        commit('setUser');
                    }
                    return res.success;
                })
                .catch(err => {
                    console.log(err);
                    alert("A error occured when trying to log in!");
                    return false;
                })
        },

        FETCH_ACCESS_TOKEN({
            commit
        }) {
            commit('setToken', localStorage.getItem('access-token'));
        },

        LOGOUT({
            commit
        }) {
            localStorage.removeItem('access-token');
            commit('logout');
        },

        REGISTER: ({
            commit
        }, payload) => {
            console.log(commit);

            console.log(REGISTER_URL);

            return fetch(REGISTER_URL, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
        }
    }
};