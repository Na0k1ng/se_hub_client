<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-img v-if="userInfo.group__img === ''" src="@/assets/riv0066-051.jpg" height="250"></v-img>
        <v-img v-else :src="userInfo.group__img" height="250"></v-img>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="ma-5">
        <v-row no-gutters style="margin-top: -100px">
          <v-col>
            <v-avatar size=160 color="white"></v-avatar>
            <v-avatar size=150 color="white" style="margin-left: -155px">
              <v-icon v-if="userInfo.icon === ''" color="grey darken-1">
                mdi-account
              </v-icon>
              <v-img v-else :src="userInfo.icon"></v-img>
            </v-avatar>
          </v-col>
          <v-spacer/>
          <v-col v-show="this.userId === this.profileUserId" cols="4" style="margin-top: 100px">
            <v-btn
                color="grey"
                class="white--text ml-10"
                height=40
                depressed
                @click="editDialog = true"
            >
              <b>プロフィールを編集</b>
            </v-btn>
          </v-col>
          <v-col v-show="this.userId !== this.profileUserId" cols="2" style="margin-top: 100px; text-align: center">
            <v-btn
                @click="dialog = true"
                color="grey lighten-3"
                height=45
                width=60
                style="border-width: 2px ; border-color: #757575"
            >
              <v-icon color="grey darken-1">
                mdi-email-outline
              </v-icon>
            </v-btn>
          </v-col>
          <v-col v-show="this.userId !== this.profileUserId" cols="2" style="margin-top: 100px; text-align: center">
            <v-btn
                v-if="(profileBp.bp_status === '0') || (profileBp.bp_status === '2')"
                color="green accent-4"
                class="text--green text-accent-4"
                height=45
                width=120
                outlined
                rounded
                @click="setBpInfo"
                style="border-width: 2px"
            >
              <b>BP申請する</b>
            </v-btn>
            <v-btn
                v-if="(profileBp.bp_status === '1')"
                color="green accent-4"
                class="white--text"
                height=45
                width=120
                rounded
                @click="deleteBpInfo"
            >
              <b>BP申請済み</b>
            </v-btn>
            <v-btn
                v-if="(profileBp.bp_status === '3')"

                color="green accent-4"
                class="white--text"
                height=45
                width=120
                rounded
                @click="deleteBpDialog=true"
            >
              <v-icon style="position: absolute; left: 0; font-size: 20px;" color="white">mdi-handshake-outline</v-icon>
              <b>BP</b>
            </v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <h3>{{ userInfo.name }}<span v-if="userInfo.group__name">@{{ userInfo.group__name }}</span></h3>
            <a :href="userInfo.group__url" target="_blank"> {{ userInfo.group__url }}</a>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-6">
          <v-col>
            <p style="white-space: pre-line; word-wrap: break-word;">
              {{ userInfo.description }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog
        v-model="deleteBpDialog"
        max-width="400"
    >
      <v-card>
        <v-card-text class="px-6 pt-10 pb-6" style="font-weight: bold; text-align: center;">
          ＢＰ関係を解消しますか？
        </v-card-text>
        <v-card-actions style="text-align: center;">
          <v-col>
            <v-btn
                color="red"
                class="white--text"
                @click="deleteBpInfo(); deleteBpDialog=false"
            >
              <v-icon
                  style="font-size: 18px;"
                  class="pr-1"
              >mdi-hand-right</v-icon>解消する
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
                color="grey"
                class="white--text"
                @click="deleteBpDialog=false"
            >
              キャンセル
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialog"
        max-width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="dialog = false">
            mdi-window-close
          </v-icon>
          <p class="ma-0 pa-0 pl-2">メッセージ</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0">
          <v-text-field
              label="タイトルを入力"
              color="green accent-4"
              :counter="30"
              :maxlength="30"
              v-model="sendInfo.title"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-textarea
              label="本文を入力"
              name="input-7-4"
              :counter="300"
              :maxlength="300"
              color="green accent-4"
              required
              v-model="sendInfo.description"
          ></v-textarea>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0">
          <v-file-input
              truncate-length="0"
              hide-input
              v-model="sendInfo.file"
          ></v-file-input>
          <!--          <v-icon large color="grey darken-1 ma-0 pa-0 rounded-circle">-->
          <!--            mdi-paperclip-->
          <!--          </v-icon>-->
          <v-spacer></v-spacer>
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
        v-model="editDialog"
        max-width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="editDialog = false">
            mdi-window-close
          </v-icon>
          <p class="ma-0 pa-0 pl-2">プロフィール編集</p>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-3"
              class="ma-2 px-3 white--text"
              @click="editGroupDialog = true"
          >
            グループ編集
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-8" justify="center">
          <v-avatar
              class="profile ma-0 pa-0"
              color="grey"
              size=180
              max-height="100%"
              style="margin-left: -185px"
          >
            <v-img
                :src="userInfo.icon"
                @dragenter="dragEnter"
                @dragleave="dragLeave"
                @dragover.prevent="dragOver"
                @drop.prevent="dropFile"

            ></v-img>
          </v-avatar>
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
          <v-textarea
              label="自己紹介"
              :counter="200"
              :maxlength="200"
              v-model="userInfo.description"
          ></v-textarea>
        </v-row>
        <v-card-actions>
          <v-col class="pa-0" style="text-align: center;">
            <v-btn
                color="green accent-4"
                class="mt-6 px-16 py-4 white--text"
                @click="sendProfileInfo()"
            >
              保存
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="editGroupDialog"
        max-width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="editGroupDialog = false">
            mdi-window-close
          </v-icon>
          <p class="ma-0 pa-0 pl-2">グループプロフィール編集</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0 mb-16">
          <v-img
              :src="userInfo.group__img"
              width="800"
              height="250"
              style="overflow: visible"
              v-if="isEnter===false"
              @dragenter="dragEnter"
              @dragleave="dragLeave"
              @dragover.prevent="dragOver"
              @drop.prevent="dropBackFile"
          >
          </v-img>
          <v-img
              :src="userInfo.group__img"
              background-color="grey"
              width="800"
              height="250"
              style="overflow: visible"
              v-else
              @dragenter="dragEnter"
              @dragleave="dragLeave"
              @dragover.prevent="dragOver"
              @drop.prevent="dropBackFile"
          >
          </v-img>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
              label="会社名"
              :counter="30"
              :maxlength="30"
              v-model="userInfo.group__name"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
              label="URL"
              :counter="30"
              :maxlength="30"
              v-model="userInfo.group__url"
          ></v-text-field>
        </v-row>
        <v-card-actions>
          <v-col class="pa-0" style="text-align: center;">
            <v-btn
                color="green accent-4"
                class="mt-6 px-16 py-4 white--text"
                @click="sendGroupProfileInfo()"
            >
              保存
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
  name: "MainProfile",
  data() {
    return {
      dialog: false,
      editDialog: false,
      editGroupDialog: false,
      deleteBpDialog: false,
      isEnter: false,
      files: [],
      form: {},
      backImgform: [],
      userInfo: {
        id: "",
        name: "",
        email: "",
        description: "",
        icon: "",
        group__id: "",
        group__name: "",
        group__description: "",
        group__url: "",
        group__img: "",

        banner: "https://automaton-media.com/wp-content/uploads/2020/02/20200206-112749-header-696x392.jpg",
        company: "",
        url: "",
      },
      sendInfo: {
        title: '',
        description: '',
        file: ''
      },
      credentials: {},
      rules: {
        icon: [],
        banne: [],
        company: [],
        url: [],
        name: [],
        description: [],
      },
      debug: "",
    }
  },
  mounted: function () {
    this.getUserInfo();
    this.getBpInfo();
  },
  methods: {
    setLoginState: function () {
      this.$store.commit('setLoginState', true)
    },
    setProfileBp: function (val) {
      this.$store.commit('setProfileBp', val)
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
    dropFile: function () {
      // let file = evt.target.files;
      // let reader = new window.FileReader();
      // let self = this;
      //
      // console.log('ファイルがおかれた');
      //
      // //dataURL形式でファイルを読み込む
      // reader.readAsDataURL(file[0]);
      //
      // //ファイルの読込が終了した時の処理
      // reader.onload = function () {
      //     self.form = reader.result;
      // };

      let files = [...event.dataTransfer.files];
      let form = new FormData();
      const userId = this.profileUserId;
      let cfile = '';

      files.forEach(file => {
        console.log(file);
        form.append('user_img', file, userId + '.jpg');
        console.log(form);
        cfile = file;
      });

      this.form = form;
      console.log(form);
      console.log(this.form);
      for (let [key, value] of form.entries()) {
        console.log(key, value);
      }

      this.userInfo.icon = cfile;

      this.isEnter = false;
    },
    dropBackFile: function () {
      // let file = evt.target.files;
      // let reader = new window.FileReader();
      // let self = this;
      //
      // console.log('ファイルがおかれた');
      //
      // //dataURL形式でファイルを読み込む
      // reader.readAsDataURL(file[0]);
      //
      // //ファイルの読込が終了した時の処理
      // reader.onload = function () {
      //     self.form = reader.result;
      // };

      let files = [...event.dataTransfer.files];
      let form = new FormData();
      const group_id = this.userInfo.group__id;

      files.forEach(file => {
        console.log(file);
        form.append('group_img', file, group_id + '.jpg');
        console.log(form);
      });

      this.backImgform = form;
      console.log(form);
      console.log(this.backImgform);
      for (let [key, value] of form.entries()) {
        console.log(key, value);
      }

      this.isEnter = false;
    },

    sendProfileInfo() {
      this.sendUserInfo();
      this.sendUserImg();
      this.editDialog = false;
    },
    sendUserInfo() {
      const requestBody = {
        'name': this.userInfo.name,
        'description': this.userInfo.description,
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.put('http://localhost:8000/api/user/' + this.profileUserId + '/', requestBody, reqHeader).then(res => {
        // JWTログイン後にユーザー情報を取得する
        if (res.status.toString() === '200') {
          this.getUserInfo();
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    sendUserImg() {
      console.log(this.form);
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      let form = this.form;

      axios.put('http://localhost:8000/api/user/img/' + this.profileUserId + '/', form, reqHeader).then(res => {
        // JWTログイン後にユーザー情報を取得する
        if (res.status.toString() === '200') {
          this.getUserInfo();
        }
      }).catch(e => {
        console.log(e.message);
      });

    },
    getUserInfo() {
      axios.get('http://localhost:8000/api/user/' + this.profileUserId + '/').then(res => {
        this.userInfo.id = res.data.id;
        this.userInfo.name = res.data.name;
        this.userInfo.email = res.data.email;
        this.userInfo.description = res.data.description;
        if (res.data.img !== null) {
          this.userInfo.icon = 'http://127.0.0.1:8000/media/' + res.data.img;
        } else {
          this.userInfo.icon = ""
        }
        this.userInfo.group__id = res.data.group__id;
        this.userInfo.group__name = res.data.group__name;
        this.userInfo.group__description = res.data.group__description;
        this.userInfo.group__url = res.data.group__url;
        if (res.data.group__img !== null) {
          this.userInfo.group__img = 'http://127.0.0.1:8000/media/' + res.data.group__img;
        } else {
          this.userInfo.group__img = ""
        }
      }).catch(e => {
        console.log(e.message);
      });
      console.log("アイコン画像");
      console.log(this.userInfo.icon);
    },
    sendGroupProfileInfo() {
      this.sendGroupInfo();
      this.sendGroupImg();
      this.editGroupDialog = false;
    },
    sendGroupInfo() {
      const requestBody = {
        'name': this.userInfo.group__name,
        'description': this.userInfo.group__description,
        'url': this.userInfo.group__url,
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.put('http://localhost:8000/api/group/' + this.userInfo.group__id + '/', requestBody, reqHeader).then(res => {
        // JWTログイン後にユーザー情報を取得する
        if (res.status.toString() === '200') {
          this.getUserInfo();
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    sendGroupImg() {
      console.log(this.backImgform);
      if (this.backImgform === "") {
        return
      }
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      let form = this.backImgform;

      axios.put('http://localhost:8000/api/group/img/' + this.userInfo.group__id + '/', form, reqHeader).then(res => {
        // JWTログイン後にユーザー情報を取得する
        if (res.status.toString() === '200') {
          this.getUserInfo();
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    getBpInfo() {
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.get('http://localhost:8000/api/bp/' + this.userId + '/' + this.profileUserId + '/', reqHeader).then(res => {
        if (res.status.toString() === '200') {
          this.setProfileBp(res.data);
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    setBpInfo() {
      const requestBody = {
        'user_id': this.userId,
        'other_id': this.profileUserId,
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.post('http://localhost:8000/api/bp/', requestBody, reqHeader).then(res => {
        if (res.status.toString() === '200') {
          this.getBpInfo()
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    deleteBpInfo() {
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.delete('http://localhost:8000/api/bp/' + this.userId + '/' + this.profileUserId + '/', reqHeader).then(res => {
        if (res.status.toString() === '200') {
          this.getBpInfo()
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    sendMessage() {
      const requestBody = {
        'title': this.sendInfo.title,
        'description': this.sendInfo.description,
        'message_id': '',
        'disclosure_id': '',
        'user_id': this.userId,
        'other_id': this.profileUserId,
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.post('http://localhost:8000/api/message/', requestBody, reqHeader).then(res => {
        if (res.status.toString() === '200') {
          console.log(this.sendInfo.file);
          if (this.sendInfo.file) {
            console.log('sendFile');
            this.sendFile(res.data.message_id)
          }
        }
      }).catch(e => {
        console.log(e.message);
      });

      this.sendInfo.title = '';
      this.sendInfo.description = '';
      this.dialog = false
    },
    sendFile(message_id) {
      // const requestBody = {
      //     'title': this.sendInfo.title,
      //     'description': this.sendInfo.description,
      //     'message_id': '',
      //     'disclosure_id': '',
      //     'user_id': this.userId,
      //     'other_id': this.profileUserId,
      // };

      let form = new FormData();
      let file = this.sendInfo.file;
      console.log(file);
      form.append('file', file);
      console.log(file);


      // const requestBody ={
      //     'file' : this.sendInfo.file
      // };
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
    },

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
    profileUserId: function () {
      return this.$store.state.profileUserId
    },
    profileBp: function () {
      return this.$store.state.profileBp
    },
  }
}
</script>

<style scoped>

</style>