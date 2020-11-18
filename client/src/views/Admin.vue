<template>
    <div id="admin">
        <v-row height="100%" justify="space-around">
            <v-col cols="12" md="4">
                <v-list dark>
                    <v-subheader>
                        <v-row justify="space-between">
                            <v-col cols="12" md="3">QUESTIONS</v-col>
                            <v-col cols="12" md="2">
                                <AddQuestion />
                            </v-col>
                        </v-row>
                    </v-subheader>

                        <v-radio-group v-model="questionCategory" row mandatory class="mx-6">
                            <v-radio label="If" value=0x01></v-radio>
                            <v-radio label="For" value=0x02></v-radio>
                            <v-radio label="While" value=0x03></v-radio>
                            <v-radio label="Advanced" value=0x00></v-radio>
                        </v-radio-group>
                        
                    <v-list-item-group v-model="question" color="primary" :ripple=false>
                        <v-list-item v-for="(item, i) in filteredQuestions" :key="i" :ripple=false>
                            <v-row justify="space-between">
                                <v-col>
                                    {{questionCategoryMapping(item.category)}}
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-chip outlined label small class="justify-center" color="green" text-color="white"
                                        style="font-size: 10px; width: 75px">
                                        {{item.level}}
                                    </v-chip>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-btn small @click="deleteQuestion(item)">
                                        <v-icon small color="red">delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols="12" md="4">
                <v-list dark>
                    <v-subheader>
                        <v-row justify="space-between">
                            <v-col cols="12" md="3">USERS</v-col>
                            <v-col cols="12" md="2">
                                <AddUser :users="users" />
                            </v-col>
                        </v-row>
                    </v-subheader>
                    <v-list-item-group v-model="user" color="primary" :ripple=false>
                        <v-list-item v-for="(item, i) in users" :key="i" :ripple=false>
                            <v-row justify="space-between">
                                <v-col>
                                    {{item.name}}
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-chip outlined label small class="justify-center" color="green" text-color="white"
                                        style="font-size: 10px; width: 75px">
                                        {{item.role}}
                                    </v-chip>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-btn small @click="deleteUser(item)">
                                        <v-icon small color="red">delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AddUser from "../components/users/AddUser";
import AddQuestion from "../components/questions/AddQuestion";

export default {
    name: "Admin",
    components: {
        AddUser,
        AddQuestion
    },
    data: () => ({
        user: 1,
        question: 1,
        questionCategory: 0x01
    }),
    computed: {

        users: function () {
            return this.$store.getters.users;
        },
        questions: function () {
            return this.$store.getters.questions;
        },
        filteredQuestions: function () {
            return this.questions.filter((question) => question.category == this.questionCategory);
        }
    },
    methods: {
        questionCategoryMapping: function(category) {
            const mapping = {
                0x00: "Advanced",
                0x01: "If",
                0x02: "For",
                0x03: "While"
            }

            return mapping[category];
        },
        async deleteUser(user) {
            try {

                const deleted = await this.$store.dispatch('deleteUser', user._id);

                if (!deleted) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }
        },
        async deleteQuestion(question) {
            try {

                const deleted = await this.$store.dispatch('deleteQuestion', question._id);

                if (!deleted) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
    created() {
        this.$store.dispatch('getUsersFromDB');
        this.$store.dispatch('getQuestionsFromDB');
    },
};
</script>
