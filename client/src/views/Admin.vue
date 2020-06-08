<template>
    <div id="admin">
        <v-row height="100%" justify="center">
            <v-col cols="12" md="8">
                <v-list dark>
                    <v-subheader>
                        <v-row justify="space-between">
                            <v-col cols="12" md="3">USERS</v-col>
                            <v-col cols="12" md="2">
                                <AddUser :users="users" />
                            </v-col>
                        </v-row>
                    </v-subheader>
                    <v-list-item-group v-model="user" color="primary" :ripple=false>
                        <v-list-item v-for="(item, i) in users" :key="i" :ripple=false>
                            <v-row justify="space-between">
                                <v-col>
                                    {{item.name}}
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-chip outlined label small class="justify-center" color="green" text-color="white"
                                        style="font-size: 10px; width: 75px">
                                        {{item.role}}
                                    </v-chip>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-btn small @click="deleteUser(item)">
                                        <v-icon small color="red">delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AddUser from "@/components/users/AddUser";

export default {
    name: "Admin",
    components: {
        AddUser
    },
    data: () => ({
        user: 1
    }),
    computed: {

        users: function () {
            return this.$store.getters.users;
        }
    },
    methods: {
        async deleteUser(user) {
            try {

                const deleted = await this.$store.dispatch('deleteUser', user._id);

                if (!deleted) {
                    alert("Something wrong happened!");
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
    created() {
        this.$store.dispatch('getUsersFromDB');
    },
};
</script>

<style>

</style>
