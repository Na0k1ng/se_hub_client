<template>
  <div class="maincontentlist">
    <v-row no-gutters class="ma-0 pa-0">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
                v-for="(n,index) in messageList"
                :key="index"
        >
          <v-list-item @click="getChatList()">
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
                  v-for="(n,index) in chatList"
                  :key="index"
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
                  :counter="300"
                  :maxlength="300"
                  v-model="message"
          ></v-text-field>
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="sendMessage()">
            mdi-send-circle-outline
          </v-icon>
        </v-row>
      </v-card>
    </v-dialog>

    <v-divider/>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "MainMessageList",
        data() {
            return {
                dialog: false,
                messageList: [],
                chatList: [],
                message: "",
                form: []
            }
        },
        mounted: function () {
            console.log('mounted')
            this.getMessageList();
        },
        methods: {
            getMessageList() {
                let messageList = [
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
                ];

                axios.post('http://localhost:8000/api/user/' + this.userName + '/').then(res => {
                    if (res.status.toString() === '200') {
                        alert("正常系です。");
                    }
                }).catch(e => {
                    alert("異常系です。");
                    console.log(e.message);
                });
                this.messageList = messageList;
            },
            getChatList() {
                let chatList = [
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
                ];
                axios.post('http://localhost:8000/api/user/' + this.userName + '/').then(res => {
                    if (res.status.toString() === '200') {
                        alert("正常系です。");
                    }
                }).catch(e => {
                    alert("異常系です。");
                    console.log(e.message);
                });
                this.chatList = chatList;
                this.dialog = true;
            },
            sendMessage() {
                const requestBody = {
                    'message': this.message,
                };

                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                        'content-type': 'multipart/form-data'
                    },
                };

                let form = this.form;
                form.append('json_data', requestBody);

                axios.put('http://localhost:8000/api/user/' + this.userId + '/', form, reqHeader).then(res => {
                    // JWTログイン後にユーザー情報を取得する
                    if (res.status.toString() === '200') {
                        alert("大成功");
                    }
                }).catch(e => {
                    alert("エラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                    console.log(e.message);
                });

                this.dialog = false;
            },
        },
        computed: {
            userName: function () {
                return this.$store.state.userName
            },
            token: function () {
                return this.$store.state.token
            },
            userId: function () {
                return this.$store.state.userId
            },
        },
    }
</script>

<style scoped>

</style>