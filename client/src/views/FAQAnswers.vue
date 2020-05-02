<template>
  <v-container class="faq my-5">
    <h1>Frequently Asked Questions</h1>

    <v-container fluid>
      <v-row class="justify-end">
        <FAQform />
      </v-row>
    </v-container>

    <v-expansion-panels focusable v-model="currentQuestion">
      <v-expansion-panel v-for="faq in unansweredFaqs" :key="faq.id">
        <v-expansion-panel-header>{{ faq.question }}</v-expansion-panel-header>
        <v-expansion-panel-content height="200px">
          <v-textarea
            class="mx-2"
            v-model="answer"
            label="Ask your question"
            rows="1"
            prepend-icon="comment"
            auto-grow
          ></v-textarea>
          <v-row class="justify-end mx-0">
            <v-btn
              small
              color="info"
              style="margin-right: 20px"
              @click="reply"
              :loading="loadingReplyButton"
            >
              <v-icon>fa-reply</v-icon>
            </v-btn>
            <v-btn
              small
              icon
              color="error"
              @click="deleteQuestion"
              :loading="loadingDeleteButton"
            >
              <v-icon>fa-trash</v-icon>
            </v-btn>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import FAQform from "@/components/FAQform";

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
            loadingDeleteButton: false
        };
    },

    created() {
        this.$store.dispatch('getFaqsFromDB')
    },

    methods: {
        async reply() {
            this.loadingReplyButton = true;

            const currentQuestion = this.unansweredFaqs[this.currentQuestion];
            const questionId = currentQuestion._id;
            let data = {
                question: currentQuestion.question,
                answer: this.answer,
                answeredBy: "Radu Bagrin" //TODO: ADD the user here
            };
            this.answer = "";

            this.currentQuestion = null;

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

        async deleteQuestion() {
            this.loadingDeleteButton = true;
            let questionId = this.unansweredFaqs[this.currentQuestion]._id;

            try {

                const deleted = await this.$store.dispatch('deleteFaq', questionId);

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
