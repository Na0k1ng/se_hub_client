<template>
  <div class="maincontentlist">
    <v-row no-gutters class="ma-0 pa-0">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
                v-for="(n,index) in messageList"
                :key="index"
        >
          <v-list-item @click="getChatList(n)">
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
          <p v-if="selectedMessage.from_user__id != userId" class="ma-0 pa-0 pl-2">{{ selectedMessage.title }} ({{
            selectedMessage.from_user__name }})</p>
          <p v-else class="ma-0 pa-0 pl-2">{{ selectedMessage.title }} ({{ selectedMessage.to_user__name }})</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-list width="50%" class="ma-0 pa-0 my-8">
          <v-list-item-group
                  v-for="(n,index) in chatList"
                  :key="index"
          >
            <v-list-item v-if="n.from_user__id == userId" class="mb-4 rounded-pill grey">
              <v-list-item-content>
                <v-list-item-title>{{ n.description }}</v-list-item-title>
                <v-list-item-subtitle>{{ parseTime(n.insert_datetime) }}</v-list-item-subtitle>
                <a v-if="n.file" :href="parseFile(n.file)">添付ファイルをダウンロード</a>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else class="mb-4 rounded-pill">
              <v-list-item-avatar>
                <v-icon v-if="n.from_user__img === null" class="grey lighten-1">
                  mdi-account
                </v-icon>
                <v-avatar>
                  <v-img :src="'http://127.0.0.1:8000/media/' + n.from_user__img"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ n.description }}</v-list-item-title>
                <v-list-item-subtitle>{{ parseTime(n.insert_datetime) }}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="n.is_read">既読</v-list-item-subtitle>
                <a v-if="n.file" :href="parseFile(n.file)">添付ファイルをダウンロード</a>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0">
          <v-col cols="12" class="pb-0">
            <v-textarea
                    label="メッセージを入力"
                    name="input-7-4"
                    :counter="300"
                    :maxlength="300"
                    color="green accent-4"
                    required
                    v-model="chatMessage"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-file-input
                  truncate-length="0"
                  hide-input
                  v-model="file"
          ></v-file-input>
          <v-spacer/>
          <v-btn
                  @click="sendMessage()"
                  width=120
                  color="green accent-4"
                  class="white--text mt-4"
          >
            送信
          </v-btn>
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
                form: [],
                selectedMessage: "",
                chatMessage: "",
                file: ""
            }
        },
        mounted: function () {
            console.log('mounted')
            this.getMessageList();
        },
        methods: {
            getMessageList() {
                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };

                let count = '1';
                const requestBody = {
                    'count': count
                };

                axios.post('http://localhost:8000/api/message/list/' + this.userId + '/', requestBody, reqHeader).then(res => {
                    if (res.status.toString() === '200') {
                        this.messageList = res.data
                    }
                }).catch(e => {
                    console.log(e.message);
                });

                // this.messageList = messageList;
            },
            getChatList(message) {
                this.message = message;

                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };

                let count = '1';

                axios.get('http://localhost:8000/api/message/' + message.id + '/' + count + '/', reqHeader).then(res => {
                    if (res.status.toString() === '200') {
                        this.chatList = res.data
                    }
                }).catch(e => {
                    console.log(e.message);
                });

                this.selectedMessage = message;
                this.dialog = true;
            },
            sendMessage() {
                const requestBody = {
                    'title': "",
                    'description': this.chatMessage,
                    'message_id': this.selectedMessage.id,
                    'disclosure_id': '',
                    'user_id': this.userId,
                    'other_id': this.selectedMessage.to_user__id,
                };
                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };

                axios.post('http://localhost:8000/api/message/', requestBody, reqHeader).then(res => {
                    if (res.status.toString() === '200') {
                        console.log(this.file);
                        if (this.file) {
                            this.sendFile(res.data.message_id)
                        }
                    }
                }).catch(e => {
                    console.log(e.message);
                });
                this.chatMessage = "";
                this.getChatList(this.message)
            },
            parseTime(insert_datetime) {
                let ts = Date.parse(insert_datetime);
                const dt = new Date(ts);
                const year = dt.getFullYear();
                const month = dt.getMonth() + 1;
                const days = dt.getDate();
                const hours = dt.getHours();
                const minutes = dt.getMinutes();
                return year + "/" + month + "/" + days + " " + hours + ":" + minutes
            },
            sendFile(message_id) {
                let form = new FormData();
                let file = this.file;

                form.append('file', file);
                console.log(file);

                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };

                axios.put('http://localhost:8000/api/message/file/' + message_id + '/', form, reqHeader).then(res => {
                    console.log(res)
                }).catch(e => {
                    console.log(e.message);
                });

                this.file = "";
            },
            parseFile(file) {
                console.log(file)
                let ret = null;
                if (file) {
                    ret = 'http://127.0.0.1:8000/media/' + file
                }
                return ret
            }
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