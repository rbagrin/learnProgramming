<template v-slot:activator="{ on }">
    <v-container fill-height grid-list-md text-xs-center class="container">
        <v-row justify="space-around" align="center" style="margin: 0; padding: 0">
            <v-col cols="12" md="4" xs="12">
                <img src="@/assets/ionel-1.png" width="320px" height="550px">
            </v-col>
            <v-dialog v-model="snackbar_award" max-width="600">
                <v-card>
                    <v-card-title class="headline" style="text-size: 45px">Răspuns Corect!</v-card-title>
                    <v-card-text>
                        <div>
                            <p style="text-size: 35px">Tocmai ai deblocat ceasul de mână!</p>
                            <img src="@/assets/watch.jpg" width="500px" height="250px">
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green" text @click="nextQuestion()">Următoarea întrebare</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="snackbar_true" max-width="600">
                <v-card>
                    <v-card-title class="headline" style="text-size: 45px">Răspuns Corect!</v-card-title>
                    <v-card-text>
                        <div>
                            <p style="text-size: 35px">AAAAAAAAA</p>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green" text @click="nextQuestion()">Următoarea întrebare</v-btn>
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
                                <span class="statement">{{questionSkeleton[questionCategory].condition}}</span>
                            </div>
                            <div class="flexbox question" style="background-color: red; margin:0; padding: 0">
                                <Board id="question">

                                </Board>
                            </div>
                            <br><br>
                            <div class="instructions">
                                <span class="statement">{{questionSkeleton[questionCategory].mainPath}}</span>
                            </div>
                            <div class="instructions">
                                <span class="instruction">{{questions[level].mainBranch}}<span style="color: #0F0">()</span></span>
                            </div>
                            <div class="instructions" v-if="questions[level].optionalBranch">
                                <span class="statement">{{questionSkeleton[questionCategory].optionalPath}}</span>
                            </div>
                            <div class="instructions" v-if="questions[level].optionalBranch">
                                <span class="instruction">{{questions[level].optionalBranch}}<span style="color: #0F0">()</span></span>
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
                            <Card id="card1" draggable="true">
                                <p>{{questions[level].options[1]}}</p>
                            </Card>
                        </Board>
                    </v-col>
                    <v-col id="option2box" class="flexbox options">
                        <Board id="option2">
                            <Card id="card2" draggable="true">
                                <p>{{questions[level].options[2]}}</p>
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
    props: ['category'],
    data() {
        return {
            dialog: false,
            snackbar: false,
            snackbarErr: false,
            loading: false,
            snackbar_true: false,
            snackbar_false: false,
            snackbar_award: false,

            level: 0, // TODO: Last question user accessed
            allQuestions: [
                {
                    category: 0x01, // if
                    level: 1,
                    correctAnswer: 1,
                    options: {
                        1: "îmi place fotbalul",
                        2: "îmi plac jocurile",
                        totalOptions: 2
                    },
                    mainBranch: "joc_fotbal",
                    optionalBranch: "joc_minecraft"
                },
                {
                    category: 0x01, // if
                    level: 2,
                    correctAnswer: 2,
                    options: {
                        1: "îmi place AAAA",
                        2: "îmi plac BBBB",
                        totalOptions: 2
                    },
                    mainBranch: "joc_asdsadsa",
                    optionalBranch: "joc_adsadsad"
                },
                {
                    category: 0x01, // if
                    level: 3,
                    correctAnswer: 2,
                    options: {
                        1: "îmi place CCCCC",
                        2: "îmi plac DDDDDD",
                        totalOptions: 2
                    },
                    mainBranch: "joc_zxzxzx",
                    optionalBranch: null
                },
                {
                    category: 0x02, // while
                    level: 4,
                    correctAnswer: 2,
                    options: {
                        1: "îmi place EEEEEE",
                        2: "îmi plac FFFFFFF",
                        totalOptions: 2
                    },
                    mainBranch: "joc_gfghgffg",
                    optionalBranch: null
                },
                {
                    category: 0x03, // for
                    level: 5,
                    correctAnswer: 2,
                    options: {
                        1: "îmi place GGGGGGGGG",
                        2: "îmi plac HHHHHHH",
                        totalOptions: 2
                    },
                    mainBranch: "joc_trtrtrt",
                    optionalBranch: null
                }
            ],
            questionSkeleton: {
                0x01: {
                    condition: "Dacă",
                    mainPath: "atunci",
                    optionalPath: "altfel"
                },
                0x02: {
                    condition: "Cât timp",
                    mainPath: "execută",
                    optionalPath: null
                },
                0x03: {
                    condition: "Pentru",
                    mainPath: "repetă",
                    optionalPath: null
                }
            }
        };
    },
    computed: {
        questions() {

            if (this.category == 0x00) {
                return this.allQuestions;
            }
            return this.allQuestions.filter(question => question.category == this.category);
        },
        questionCategory() {
            return this.questions[this.level].category
        }
    },
    methods: {
        check_answer() {

            if (
                this.isDescendant(document.getElementById("question"), document.getElementById("card1")) &&
                this.questions[this.level].correctAnswer === 1
            ) {
                this.snackbar_true = true;
                return;
            }

            if (
                this.isDescendant(document.getElementById("question"), document.getElementById("card2")) &&
                this.questions[this.level].correctAnswer === 2
            ) {
                this.snackbar_true = true;
                return;
            }

            this.snackbar_false = true;
        },
        nextQuestion() {
            this.snackbar_true = false;
            this.level++;
            document.getElementById('option1').appendChild(
                document.getElementById('card1')
            );
            document.getElementById('option2').appendChild(
                document.getElementById('card2')
            );
            this.questionCategory = this.questions[this.level].category;
            
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