<template>
  <div class="maincontentlist">
    <v-row no-gutters class="ma-0 pa-0">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
          v-for="n in contentList"
          :key = "n"
        >
          <v-list-item @click.stop="dialog = true">
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
    <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <v-card class="pa-10">
          <v-card-title class="headline ma-0 pa-0">
            <v-icon large color="grey darken-1 ma-0 pa-0" @click="dialog = false">
              mdi-arrow-left
            </v-icon>
            <p class="ma-0 pa-0 pl-2">メッセージ相手</p>
          </v-card-title>
          <v-divider></v-divider>
          <v-list width="50%" class="ma-0 pa-0 my-8">
            <v-list-item-group
              v-for="n in chatList"
              :key = "n"
            >
              <v-list-item v-if="n.mymsg" class="mb-4 rounded-pill grey">
                <v-list-item-content>
                  <v-list-item-title>{{ n.body }}</v-list-item-title>
                  <v-list-item-subtitle>{{ n.timestamp }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-else class="mb-4 rounded-pill">
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1">
                    mdi-account
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ n.body }}</v-list-item-title>
                  <v-list-item-subtitle>{{ n.timestamp }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="n.aread">既読</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-divider></v-divider>
          <v-row class="ma-0 pa-0">
            <v-icon large color="grey darken-1 ma-0 pa-0 rounded-circle">
              mdi-paperclip
            </v-icon>
            <v-text-field
              label="メッセージを入力"
            ></v-text-field>
            <v-icon large color="grey darken-1 ma-0 pa-0">
              mdi-send-circle-outline
            </v-icon>
          </v-row>
        </v-card>
      </v-dialog>

    <v-divider/>
  </div>
</template>

<script>
export default {
  name: "MainMessageList",
  data () {
    return {
      dialog: false,
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
      ],
      chatList: [
        {
          icon: "",
          body: "Hi. I'm AllGoal .Inc",
          timestamp: "午後8:30",
          mymsg: true,
          aread: false,
        },
        {
          icon: "",
          body: "Hi. I'm XXX .Inc",
          timestamp: "午後9:00",
          mymsg: false,
          aread: true,
        },
        {
          icon: "",
          body: "XXXXXXXX",
          timestamp: "午後9:30",
          mymsg: true,
          aread: false,
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>