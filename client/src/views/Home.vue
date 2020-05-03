<template>
  <v-item-group multiple>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <Contact title="If" route="/workspace/if" bHeight="250" bColor="#0080ff" />
        </v-col>
        <v-col cols="12" md="8">
          <Contact title="Advanced" route="/workspace/advanced" bHeight="250" bColor="#ff0033" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <Contact title="For" route="/workspace/for" bHeight="250" bColor="#33cc33" />
        </v-col>
        <v-col cols="12" md="4">
          <Contact title="While" route="/workspace/while" bHeight="250" bColor="#661aff" />
        </v-col>
        <v-col cols="12" md="4">
          <Contact title="Premii" route="/premii" bHeight="250" bColor="#cca300" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <Contact title="About" route="/about" bHeight="200" bColor="#3d3d5c" />
        </v-col>
        <v-col cols="12" md="3">
          <Contact title="FAQ" route="/faq" bHeight="200" bColor="#3d3d5c" />
        </v-col>
        <v-col cols="12" md="3">
          <Contact title="Contact" route="/contact" bHeight="200" bColor="#3d3d5c" />
        </v-col>
        <v-col cols="12" md="3">
          <Contact title="About" route="/about" bHeight="200" bColor="#3d3d5c" />
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import Contact from "@/components/RouterCard";

export default {
  name: "Home",
  components: {Contact}
};
</script>
