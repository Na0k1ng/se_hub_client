<template>
  <div class="maincontentlist">
    <v-row no-gutters class="ma-0 pa-0">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
          v-for="n in contentList"
          :key = "n"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="grey lighten-1">
                mdi-account
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ n.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-divider/>
  </div>
</template>

<script>
export default {
  name: "MainBpList",
  data () {
    return {
      contentList: [
        {
          icon: "",
          name: "〇〇〇〇",
        },
        {
          icon: "",
          name: "〇〇〇〇",
        },
        {
          icon: "",
          name: "〇〇〇〇",
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>