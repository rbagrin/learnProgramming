<template>
    <v-item>
        <v-card :color="bColor" class="d-flex align-center" dark :height='bHeight' @click="routeTo()">
            <v-scroll-y-transition>
                <v-container class="display-3 flex-grow-1 text-center">
                    <v-row justify=center style="font-family: 'Modak', cursive;">
                        {{title}}
                    </v-row>
                    <v-row justify=center>
                        <v-icon style="font-size: 56px;">{{icon}}</v-icon>
                    </v-row>
                </v-container>
            </v-scroll-y-transition>
        </v-card>
    </v-item>
</template>

<script>
import router from "@/router";

export default {
    props: ['title', 'route', 'bHeight', 'bColor', 'icon'],
    methods: {
        routeTo: function () {

            router.push(this.route);
        }
    }
};
</script>