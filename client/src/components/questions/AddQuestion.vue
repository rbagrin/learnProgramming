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
                    Add Question
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-select v-model="category" :items="categories" :rules="[v => !!v || 'Categoria este obligatorie.']" label="Categorie"
                            required></v-select>
                        <v-text-field v-model="option1" :counter="true" :rules="optionRules" label="Opțiunea 1" required></v-text-field>
                        <v-text-field v-model="option2" :counter="true" :rules="optionRules" label="Opțiunea 2" required></v-text-field>

                        <v-radio-group v-model="correctAnswer" label="Răspuns corect:" row mandatory>
                            <v-radio class="mx-6" label="Opțiunea 1" value="option1"></v-radio>
                            <v-radio class="mx-6" label="Opțiunea 2" value="option2"></v-radio>
                        </v-radio-group>

                        <v-text-field v-model="mainBranch" :counter="true" :rules="mainBranchRules" label="Ramură principală" required></v-text-field>
                        <v-text-field v-model="optionalBranch" :counter="true" :rules="optionalBranchRules" label="Ramură opțională"></v-text-field>
                        

                        
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" color="primary" text @click="addQuestion">
                        Adaugă întrebare
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
                v => !!v || 'Optiunile sunt obligatoriu de completat',
                v => (v && v.length >= 3) || 'Optiunile trebuie sa aiba minim 3 caractere.',
                v => (v && v.length <= 15) || 'Optiunile trebuie sa aiba maxim 15 caractere.',
            ],
            mainBranchRules: [
                v => (v && v.length >= 3) || 'Ramura principală trebuie să aibă minim 3 caractere.',
                v => (v && v.length <= 15) || 'Ramura principală trebuie să aibă maxim 15 caractere.',
            ],
            optionalBranchRules: [
                v => ((v && v.length >= 3) || !v) || 'Ramura opțională trebuie să aibă minim 3 caractere.',
                v => ((v && v.length <= 15) || !v) || 'Ramura opțională trebuie să aibă maxim 15 caractere.',
            ],
            categories: [
                'Dacă',
                'Pentru',
                'Cât timp',
                'Avansat'
            ],
            categoriesStringToIntMapping: {
                'Avansat': 0x00,
                'Dacă': 0x01,
                'Pentru': 0x02,
                'Cât timp': 0x03
            },
            dialog: false
        }
    },
    methods: {
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
        validate() {
            this.$refs.form.validate()
        }
    },
    computed: {}
}
</script>
