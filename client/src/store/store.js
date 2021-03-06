import Vue from "vue";
import Vuex from "vuex";

import FaqsModule from './modules/faqs';
import QuestionsModule from './modules/questions';
import User from './modules/user';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        user: User,
        faqs: FaqsModule,
        questions: QuestionsModule
    }
});