<template>
  <div class="mainprofile">
    <v-row no-gutters class="ma-0 pa-0 mb-10">
      <v-sheet
              class="ma-0 pa-0"
              max-width="100%"
              tile
      >
        <v-img
                :src="userInfo.banner"
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
            <v-img :src="userInfo.icon"></v-img>
          </v-avatar>
        </v-img>

      </v-sheet>

    </v-row>


    <v-row>
      <v-sheet
              class="ma-0 pa-0"
              max-width="100%"
              tile
      >
        <v-row>
          <v-col class="ma-2 pa-2" color="grey lighten-3" cols="4">
            <p class="ma-1 pa-2">{{userInfo.name}}</p>
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
            <p class="ma-1 pa-2">URL: {{userInfo.url}}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" color="grey lighten-3">
            <p class="ma-0 pa-2">{{userInfo.description}}</p>
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
                  @click="sendUserInfo"
          >
            保存
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0 mb-16">
          <v-img
                  :src="userInfo.banner"
                  width="800"
                  height="250"
                  style="overflow: visible"
                  v-if="isEnter===false"
                  @dragenter="dragEnter"
                  @dragleave="dragLeave"
                  @dragover.prevent="dragOver"
                  @drop.prevent="dropFile"
          >
            <v-avatar
                    class="profile ma-0 pa-0"
                    color="grey"
                    style="postion:absolute; left: 5%; top: 70%"
                    size=130
                    max-height="100%"
                    v-if="isEnter===false"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    @dragover.prevent="dragOver"
                    @drop.prevent="dropFile"
            >
              <v-img :src="userInfo.icon"></v-img>
            </v-avatar>
          </v-img>
          <v-img
                  :src="userInfo.banner"
                  background-color="grey"
                  width="800"
                  height="250"
                  style="overflow: visible"
                  v-else
                  @dragenter="dragEnter"
                  @dragleave="dragLeave"
                  @dragover.prevent="dragOver"
                  @drop.prevent="dropFile"
          >
          </v-img>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="会社名"
                  :counter="30"
                  :maxlength="30"
                  v-model="userInfo.company"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="URL"
                  :counter="30"
                  :maxlength="30"
                  v-model="userInfo.url"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="名前"
                  :counter="30"
                  :maxlength="30"
                  v-model="userInfo.name"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="自己紹介"
                  :counter="30"
                  :maxlength="30"
                  v-model="userInfo.description"
          ></v-text-field>
        </v-row>
      </v-card>
    </v-dialog>
    <v-divider/>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "MainProfile",
        data() {
            return {
                dialog: false,
                editDialog: false,
                isEnter: false,
                files: [],
                userInfo: {
                    icon: "https://wpteq.org/wp-content/uploads/2018/06/latest1.png",
                    banner: "https://automaton-media.com/wp-content/uploads/2020/02/20200206-112749-header-696x392.jpg",
                    company: "",
                    url: "https://www.allgoal.co.jp/",
                    name: "個人名XX",
                    description: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
                },
                credentials: {},
                rules: {
                    icon: [
                    ],
                    banne: [
                    ],
                    company: [
                    ],
                    url: [
                    ],
                    name: [
                    ],
                    description: [
                    ],
                },
            }
        },
        methods: {
            setLoginState: function () {
                this.$store.commit('setLoginState', true)
            },
            dragEnter() {
                console.log('ファイルが入った');
            },
            dragLeave() {
                console.log('ファイルが出た');
                this.isEnter = false;
            },
            dragOver() {
                console.log('ファイルが上にある')
                this.isEnter = true;
            },
            dropFile() {
                console.log('ファイルがおかれた');
                this.isEnter = false;
                this.files = [...event.dataTransfer.files];
                this.files.forEach(file => {
                    console.log(file);
                })
            },
            sendUserInfo() {
                const requestBody = {
                    'name': this.userInfo.name,
                    'description': this.userInfo.description,
                    'img': this.userInfo.icon,
                };

                const reqHeader = {
                     headers: {
                        Authorization: 'JWT' + ' ' + this.token
                    },
                };

                axios.put('http://localhost:8000/api/user/' + this.userId + '/', requestBody, reqHeader).then(res => {
                    // JWTログイン後にユーザー情報を取得する
                    if (res.status.toString() === '200') {
                        alert("大成功");
                    }
                }).catch(e => {
                    alert("エラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                    console.log(e.message);
                });

                this.editDialog = false
            },
            // getUserInfo() {
            //     const requestBody = {
            //         'name': this.userInfo.name,
            //         'description': this.userInfo.description,
            //         'img': this.userInfo.icon,
            //     }
            //
            //     axios.post('http://localhost:8000/api/user/' + this.userName + '/').then(res => {
            //         if (res.status.toString() === '200') {
            //             alert("正常系です。");
            //         }
            //     }).catch(e => {
            //         alert("異常系です。");
            //         console.log(e.message);
            //     });
            // }
        },
        computed: {
            loginState: function () {
                return this.$store.state.loginState
            },
            token: function () {
                return this.$store.state.token
            },
            userId: function () {
                return this.$store.state.userId
            },
        }
    }
</script>

<style scoped>

</style>