<template>
    <v-container style="background-color: #ffcc00; height: 100%">
        <v-row justify="center" align="center" style>
            <p style="font-size: 30px; margin-bottom: 40px; margin-top: 20px">Deblochează mai multe premii răspunzând corect la întrebări</p>
        </v-row>
        <v-sheet class="mx-auto" elevation="8" max-width="800">
            <v-slide-group v-model="model" class="pa-4" show-arrows >
                <v-slide-item v-slot:default="{ active, toggle }">
                    <v-card :color="active || !disabledAwards.watch ? '#0080ff' : 'grey lighten-1'" class="ma-4" height="200" width="200" :disabled="disabledAwards.watch"
                        @click="toggle">
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
                    <v-card :color="active ? '#33cc33' : 'grey lighten-1'" class="ma-4" height="200" width="200" :disabled="disabledAwards.glasses"
                        @click="toggle">
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
                    <v-card :color="active ? '#661aff' : 'grey lighten-1'" class="ma-4" height="200" width="200" :disabled="disabledAwards.hat"
                        @click="toggle">
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
                    <v-card :color="active ? '#ff0033' : 'grey lighten-1'" class="ma-4" height="200" width="200" :disabled="disabledAwards.tshirt"
                        @click="toggle">
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
                    <v-card :color="active ? '#3d3d5c' : 'grey lighten-1'" class="ma-4" height="200" width="200"
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
          disabledAwards: {
            watch: false,
            glasses: true,
            hat: true,
            tshirt: true
          }
      }),
  }
</script>