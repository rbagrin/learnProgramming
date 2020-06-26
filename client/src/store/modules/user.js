const {
    LOGIN_URL,
    REGISTER_URL,
    USERS_URL
} = require("../../utils/constants").URLS;

export default {
    state: {
        token: localStorage.getItem('access-token') || null,
        user: null,
        user_id: localStorage.getItem('user_id') || null,
        user_name: localStorage.getItem('user_name') || null,
        user_email: localStorage.getItem('user_email') || null,
        user_role: localStorage.getItem('user_role') || null,
        if_award: localStorage.getItem('if-award') || null,
        for_award: localStorage.getItem('for-award') || null,
        while_award: localStorage.getItem('while-award') || null,
        advanced_award: localStorage.getItem('advanced-award') || null,
        users: null
    },

    getters: {
        accessToken(state) {
            return state.token;
        },
        users(state) {
            return state.users;
        },
        user_id(state) {
            return state.user_id;
        },
        user_name(state) {
            return state.user_name;
        },
        user_email(state) {
            return state.user_email;
        },
        user_role(state) {
            return state.user_role;
        },
        user(state) {
            return state.user;
        },
        if_award(state) {
            return state.if_award;
        },
        for_award(state) {
            return state.for_award;
        },
        while_award(state) {
            return state.while_award;
        },
        advanced_award(state) {
            return state.advanced_award;
        }
    },

    mutations: {
        logout: (state) => {
            state.token = null;
            state.user = null;
        },

        setToken(state, token) {
            state.token = token;
            localStorage.setItem('access-token', token);
        },

        setUserId(state, id) {
            state.user_id = id;
            localStorage.setItem("user_id", id);
        },

        setUserName(state, name) {
            state.user_role = name;
            localStorage.setItem("user_name", name);
        },

        setUserEmail(state, email) {
            state.user_email = email;
            localStorage.setItem("user_email", email);
        },

        setUserRole(state, role) {
            state.user_role = role;
            localStorage.setItem("user_role", role);
        },

        setUser(state, user) {
            state.user = user;
            localStorage.setItem("user", user);
        },
        setIfAward(state, award) {
            const awardState = String(award) === "true";
            state.if_award = awardState;
            localStorage.setItem('if-award', awardState);
        },
        setForAward(state, award) {
            const awardState = String(award) === "true";
            state.for_award = awardState;
            localStorage.setItem('for-award', awardState);
        },
        setWhileAward(state, award) {
            const awardState = String(award) === "true";
            state.while_award = awardState;
            localStorage.setItem('while-award', awardState);
        },
        setAdvancedAward(state, award) {
            const awardState = String(award) === "true";
            state.advanced_award = awardState;
            localStorage.setItem('advanced-award', awardState);
        },
        updateUsers: (state, users) => (state.users = users),
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

                    commit('setToken', res.token);
                    commit('setUser', res.user);
                    commit('setUserId', res.user.id);
                    commit('setUserName', res.user.name);
                    commit('setUserEmail', res.user.email);
                    commit('setUserRole', res.user.user_role);
                    commit('setIfAward', false); // TODO: Get these from backend
                    commit('setForAward', false);
                    commit('setWhileAward', false);
                    commit('setAdvancedAward', false);
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
            commit('setUser', localStorage.getItem('user'));
            commit('setUserId', localStorage.getItem('user_id'));
            commit('setUserName', localStorage.getItem('user_name'));
            commit('setUserEmail', localStorage.getItem('user_email'));
            commit('setUserRole', localStorage.getItem('user_role'));
            commit('setIfAward', localStorage.getItem('if-award'));
            commit('setForAward', localStorage.getItem('for-award'));
            commit('setWhileAward', localStorage.getItem('while-award'));
            commit('setAdvancedAward', localStorage.getItem('advanced-award'));
        },

        LOGOUT({
            commit
        }) {
            localStorage.removeItem('access-token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_role');
            localStorage.removeItem('if-award');
            localStorage.removeItem('for-award');
            localStorage.removeItem('while-award');
            localStorage.removeItem('advanced-award');
            localStorage.removeItem('user');
            commit('setUser', null);
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
        },

        ENABLE_IF_AWARD({
            commit
        }) {
            commit('setIfAward', true);
            return fetch(USERS_URL + localStorage.getItem('user_id') + "/awards", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                },
                body: JSON.stringify({
                    awards: {
                        watch: true,
                        glasses: localStorage.getItem('for-award') === "true",
                        hat: localStorage.getItem('while-award') === "true",
                        tshirt: localStorage.getItem('advanced-award') === "true"
                    }
                })
            })
            .then(res => res.json())
            .then(res => {

                return res.success;
            })
            .catch(err => {

                console.log(err);
                return false;
            })
        },
        ENABLE_FOR_AWARD({
            commit
        }) {
            commit('setForAward', true);
            return fetch(USERS_URL + localStorage.getItem('user_id') + "/awards", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                },
                body: JSON.stringify({
                    awards: {
                        watch: localStorage.getItem('if-award') === "true",
                        glasses: true,
                        hat: localStorage.getItem('while-award') === "true",
                        tshirt: localStorage.getItem('advanced-award') === "true"
                    }
                })
            })
            .then(res => res.json())
            .then(res => {

                return res.success;
            })
            .catch(err => {

                console.log(err);
                return false;
            })
        },
        ENABLE_WHILE_AWARD({
            commit
        }) {
            commit('setWhileAward', true);
            return fetch(USERS_URL + localStorage.getItem('user_id') + "/awards", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                },
                body: JSON.stringify({
                    awards: {
                        watch: localStorage.getItem('if-award') === "true",
                        glasses: localStorage.getItem('for-award') === "true",
                        hat: true,
                        tshirt: localStorage.getItem('advanced-award') === "true"
                    }
                })
            })
            .then(res => res.json())
            .then(res => {

                return res.success;
            })
            .catch(err => {

                console.log(err);
                return false;
            })
        },
        ENABLE_ADVANCED_AWARD({
            commit
        }) {
            commit('setAdvancedAward', true);
            return fetch(USERS_URL + localStorage.getItem('user_id') + "/awards", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                },
                body: JSON.stringify({
                    awards: {
                        watch: localStorage.getItem('if-award') === "true",
                        glasses: localStorage.getItem('for-award') === "true",
                        hat: localStorage.getItem('while-award') === "true",
                        tshirt: true
                    }
                })
            })
            .then(res => res.json())
            .then(res => {

                return res.success;
            })
            .catch(err => {

                console.log(err);
                return false;
            })

        },

        getUsersFromDB({
            commit
        }) {

            return fetch(USERS_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access-token')
                },
                mode: "cors"
            })
            .then(res => res.json())
            .then(res => {

                if (res.success) {

                    commit("updateUsers", res.users);
                    return res.users;
                }
                return [];
            })
            .catch(err => {
                console.log(err);
                return [];
            });
        },

        addUser({
            dispatch
        }, user) {

            return fetch(USERS_URL, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(res => {

                dispatch("getUsersFromDB");
                return res.success;
            })
            .catch(err => {

                console.log(err);
                return false;
            })
        },

        updateUser({
            dispatch
        }, payload) {

            return fetch("http://localhost:5000/users/" + payload.userId, {
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
                dispatch("getUsersFromDB");
                return res.success;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        },

        deleteUser({
            dispatch
        }, userId) {

            return fetch(USERS_URL + userId, {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('access-token')
                }
            })
            .then((res) => {

                dispatch("getUsersFromDB");
                return res.status === 204;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        }
    }
};