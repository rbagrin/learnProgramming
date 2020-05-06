<template>
  <nav>
    <v-app-bar flat app dark>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ><v-icon>home</v-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-light">HAI SĂ </span>
        <span>PROGRAMĂM</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="user" color="#555" @click="logout">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer" dark color="#555">
      <v-list>
        <v-subheader class="red--text">MENU</v-subheader>
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
            return this.$store.state.user.token;
        },
        links: function () {

            if (this.$store.state.user.token) {
                return [
                    {
                        icon: "dashboard",
                        text: "Dashboard",
                        route: "/"
                    },
                    {
                        icon: "emoji_events",
                        text: "Premii",
                        route: "/awards"
                    },
                    {
                        icon: "contact_support",
                        text: "FAQ",
                        route: "/faq"
                    },
                    {
                        icon: "contact_phone",
                        text: "Contact",
                        route: "/contact"
                    },
                    {
                        icon: "info",
                        text: "Despre noi",
                        route: "/about"
                    },
                    {
                        icon: "fa-spinner",
                        text: "TODO",
                        route: "/todo"
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
