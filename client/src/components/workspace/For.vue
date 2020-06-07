<template v-slot:activator="{ on }">
    <v-container fill-height grid-list-md text-xs-center class="container">
        <v-row justify="space-around" align="center" style="margin: 0; padding: 0">
            <v-col cols="12" md="4" xs="12">
                <img src="@/assets/ionel-1.png" width="320px" height="550px">
            </v-col>
            <v-dialog v-model="snackbar_true" max-width="600">
                <v-card>
                    <v-card-title class="headline" style="text-size: 45px">Răspuns Corect!</v-card-title>
                    <v-card-text>
                        <div>
                            <p style="text-size: 35px">Tocmai ai deblocat ceasul de mână!</p>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green" text @click="snackbar_true = false">Următoarea întrebare</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="snackbar_false" max-width="600">
                <v-card>
                    <v-card-title class="headline" style="text-size: 45px">Răspuns Incorect!</v-card-title>
                    <v-card-text>
                        <div>
                            <p style="text-size: 35px">Mai încearcă!</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-col cols="12" md="7" xs="12">
                <v-row>
                    <v-card color="#004D40" width=100% height="350px" align="center" outlined>

                        <v-card-text style="font-size: 25px; height: 290px; padding-rig: 10px; padding-top: 15px">
                            <div class="instructions">
                                <span class="statement">Cât timp</span>
                            </div>
                            <div class="flexbox question" style="background-color: red; margin:0; padding: 0">
                                <Board id="question">

                                </Board>
                            </div>
                            <br><br>
                            <div class="instructions">
                                <span class="statement">execută</span>
                            </div>
                            <div class="instructions">
                                <span class="instruction">merg_să_mănânc<span style="color: #0F0">()</span></span>
                            </div>
                            <div class="instructions">
                                <span class="statement">altfel</span>
                            </div>
                            <div class="instructions">
                                <span class="instruction">merg_la_joacă<span style="color: #0F0">()</span></span>
                            </div>
                        </v-card-text>

                        <v-card-actions align='center' style="margin-right: 10px">
                            <v-spacer></v-spacer>
                            <v-btn color="#6f6" @click="check_answer()">
                                <v-icon left>check_circle</v-icon>
                                <span style="font-weight: bold; font-size: 20px">VERIFICĂ</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-row>
                <br>
                <v-row id="options" justify="space-between">
                    <v-col id="option1box" class="flexbox options">
                        <Board id="option1">
                            <Card id="card-a" draggable="true">
                                <p>îmi e foame</p>
                            </Card>
                        </Board>
                    </v-col>
                    <v-col id="option2box" class="flexbox options">
                        <Board id="option2">
                            <Card id="card-b" draggable="true">
                                <p>îmi e sete</p>
                            </Card>
                        </Board>
                    </v-col>

                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Board from "@/components/Board";
import Card from "@/components/Card";

export default {
    data() {
        return {
            dialog: false,
            snackbar: false,
            snackbarErr: false,
            loading: false,
            snackbar_true: false,
            snackbar_false: false
        };
    },
    methods: {
        check_answer() {

            if (this.isDescendant(document.getElementById("question"), document.getElementById("card-a"))) {
                this.snackbar_true = true;
            } else {
                this.snackbar_false = true;
            }

        },
        isDescendant(parent, child) {
            var node = child.parentNode;
            while (node != null) {
                if (node == parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }
    },
    components: {
        Board,
        Card
    }
};
</script>

<style scoped>
.container {
    height: 100%;
    font-family: 'Modak', cursive;
}

#options {
    background-color: #000;
    height: 90px;
}

.flexbox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 250px;
    height: 5vh;
    margin: 0 auto;
    padding: 15px;
}

.flexbox .board {
    display: block;
    width: 300px;
    max-width: 300px;

    max-height: 60px;
    background-color: #313131;
    padding: 5px;
}

.flexbox .board .card {
    padding: 5px 15px;
    background-color: #f3f3f3;
    cursor: pointer;
    margin-bottom: 15px;
    max-height: 50px;
}

p {
    text-align: center;
    font-weight: bold;
    color: black;
    font-size: 20px;
    padding: 5px;

}

.hovered {
    border: 2px solid red;
}

.statement {
    font-size: 35px;
    font-weight: 700;
    color: #f33;
}

.instruction {
    font-size: 30px;
    font-weight: 700;
    color: #f4f4f4;
}

.instructions {
    padding-bottom: 17px;
    margin-bottom: 5px;
}

</style>