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
              <v-icon v-if="n.user1__img === null" class="grey lighten-1">
                mdi-account
              </v-icon>
              <v-avatar>
                <v-img v-if="userId!==n.user1__id" :src="'http://127.0.0.1:8000/media/' + n.user1__img"></v-img>
                <v-img v-else :src="'http://127.0.0.1:8000/media/' + n.user2__img"></v-img>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                  v-if="userId !== n.user1__id"
                  style="font-weight: bold; font-size: 14px; opacity: 0.75;">
                {{ n.user1__name }}
                <span v-if="n.user1__group__name" style="color: darkslateblue;">
                    :{{ n.user1__group__name }}
                </span>
                <span style="position: absolute; right: 32px;">
                  {{ parseTime(n.update_datetime) }}
                </span>
              </v-list-item-title>
              <v-list-item-title
                  v-else
                  style="font-weight: bold; font-size: 14px; opacity: 0.75;">
                {{ n.user2__name }}
                <span v-if="n.user2__group__name" style="color: darkslateblue;">
                    :{{ n.user2__group__name }}
                </span>
                <span style="position: absolute; right: 32px;">
                  {{ parseTime(n.update_datetime) }}
                </span>
              </v-list-item-title>
              <v-list-item-title class="ma-0 py-2" style="font-weight: bold;">
                <span v-if="n.disclosure__id" class="deep-purple--text">RE: {{ n.title }}</span>
                <span v-else>{{ n.title }}</span>
              </v-list-item-title>
              <span v-if="(userId !== n.update_user)&(n.no_read_count>0)">
                <span style="position: absolute; bottom: 22px; right: 76px;">
                  <v-tab>
                    <v-badge
                        color="red"
                        :content="n.no_read_count"
                    ></v-badge>
                  </v-tab>
                </span>
              </span>
              <span v-if="userId !== n.user1__id">
                <span style="position: absolute; bottom: 16px; right: 64px;"><v-icon
                    @click.stop="blockConfirmDialog=true; otherId=n.user1__id;"
                    style="opacity: 0.4;">mdi-account-off</v-icon></span>
                <span style="position: absolute; bottom: 16px; right: 32px;"><v-icon
                    @click.stop="alarmConfirmDialog=true; messageId=n.id;"
                    style="opacity: 0.4;">mdi-alarm-light-off</v-icon></span>
              </span>
              <span v-else>
                <span style="position: absolute; bottom: 15px; right: 64px;"><v-icon
                    @click.stop="blockConfirmDialog=true; otherId=n.user2__id;"
                    style="opacity: 0.4;">mdi-account-off</v-icon></span>
                <span style="position: absolute; bottom: 16px; right: 32px;"><v-icon
                    @click.stop="alarmConfirmDialog=true; messageId=n.id;"
                    style="opacity: 0.4;">mdi-alarm-light-off</v-icon></span>
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-dialog
        v-model="messageDialog"
        max-width="700"
    >
      <v-card class="pa-10">
        <v-card-title class="headline mx-0 mb-4 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="messageDialog = false">
            mdi-arrow-left
          </v-icon>
          <p v-if="selectedMessage.from_user__id !== userId"
             class="ma-0 pa-0 pl-2">
            <span v-if="selectedMessage.disclosure__id" class="deep-purple--text">
              RE: {{ selectedMessage.title }}
            </span>
            <span v-else>{{ selectedMessage.title }}</span>
            <br/>
            <span class="ml-1" style="font-size: 16px;">
              {{ selectedMessage.from_user__name }}
              <span
                  v-if="selectedMessage.from_user__group__name"
                  style="color: darkslateblue;">
                :{{ selectedMessage.from_user__group__name }}
              </span>
              <span
                  style="position: absolute; right: 64px;"
                  @click="showDisclosure(selectedMessage);"
              >
                <v-icon>mdi-note-text-outline</v-icon>
              </span>
            </span>
          </p>
          <p v-else class="ma-0 pa-0 pl-2">
            <span v-if="selectedMessage.disclosure__id" class="deep-purple--text">
              RE: {{ selectedMessage.title }}
            </span>
            <span v-else>{{ selectedMessage.title }}</span>
            <br/>
            <span class="ml-1" style="font-size: 16px;">
              {{ selectedMessage.to_user__name }}
              <span
                  v-if="selectedMessage.to_user__group__name"
                  style="color: darkslateblue;">
                :{{ selectedMessage.to_user__group__name }}
              </span>
              <span
                  style="position: absolute; right: 64px;"
                  @click="showDisclosure(selectedMessage);"
              >
                <v-icon>mdi-note-text-outline</v-icon>
              </span>
            </span>
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-list class="ma-0 py-8" style="background-color: whitesmoke;">
          <v-list-item-group
              v-for="(n,index) in chatList"
              :key="index"
          >
            <v-list-item
                v-if="n.from_user__id === userId"
                class="mb-4 rounded-lg green accent-3"
                style="width: 70%; margin: 0 0 16px 25%;">
              <v-list-item-content>
                <v-list-item-title
                    style="white-space: pre-line; word-wrap: break-word;">
                  {{ n.description }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ parseTime(n.insert_datetime) }}<span v-if="n.is_read" class="ml-2">既読</span>
                </v-list-item-subtitle>
                <a v-if="n.file" :href="parseFile(n.file)">添付ファイルをダウンロード</a>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
                v-else
                style="width: 80%;"
            >
              <v-list-item-avatar>
                <v-icon v-if="n.from_user__img === null" class="grey lighten-1">
                  mdi-account
                </v-icon>
                <v-avatar>
                  <v-img :src="'http://127.0.0.1:8000/media/' + n.from_user__img"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item
                  class="mb-4 rounded-lg white"
              >
                <v-list-item-content>
                  <v-list-item-title
                      style="white-space: pre-line; word-wrap: break-word;">
                    {{ n.description }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ parseTime(n.insert_datetime) }}</v-list-item-subtitle>
                  <a v-if="n.file" :href="parseFile(n.file)">添付ファイルをダウンロード</a>
                </v-list-item-content>
              </v-list-item>
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
    <v-dialog
        v-model="disclosureDialog"
        max-width="700"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 px-0" style="font-size: 22px !important;">
          {{ this.disclosure.title }}
        </v-card-title>
        <v-row class="px-8 mb-4">
          <p class="mt-2" style="white-space: pre-line; word-wrap: break-word;">
            {{ this.disclosure.description }}
          </p>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="blockConfirmDialog"
        max-width="420"
    >
      <v-card class="px-10 py-6">
        <v-card-text class="px-6 pt-10 pb-6" style="font-weight: bold; text-align: center;">
          このユーザーをブロックしますか？
        </v-card-text>
        <v-card-actions style="text-align: center;">
          <v-col>
            <v-btn
                color="red"
                class="white--text"
                @click="blockUser(otherId); blockConfirmDialog=false;"
            >
              ブロックする
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
                color="grey"
                class="white--text"
                @click="blockConfirmDialog=false"
            >
              キャンセル
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="alarmConfirmDialog"
        max-width="420"
    >
      <v-card class="px-10 py-6">
        <v-card-text class="px-6 pt-10 pb-6" style="font-weight: bold; text-align: center;">
          このメッセージを通報しますか？
        </v-card-text>
        <v-card-actions style="text-align: center;">
          <v-col>
            <v-btn
                color="red"
                class="white--text"
                @click="alarmMessage(messageId); alarmConfirmDialog=false;"
            >
              通報する
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
                color="grey"
                class="white--text"
                @click="alarmConfirmDialog=false"
            >
              キャンセル
            </v-btn>
          </v-col>
        </v-card-actions>
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
      messageList: [],
      chatList: [],
      disclosure: {},
      message: "",
      form: [],
      selectedMessage: "",
      chatMessage: "",
      file: "",
      // ダイアログ表示用フラグ
      messageDialog: false,
      disclosureDialog: false,
      blockConfirmDialog: false,
      alarmConfirmDialog: false,
      // ブロック&アラーム用変数
      otherId: '',
      messageId: '',
    }
  },
  mounted: function () {
    console.log('mounted')
    this.getMessageList();
    window.setInterval(() => {
      this.getMessageList();
    }, 60000);
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
      this.messageDialog = true;
      if (this.userId === this.selectedMessage.user1__id) {
        this.otherId = this.selectedMessage.user2__id;
      } else {
        this.otherId = this.selectedMessage.user1__id;
      }
      this.readMessage(message.id);
    },
    readMessage(messageId) {
      const requestBody = {
        'user_id': this.userId,
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };
      axios.put('http://localhost:8000/api/message/' + messageId + '/', requestBody, reqHeader).then(res => {
        if (res.status.toString() !== '200') {
          console.log('API(既読)通信に失敗しました！');
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    sendMessage() {
      const requestBody = {
        'description': this.chatMessage,
        'room_id': this.selectedMessage.id,
        'user_id': this.userId,
        'other_id': this.otherId,
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
    },
    // ブロック処理
    blockUser: function (otherId) {
      axios.put('http://localhost:8000/api/user/block/' + this.userId + '/' + otherId + '/').then(res => {
        // JWTログイン後にユーザー情報を取得する
        if (res.status.toString() === '200') {
          console.log(res)
        }
        this.otherId = '';
      }).catch(e => {
        console.log(e.message);
      });
    },
    // 通報処理
    alarmMessage: function (messageId) {
      axios.put('http://localhost:8000/api/message/alarm/' + messageId + '/').then(res => {
        // JWTログイン後にユーザー情報を取得する
        if (res.status.toString() === '200') {
          console.log(res);
        }
        this.messageId = '';
      }).catch(e => {
        console.log(e.message);
      });
    },
    showDisclosure: function (selectedMessage) {
      this.disclosure = {
        'title': selectedMessage.disclosure__title,
        'description': selectedMessage.disclosure__description,
      };
      this.disclosureDialog = true;
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