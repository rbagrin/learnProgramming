<template>
    <div class="text-center">
        <v-dialog v-model="gdprForm" width="800">
            <template v-slot:activator="{ on }">
                <v-btn class="light-green darken-2 white--text m3" large v-on="on">
                    <v-icon left>email</v-icon>
                    <span>Înregistrare</span>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Formular GDPR
                </v-card-title>

                <v-card-text>
                    <p>Conținut:
                        <ul>
                            <li>Cine suntem?</li>
                            <li>În ce scopuri dorim să utilizăm datele dumneavoastră?</li>
                            <li>Ce vom face cu datele dumneavoastră?</li>
                        </ul>
                    </p>
                    <h2>Cine suntem?</h2>
                    <p>Denumirea societații care vă solicită consimțâmantul pentru utilizarea datelor dumneavoastră, în scopurile specificate în acest formular, este: <b>Let'sProgram</b></p>
                    <h2>Dorim să utilizăm următoarele date cu caracter personal:</h2>
                    <ul>
                            <li>Nume, Prenume</li>
                            <li>Email</li>
                        </ul>
                    <h2>În ce scopuri dorim să utilizăm datele dumneavoastră?</h2>
                    <p>Datele dumneavoastră vor fi folosite exclusiv în scopul creării și gestionării contului.</p>

                    <h2>Ce vom face cu datele dumneavoastră?</h2>
                    <p>Let'sProgram poate furniza datele dumneavoastră cu caracter personal altor companii afiliate sau cu care se află în relații de parteneriat, dar numai în scopurile specificate aici.</p>
                    <p>Datele dumneavoastră ar mai putea fi transmise organelor de poliție, parchet, instanțe judecătorești sau altor instituții care exercită autoritatea de stat, în măsura în care au atribuții legale în sensul primirii unor astfel de date și în strictă concordanță cu prevederile legale aplicabile.</p>
                    <p>Datele dumneavoastră nu vor face obiectul unui proces decizional individual automatizat care să producă efecte juridice asupra dumneavoastră.</p>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :loading="loading" text @click="submit">
                        Accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: ['name', 'email', 'password', 'password2'],
    data() {
        return {
            gdprForm: false,
            loading: false
        }
    },
    methods: {
        submit() {

            this.loading = true;
            // TODO: encrypt password
            this.$store.dispatch("REGISTER", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password2: this.password2
                })
            .then(res => res.json())
            .then(res => {

                this.loading = false;
                this.gdprForm = false;

                if (res.success) {
                    // TODO: Add snackbar
                    this.$router.push("/login");
                } else {
                    alert(res.message);
                }
            })
            .catch(err => {
                this.loading = false;
                this.gdprForm = false;
                console.log(err);
            });
        }
    },
}
</script>
