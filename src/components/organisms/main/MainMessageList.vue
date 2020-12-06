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
              <v-list-item-title>{{ n.title }}</v-list-item-title>
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
  name: "MainMessageList",
  data () {
    return {
      contentList: [
        {
          icon: "",
          title: "メッセージ1",
        },
        {
          icon: "",
          title: "メッセージ2",
        },
        {
          icon: "",
          title: "メッセージ3",
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>