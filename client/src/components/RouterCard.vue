<template>         
    <v-item>
        <v-card
            :color="bColor"
            class="d-flex align-center"
            dark
            :height='bHeight'
            @click="routeTo()"
        >
            <v-scroll-y-transition>
                <div class="display-3 flex-grow-1 text-center" >
                    {{title}}
                </div>
            </v-scroll-y-transition>
        </v-card>
    </v-item>
</template>

<script>
import router from "@/router";

export default {
    props: ['title', 'route', 'bHeight', 'bColor'],
    methods: {
        routeTo: function () {
            router.push(this.route);
        }
    }
};
</script>