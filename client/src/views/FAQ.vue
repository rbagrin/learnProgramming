<template>
    <v-container class="faq my-5">
        <h1 style="color: #fff">Frequently Asked Questions</h1>

        <v-container fluid>
            <v-row class="justify-space-between">
                <v-row v-if="true" class="justify-start mx-0">
                    <v-btn color="#4DB6AC" :hidden="isUser" router to="/faq/answers">
                        <v-icon left>question_answer</v-icon>
                        <span>All Questions</span>
                    </v-btn>
                </v-row>
                <v-spacer></v-spacer>
                <v-row class="justify-end mx-0">
                    <FAQform />
                </v-row>
            </v-row>
        </v-container>

        <v-expansion-panels focusable dark>
            <v-expansion-panel v-for="faq in importantFaqs" :key="faq.id">
                <v-expansion-panel-header>
                    <v-row class="justify-space-between mx-5 my-0 pa-0">
                        {{ faq.question }}
                    </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="grey--text">{{ faq.date }}</div>
                    <div>{{ faq.answer }}</div>
                    <div class="grey--text" flat>answered by {{ faq.answeredBy }}</div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import FAQform from "../components/faqs/FAQform";

export default {
    name: "FAQ",

    components: {
        FAQform
    },

    data() {
        return {
        };
    },
    created() {
        this.$store.dispatch('getFaqsFromDB')
    },

    methods: {},

    computed: {
        allFaqs: function () {

            return this.$store.faqs.getters.faqs;
        },
        answeredFaqs: function () {

            return this.$store.getters.faqs.filter(
                faq => faq.answer && faq.answeredBy
            );
        },
        importantFaqs: function () {

            return this.$store.getters.faqs.filter(
                faq => faq.answer && faq.answeredBy && faq.important
            );
        },
        isUser: function () {
            return this.$store.getters.user_role === "user";
        }
    }
};
</script>

<style scoped>
@media only screen and (max-width: 960px) {
    .faq {
        margin: 0;
        padding: 0;
    }
}
</style>
