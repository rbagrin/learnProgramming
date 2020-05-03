<template>
    <v-container fill-height grid-list-md text-xs-center class="container">
        <v-row justify="space-around" align="center" style="margin: 0; padding: 0">
            <v-col cols="12" md="4" xs="12">
                <img src="@/assets/ionel-1.png" width="320px" height="550px">
            </v-col>
            <v-col cols="12" md="7" xs="12">
                <v-row style="background-color: #00f; height: 300px">
                    <v-card color="#385F73" dark width=100% height=100% align="center">

                        <v-card-text style="font-size: 25px">
                            Daca <span>
                                <div class="flexbox question">
                                    <Board id="question">

                                    </Board>
                                </div>
                            </span><br>
                            atunci du-te si mananca <br>
                            altfel <br>
                            du-te la joaca
                        </v-card-text>

                        <v-card-actions align='center'>
                            <v-spacer></v-spacer>
                            <v-btn text color="#6f6">
                                <v-icon left>check_circle</v-icon>
                                <span>VERIFICA</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-row>
                <br>
                <v-row id="options" justify="space-between">
                    <v-col class="flexbox options">
                        <Board id="option1">
                            <Card id="card-a" draggable="true">
                                <p>Option 1</p>
                            </Card>
                        </Board>
                    </v-col>
                    <v-col class="flexbox options">
                        <Board id="option2">
                            <Card id="card-b" draggable="true">
                                <p>Option 2</p>
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
            loading: false
        };
    },
    methods: {
        async submit() {

        }
    },
    components: { Board, Card }
};
</script>

<style scoped>

.container {
    height: 100%;
}

#options {
    background-color: red;
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

</style>