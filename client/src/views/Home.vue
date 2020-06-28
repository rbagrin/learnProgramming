<template>
    <v-item-group multiple>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <RouterCard title="Dacă" route="/workspace/if" bHeight="250" bColor="#0080ff" icon="watch" />
                </v-col>
                <v-col cols="12" md="8">
                    <RouterCard title="Avansat" route="/workspace/advanced" bHeight="250" bColor="#ff0033"
                        icon="fa-tshirt" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <RouterCard title="Pentru" route="/workspace/for" bHeight="250" bColor="#33cc33" icon="fa-glasses" />
                </v-col>
                <v-col cols="12" md="4">
                    <RouterCard title="Cât Timp" route="/workspace/while" bHeight="250" bColor="#661aff"
                        icon="fa-hat-cowboy-side" />
                </v-col>
                <v-col cols="12" md="4">
                    <RouterCard title="Premii" route="/awards" bHeight="250" bColor="#cca300" icon="emoji_events" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <RouterCard title="FAQ" route="/faq" bHeight="200" bColor="#3d3d5c" icon="contact_support" />
                </v-col>
                <v-col cols="12" md="3">
                    <RouterCard title="Contact" route="/contact" bHeight="200" bColor="#3d3d5c" icon="contact_phone" />
                </v-col>
                <v-col cols="12" md="3">
                    <RouterCard title="Despre noi" route="/about" bHeight="200" bColor="#3d3d5c" icon="info" />
                </v-col>
                <v-col cols="12" md="3">
                    <RouterCard title="TODO" route="/todo" bHeight="200" bColor="#3d3d5c" icon="fa-spinner" />
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
</template>

<script>
import RouterCard from "../components/dashboard/RouterCard";

export default {
    name: "Home",
    components: {RouterCard},
    created() {
        this.$store.dispatch('getUsersFromDB');
        this.$store.dispatch('getQuestionsFromDB');
        this.$store.dispatch('getFaqsFromDB');
    }
};
</script>
