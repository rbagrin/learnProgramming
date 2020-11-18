<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn small v-on="on">
                    <v-icon small color="green" style="font-weight: bold; font-size: 24px">add</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Add Quiz Question
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-select v-model="category" :items="categories" :rules="[v => !!v || 'Category is mandatory.']" label="Category"
                            required></v-select>
                        <v-text-field v-model="option1" :counter="true" :rules="optionRules" label="Option 1" required></v-text-field>
                        <v-text-field v-model="option2" :counter="true" :rules="optionRules" label="Option 2" required></v-text-field>

                        <v-radio-group v-model="correctAnswer" label="Correct answer:" row mandatory>
                            <v-radio class="mx-6" label="Option 1" value="option1"></v-radio>
                            <v-radio class="mx-6" label="Option 2" value="option2"></v-radio>
                        </v-radio-group>

                        <v-text-field v-model="mainBranch" :counter="true" :rules="mainBranchRules" label="Main branch" required></v-text-field>
                        <v-text-field v-model="optionalBranch" :counter="true" :rules="optionalBranchRules" label="Optional branch"></v-text-field>
                        

                        
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" color="primary" text @click="addQuestion">
                        Add Question
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            option1: "",
            option2: "",
            correctAnswer: "option1",
            mainBranch: "",
            optionalBranch: null,
            category: null,
            valid: true,
            optionRules: [
                v => !!v || 'Options are mandatory',
                v => (v && v.length >= 3) || 'Options must have minimum 3 characters.',
                v => (v && v.length <= 15) || 'Options must have maximum 15 characters.',
            ],
            mainBranchRules: [
                v => (v && v.length >= 3) || 'Main branch must have minimum 3 characters.',
                v => (v && v.length <= 15) || 'Main branch must have maximum 15 characters.',
            ],
            optionalBranchRules: [
                v => ((v && v.length >= 3) || !v) || 'Optional branch must have minimum 3 characters.',
                v => ((v && v.length <= 15) || !v) || 'Optional branch must have maximum 15 characters.',
            ],
            categories: [
                'If',
                'For',
                'While',
                'Advanced'
            ],
            categoriesStringToIntMapping: {
                'Advanced': 0x00,
                'If': 0x01,
                'For': 0x02,
                'While': 0x03
            },
            dialog: false
        }
    },
    methods: {
        /**
         * Add Quiz question
         */
        async addQuestion() {
            this.loading = true;

            const question = {
                category: this.categoriesStringToIntMapping[this.category],
                option1: this.option1,
                option2: this.option2,
                correctAnswer: this.correctAnswer === "option1" ? 1 : 2,
                mainBranch: this.mainBranch,
                optionalBranch: this.optionalBranch ? this.optionalBranch : null
            };

            try {

                const added = await this.$store.dispatch('addQuestion', question);
                if (!added) {
                    alert("Something wrong happened!");
                }
                this.$refs.form.reset();

            } catch (err) {
                console.log(err);
            }

            this.loading = false;
            this.dialog = false;
        },
        /**
         * Validates form
         */
        validate() {
            this.$refs.form.validate()
        }
    },
    computed: {}
}
</script>
