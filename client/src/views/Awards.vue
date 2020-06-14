<template>
    <v-container style="background-color: #ffcc00; height: 100%">
        <v-row justify="center" align="center" style>
            <p style="font-size: 30px; margin-bottom: 40px; margin-top: 20px">Deblochează mai multe premii răspunzând
                corect la întrebări</p>
        </v-row>
        <v-sheet class="mx-auto" elevation="8" max-width="800">
            <v-slide-group v-model="model" class="pa-4" show-arrows>
                <v-slide-item v-slot:default="{ active, toggle }">
                    <v-card :color="active || watch ? '#0080ff' : 'grey lighten-1'" class="ma-4"
                        height="200" width="200" :disabled="!watch" @click="toggle">
                        <v-row class="fill-height" align="center" justify="center">
                            <v-scale-transition>
                                <v-icon v-if="active" color="white" size="88" v-text="'mdi-close-circle-outline'">
                                </v-icon>
                                <v-icon v-if="!active" color="white" size="88">watch</v-icon>
                            </v-scale-transition>
                        </v-row>
                    </v-card>
                </v-slide-item>
                <v-slide-item v-slot:default="{ active, toggle }">
                    <v-card :color="active || glasses ? '#33cc33' : 'grey lighten-1'" class="ma-4" height="200" width="200"
                        :disabled="!glasses" @click="toggle">
                        <v-row class="fill-height" align="center" justify="center">
                            <v-scale-transition>
                                <v-icon v-if="active" color="white" size="88" v-text="'mdi-close-circle-outline'">
                                </v-icon>
                                <v-icon v-if="!active" color="white" size="88">fa-glasses</v-icon>
                            </v-scale-transition>
                        </v-row>
                    </v-card>
                </v-slide-item>
                <v-slide-item v-slot:default="{ active, toggle }">
                    <v-card :color="active || hat ? '#661aff' : 'grey lighten-1'" class="ma-4" height="200" width="200"
                        :disabled="!hat" @click="toggle">
                        <v-row class="fill-height" align="center" justify="center">
                            <v-scale-transition>
                                <v-icon v-if="active" color="white" size="88" v-text="'mdi-close-circle-outline'">
                                </v-icon>
                                <v-icon v-if="!active" color="white" size="88">fa-hat-cowboy-side</v-icon>
                            </v-scale-transition>
                        </v-row>
                    </v-card>
                </v-slide-item>
                <v-slide-item v-slot:default="{ active, toggle }">
                    <v-card :color="active || tshirt ? '#ff0033' : 'grey lighten-1'" class="ma-4" height="200" width="200"
                        :disabled="!tshirt" @click="toggle">
                        <v-row class="fill-height" align="center" justify="center">
                            <v-scale-transition>
                                <v-icon v-if="active" color="white" size="88" v-text="'mdi-close-circle-outline'">
                                </v-icon>
                                <v-icon v-if="!active" color="white" size="88">fa-tshirt</v-icon>
                            </v-scale-transition>
                        </v-row>
                    </v-card>
                </v-slide-item>
                <v-slide-item v-slot:default="{ active, toggle }">
                    <v-card :color="active || finalAward ? '#3d3d5c' : 'grey lighten-1'" class="ma-4" height="200" width="200"
                        @click="toggle">
                        <v-row class="fill-height" align="center" justify="center">
                            <v-scale-transition>
                                <v-icon v-if="active" color="white" size="88" v-text="'mdi-close-circle-outline'">
                                </v-icon>
                                <v-icon v-if="!active" color="white" size="88">help</v-icon>
                            </v-scale-transition>
                        </v-row>
                    </v-card>
                </v-slide-item>
            </v-slide-group>

            <v-expand-transition>
                <v-sheet v-if="model != null" color="grey lighten-4" height="200" tile>
                    <v-row class="fill-height" align="center" justify="center">
                        <img src="@/assets/watch.jpg" width="400px" height="200px">
                    </v-row>
                </v-sheet>
            </v-expand-transition>
        </v-sheet>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        model: null,
    }),
    computed: {
        watch: function() {
            return this.$store.getters.if_award;
        },
        glasses: function() {
            return this.$store.getters.for_award;
        },
        hat: function() {
            return this.$store.getters.while_award;
        },
        tshirt: function() {
            return this.$store.getters.advanced_award;
        },
        finalAward: function() {
            return this.watch && this.glasses && this.hat && this.tshirt;
        },
    }
}
</script>