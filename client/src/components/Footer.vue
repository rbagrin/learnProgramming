<template>
    <v-card flat tile class="black lighten-1">
        <v-card-text class="text-divs">
            <v-row class="my-0 py-0">
                <v-col cols="12" md="4" class="my-0 py-0">
                    <v-btn v-for="link in links" :key="link.icon" class="mx-4 white--text" icon>
                        <a :href="link.route"><v-icon size="24px">{{ link.icon }}</v-icon></a>
                    </v-btn>
                </v-col>
                <v-col cols="12" md="4" class="text-center my-0 py-0">
                    <span class="font-color">{{ new Date().getFullYear() }} <strong class="my-0 py-0">&copy; Radu Bagrin</strong></span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    data: () => ({
      links: [
          {
            icon: 'mdi-facebook',
            route: 'https://www.facebook.com/bagrin.radu/'
          },
        {
            icon: 'mdi-linkedin',
            route: 'https://www.linkedin.com'
        },
        {
            icon: 'mdi-instagram',
            route: 'https://www.instagram.com/racm_md/'
        }
      ],
    }),
  }
</script>

<style scoped>
.text-divs {
    margin: 10px 0px 0px 0px;
    padding: 0;
}
.font-color {
    color: #26A69A;
}
a, a:link, a:visited {
    text-decoration: none;
    background-color: transparent;
    color: #26A69A;
}

a:hover {
  color: #FFF;
}
</style>