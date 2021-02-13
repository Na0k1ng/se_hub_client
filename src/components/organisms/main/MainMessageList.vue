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
          <p v-if="selectedMessage.from_user__id != userId" class="ma-0 pa-0 pl-2">{{ selectedMessage.title }}  ({{ selectedMessage.from_user__name }})</p>
          <p v-else class="ma-0 pa-0 pl-2">{{ selectedMessage.title }}  ({{ selectedMessage.to_user__name }})</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-list width="50%" class="ma-0 pa-0 my-8">
          <v-list-item-group
                  v-for="(n,index) in chatList"
                  :key="index"
          >
            <v-list-item v-if="n.mymsg" class="mb-4 rounded-pill grey">
              <v-list-item-content>
                <v-list-item-title>{{ n.description }}</v-list-item-title>
                <v-list-item-subtitle>{{ parseTime(n.insert_datetime) }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else class="mb-4 rounded-pill">
              <v-list-item-avatar>
                <v-icon class="grey lighten-1">
                  mdi-account
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ n.description }}</v-list-item-title>
                <v-list-item-subtitle>{{ parseTime(n.insert_datetime) }}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="n.is_read">既読</v-list-item-subtitle>
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
                form: [],
                selectedMessage: ""
            }
        },
        mounted: function () {
            console.log('mounted')
            this.getMessageList();
        },
        methods: {
            getMessageList() {
                // let messageList = [
                //     {
                //         icon: "",
                //         title: "メッセージ1",
                //     },
                //     {
                //         icon: "",
                //         title: "メッセージ2",
                //     },
                //     {
                //         icon: "",
                //         title: "メッセージ3",
                //     },
                // ];

                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };

                let count = '1';
                const requestBody = {
                    'count' : count
                };

                axios.post('http://localhost:8000/api/message/list/' + this.userId + '/' ,requestBody ,reqHeader).then(res => {
                    if (res.status.toString() === '200') {
                        this.messageList = res.data
                    }
                }).catch(e => {
                    console.log(e.message);
                });

                // this.messageList = messageList;
            },
            getChatList(message) {
                // let chatList = [
                //     {
                //         icon: "",
                //         body: "Hi. I'm AllGoal .Inc",
                //         timestamp: "午後8:30",
                //         mymsg: true,
                //         aread: false,
                //     },
                //     {
                //         icon: "",
                //         body: "Hi. I'm XXX .Inc",
                //         timestamp: "午後9:00",
                //         mymsg: false,
                //         aread: true,
                //     },
                //     {
                //         icon: "",
                //         body: "XXXXXXXX",
                //         timestamp: "午後9:30",
                //         mymsg: true,
                //         aread: false,
                //     },
                // ];

                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };

                let count = '1';

                axios.get('http://localhost:8000/api/message/' + message.id + '/' + count + '/' ,reqHeader).then(res => {
                    if (res.status.toString() === '200') {
                        this.chatList = res.data
                    }
                }).catch(e => {
                    console.log(e.message);
                });

                this.selectedMessage= message;
                this.dialog = true;
            },
            sendMessage(id) {
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

                axios.put('http://localhost:8000/api/user/' + id + '/', form, reqHeader).then(res => {
                    // JWTログイン後にユーザー情報を取得する
                    console.log(res)
                }).catch(e => {
                    console.log(e.message);
                });

                this.dialog = false;
            },
            parseTime(insert_datetime) {
               // let tmp=  insert_datetime.split("T")
               // let date = tmp[0]
               // let tmp_t = tmp[1].split(":")
               // let time = tmp_t[0] + ":" + tmp_t[1]
               // return date + " " + time
                let ts = Date.parse(insert_datetime);
                const dt = new Date(ts);
                const year = dt.getFullYear();
                const month = dt.getMonth() + 1;
                const days = dt.getDate();
                const hours = dt.getHours();
                const minutes = dt.getMinutes();
                return year + "/" + month + "/" + days + " " + hours + ":" + minutes
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