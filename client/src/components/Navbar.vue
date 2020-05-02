<template>
  <nav>
    <v-app-bar flat app class="green darken-3 white--text">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-light">Let's</span>
        <span>PROGRAM</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="user" color="white" @click="logout">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer" class="green darken-4">
      <v-list>
        <v-subheader class="white--text">MENU</v-subheader>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in links"
            :key="i"
            router
            :to="item.route"
            class="mx-1"
          >
            <v-list-item-icon>
              <v-icon left class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="white--text">
              <v-list-item-title v-html="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            drawer: false,
            snackbar: false,
        };
    },
    computed: {
        user: function () {
            return this.$store.state.user.user;
        },
        links: function () {
            if (this.$store.state.user.user) {
                return [
                    {
                        icon: "dashboard",
                        text: "Dashboard",
                        route: "/"
                    },
                    {
                        icon: "contact_support",
                        text: "FAQ",
                        route: "/faq"
                    },
                    {
                        icon: "info",
                        text: "About",
                        route: "/about"
                    }
                ];
            }

            return [
                {
                    icon: "fa-sign-in-alt",
                    text: "Log in",
                    route: "/login"
                },
                {
                    icon: "fa-user-plus",
                    text: "Register",
                    route: "/register"
                }
            ];
            
        }
    },

    methods: {
        logout() {

            this.$store.dispatch('LOGOUT');
            this.$router.push("/login");
        },
    }
};
</script>

<style scoped></style>
