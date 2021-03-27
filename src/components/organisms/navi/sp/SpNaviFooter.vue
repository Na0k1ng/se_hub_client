<template>
  <v-row v-if="$vuetify.breakpoint.xs" class="ma-0 pa-0">
    <v-col class="ma-0 pa-0">
      <v-footer color="white" app class="ma-0 pa-0" style="width: 100vw;">
        <v-container class="ma-0 pa-0">
          <v-row class="ma-0 pa-0">
            <v-col cols="4" class="py-4 px-0" style="text-align: center;">
              <v-btn to="/" text active-class="green--text text--accent-4 no-background" :ripple="false" class="grey--text text--accent-1"><v-icon>mdi-magnify</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="py-4 px-0" style="text-align: center;">
              <v-btn to="/message" text active-class="green--text text--accent-4 no-background" :ripple="false" class="grey--text text--accent-1"><v-icon>mdi-email-outline</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="py-4 px-0" style="text-align: center;">
              <v-btn to="/bp" text active-class="green--text text--accent-4 no-background" :ripple="false" class="grey--text text--accent-1"><v-icon>mdi-handshake-outline</v-icon></v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-col>
  </v-row>
</template>

<script></script>

<style scoped>
  .no-background::before {
    opacity: 0;
  }
</style>