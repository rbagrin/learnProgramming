<template>
    <v-container class="faq my-5">
        <h1 style="color: #fff">Întrebări frecvente - Support</h1>


        <v-card dark color="#00695C" class="mx-0 px-2">
            <v-row v-if="true" class="justify-start mx-0">
                <!-- <v-select
                v-model="questionSelect"
                :items="questions"
                label="Display questions"
                required
            ></v-select> -->

                <v-radio-group v-model="questionSelect" row>
                    <v-radio class="mx-6" label="Toate " value="All questions"></v-radio>
                    <v-radio class="mx-6" label="Fără răspuns" value="Unanswered questions"></v-radio>
                    <v-radio class="mx-6" label="Importante" value="Important questions"></v-radio>
                </v-radio-group>

                <v-spacer></v-spacer>

                <FAQform class="py-3 mx-6" />
            </v-row>
        </v-card>


        <v-expansion-panels focusable v-model="currentQuestion" dark>
            <v-expansion-panel v-for="faq in questionSelectArray" :key="faq.id">
                <v-expansion-panel-header>{{ faq.question }}</v-expansion-panel-header>
                <v-expansion-panel-content height="200px">
                    <v-textarea class="mx-2" v-model="answer" label="Răspunde întrebării" rows="1"
                        prepend-icon="comment" auto-grow></v-textarea>
                    <v-row class="mx-0" justify="space-between">
                        <v-col cols=12 md="3" align="end" justify="end">
                            <v-checkbox v-model="important" label="Adaugă în importante" color="#4DB6AC" hide-details>
                            </v-checkbox>
                        </v-col>
                        <v-col cols=12 md="2" align="end">
                            <v-btn small color="info" style="margin-right: 20px" @click="reply(faq)"
                                :loading="loadingReplyButton">
                                <v-icon>fa-reply</v-icon>
                            </v-btn>
                            <v-btn small icon color="error" @click="deleteQuestion(faq)" :loading="loadingDeleteButton">
                                <v-icon>fa-trash</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import FAQform from "@/components/faqs/FAQform";

export default {
    name: "FAQAnswers",

    components: {
        FAQform
    },

    data() {
        return {
            answer: "",
            currentQuestion: null,
            loadingReplyButton: false,
            loadingDeleteButton: false,
            important: false,
            questionSelect: "All questions",
            questions: [
                "All questions",
                "Unanswered questions",
                "Important questions"
            ],
        };
    },

    created() {
        this.$store.dispatch('getFaqsFromDB')
    },

    methods: {
        async reply(faq) {
            this.loadingReplyButton = true;

            const questionId = faq._id;
            let data = {
                question: faq.question,
                answer: this.answer,
                answeredBy: this.getUserName,
                postedBy: this.postedBy,
                send_response_to: faq.postedByEmail,
                important: this.important
            };
            this.answer = "";

            try {

                const updated = await this.$store.dispatch('updateFaq', {
                    questionId,
                    data
                });
                console.log("Updated = ", updated)
                if (!updated) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }

            this.loadingReplyButton = false;
        },

        async deleteQuestion(faq) {

            this.loadingDeleteButton = true;

            try {

                const deleted = await this.$store.dispatch('deleteFaq', faq._id);

                if (!deleted) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }

            this.loadingDeleteButton = false;
        }
    },

    computed: {
        allFaqs: function () {
            return this.$store.getters.faqs;
        },
        unansweredFaqs: function () {
            return this.$store.getters.faqs.filter(
                faq => !faq.answer && !faq.answeredBy
            );
        },
        importantFaqs: function () {
            return this.$store.getters.faqs.filter(
                faq => faq.important
            );
        },
        questionSelectArray() {

            if (this.questionSelect === "Unanswered questions") {
                return this.unansweredFaqs;
            }

            if (this.questionSelect === "Important questions") {
                return this.importantFaqs;
            }

            return this.allFaqs;
        },
        getUserName() {
            return this.$store.getters.user_name;
        },
        getUserEmail() {
            return this.$store.getters.user_email;
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
