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
              <v-list-item-subtitle>{{ n.subtitle }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ n.text }}</v-list-item-subtitle>
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
  name: "MainContentList",
  data () {
    return {
      contentList: [
        {
          icon: "",
          title: "タイトル1",
          subtitle: "c1XXXXXXXXXXXXXX",
          text: "ct1XXXXXXXXXXXXXX"
        },
        {
          icon: "",
          title: "タイトル2",
          subtitle: "c2XXXXXXXXXXXXX",
          text: "ct2XXXXXXXXXXXXX"
        },
        {
          icon: "",
          title: "タイトル3",
          subtitle: "c3XXXXXXXXXXXXX",
          text: "ct3XXXXXXXXXXXXX"
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>