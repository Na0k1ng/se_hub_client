<template>
  <div class="mainprofile">
    <v-row no-gutters class="ma-0 pa-0 mb-10">
      <v-sheet
              class="ma-0 pa-0"
              max-width="100%"
              tile
      >
        <v-img
                :src="profileBanner"
                width="800"
                height="250"
                style="overflow: visible"
        >
          <v-avatar
                  class="profile ma-0 pa-0"
                  color="grey"
                  style="postion:absolute; left: 5%; top: 70%"
                  size=130
                  max-height="100%"
          >
            <v-img :src="profileImg"></v-img>
          </v-avatar>
        </v-img>

      </v-sheet>

    </v-row>


    <v-row>
      <v-sheet
              class="ma-0 pa-0"
              tile
      >
        <v-row>
          <v-col class="ma-2 pa-2" color="grey lighten-3" cols="4">
            <p class="ma-1 pa-2">{{profileUserName}}</p>
          </v-col>
          <v-col class="ma-2 pa-2" color="grey lighten-3" cols="1">
            <v-avatar class="profile grey lighten-3" @click="dialog = true">
              <v-icon large color="grey darken-1 ma-0 pa-0">
                mdi-email-outline
              </v-icon>
            </v-avatar>
          </v-col>
          <v-col class="ma-2 pa-2" color="grey lighten-3" cols="3">
            <v-btn class="ma-1 pa-2"
                   color="grey lighten-1"
                   rounded
                   @click="editDialog = true"
            >
              プロフィールを編集
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" color="grey lighten-3">
            <p class="ma-1 pa-2">URL: {{profileUrl}}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" color="grey lighten-3">
            <p class="ma-0 pa-2">{{profileBody}}</p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-row>
    <v-dialog
            v-model="dialog"
            max-width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="dialog = false">
            mdi-close-box-outline
          </v-icon>
          <p class="ma-0 pa-0 pl-2">メッセージ</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="タイトルを入力"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="本文を入力"
          ></v-text-field>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0 rounded-circle">
            mdi-paperclip
          </v-icon>
          <v-spacer></v-spacer>
          <v-icon large color="grey darken-1 ma-0 pa-0">
            mdi-send-circle-outline
          </v-icon>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
            v-model="editDialog"
            max-width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="editDialog = false">
            mdi-close-box-outline
          </v-icon>
          <p class="ma-0 pa-0 pl-2">プロフィール編集</p>
          <v-spacer></v-spacer>
          <v-btn
                  color="grey lighten-1"
                  rounded
                  class="ma-2 pa-0"
          >
            保存
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0">
          <v-file-input
                  accept="image/*"
                  label="プロフィール画像"
          ></v-file-input>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-file-input
                  accept="image/*"
                  label="プロフィールバナー画像"
          ></v-file-input>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="会社名"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="URL"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="名前"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="自己紹介"
          ></v-text-field>
        </v-row>
      </v-card>
    </v-dialog>
    <v-divider/>
  </div>
</template>

<script>
    export default {
        name: "MainProfile",
        data() {
            return {
                dialog: false,
                editDialog: false,
                profileUserName: "個人名XX",
                profileUrl: "https://www.allgoal.co.jp/",
                profileBody: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
                profileBanner: "https://automaton-media.com/wp-content/uploads/2020/02/20200206-112749-header-696x392.jpg",
                profileImg: "https://wpteq.org/wp-content/uploads/2018/06/latest1.png",
            }
        },
        methods: {
            setLoginState: function () {
                this.$store.commit('setLoginState', true)
            }
        },
        computed: {
            loginState: function () {
                return this.$store.state.loginState
            }
        }
    }
</script>

<style scoped>

</style>