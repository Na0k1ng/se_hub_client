<template>
  <v-navigation-drawer
      app
      left
      :permanent="$vuetify.breakpoint.smAndUp"
      width="350"
      :color="baseColor"
    >
    <v-sheet :color="baseColor" width="100%" class="pl-14">
      <v-list flat>
        <template v-if="loginState">
          <v-list-item-group :class="naviFont">
            <v-list-item :to="'/profile/' + userId" :ripple="false" class="py-2 px-3 font-weight-bold">
              <v-list-item-avatar class="mr-8" :class="outlined">
                <v-img :src="'http://127.0.0.1:8000/media/' + userImg"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle
                    v-if="groupName"
                    style="color: darkslateblue;">
                  {{ groupName }}
                </v-list-item-subtitle>
                <v-list-item-title>
                  {{ userName }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item to="/" :ripple="false" active-class="font-weight-bold" class="pt-3 pb-1">
              <v-list-item-icon>
                <v-icon large>mdi-magnify</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>検索</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/bp" :ripple="false" active-class="font-weight-bold"
                         class="py-1">
              <v-list-item-icon>
                <v-icon large>mdi-handshake-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>BP管理</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/messages" :ripple="false" active-class="font-weight-bold" class="py-1">
              <v-list-item-icon>
                <v-icon large>mdi-email-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>メッセージ</v-list-item-title>
                <span v-if="noReadCount > 0">
                  <span style="position: absolute; bottom: 34px; right: 48px;">
                    <v-tab>
                      <v-badge
                          color="red"
                          :content="noReadCount"
                      ></v-badge>
                    </v-tab>
                  </span>
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group>
            <v-list-item @click.stop="settingsDialog=true" :ripple="false" class="py-1">
              <v-list-item-icon>
                <v-icon large :color="iconColor">mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>設定</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group>
            <v-list-item  class="pt-16" :ripple="false">
              <v-btn
                  :color=buttonColor
                  class="white--text"
                  height="60"
                  width="250"
                  @click.stop="writeDisclosureDialog = true"
              >
                <b>情報を発信する</b>
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </template>
        <template v-else>
          <v-list-item-group>
            <v-list-item @click.stop="loginDialog=true" class="py-2">
              <v-list-item-avatar>
                <v-icon large :color="iconColor">mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>ゲスト</v-list-item-title>
                <v-list-item-subtitle>ログインするにはクリック</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-item-group>
          <v-list-item-group :class="naviFont">
            <v-list-item to="/" :ripple="false" active-class="font-weight-bold" class="pt-3 pb-1">
              <v-list-item-icon>
                <v-icon large>mdi-magnify</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>検索</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </template>
      </v-list>
      <v-dialog
          v-model="loginDialog"
          max-width="512"
      >
        <v-card class="pa-10">
          <v-card-title class="headline"
                        style="text-align: center; color: #00C853; font-family: 'Franklin Gothic Medium' !important; display: inherit;">
            SE-Hub
          </v-card-title>
          <v-form ref="form" v-model="valid" class="pl-6 pr-8 pt-4 pb-6">
            <v-text-field
                prepend-icon="mdi-account-circle"
                label="メールアドレス"
                :counter="50"
                maxlength="50"
                required
                color="green accent-4"
                :rules="rules.email"
                v-model="credentials.email"
                @keyup.enter="login"
                @keypress="can_login=true; can_confirm=false;"
            />
            <v-text-field
                prepend-icon="mdi-lock"
                label="パスワード"
                :counter="20"
                maxlength="20"
                required
                color="green accent-4"
                :rules="rules.password"
                v-model="credentials.password"
                v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                v-bind:type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                @keyup.enter="login"
                @keypress="can_login=true; can_confirm=false;"
            />
          </v-form>
          <v-card-text v-if="loginError" class="red--text" style="text-align: center;">
            メールアドレスまたはパスワードが違います。
          </v-card-text>
          <v-card-actions class="px-8">
            <v-col>
              <v-btn
                  :disabled="!valid"
                  color="green accent-4"
                  class="white--text"
                  width="160"
                  @click="login"
              >
                ログイン
              </v-btn>
            </v-col>
            <v-col style="text-align: right;">
              <v-btn
                  color="grey"
                  class="white--text"
                  width="120"
                  @click="registerDialog=true"
              >
                新規登録
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="registerDialog"
          max-width="512"
      >
        <v-card class="pa-10">
          <v-card-title class="headline" style="text-align: center; display: inherit;">
            登録情報入力
          </v-card-title>
          <v-form ref="form" v-model="valid" class="pl-6 pr-8 pt-4 pb-6">
            <v-text-field
                prepend-icon="mdi-account-circle"
                label="ユーザー名"
                :counter="12"
                maxlength="12"
                required
                color="green accent-4"
                v-model="credentials.name"
                @keypress="can_login=false; can_confirm=false;"
            />
            <v-text-field
                prepend-icon="mdi-email-outline"
                label="メールアドレス"
                :counter="50"
                maxlength="50"
                required
                color="green accent-4"
                :rules="rules.email"
                v-model="credentials.email"
                @keypress="can_login=false; can_confirm=false;"
            />
            <v-text-field
                prepend-icon="mdi-lock"
                label="パスワード"
                :counter="20"
                maxlength="20"
                required
                color="green accent-4"
                :rules="rules.password"
                v-model="credentials.password"
                v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                v-bind:type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                @keypress="can_login=false; can_confirm=false;"
            />
          </v-form>
          <v-card-text v-if="registerError" class="red--text" style="text-align: center;">
            {{ this.errorMessage }}
          </v-card-text>
          <v-card-actions class="px-8">
            <v-col style="text-align: center;">
              <v-btn
                  :disabled="!valid"
                  color="green accent-4"
                  class="white--text"
                  width="180"
                  @click="registerHash"
              >
                入力情報確認
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="hashDialog"
          max-width="400"
      >
        <v-card class="pa-10">
          <v-card-title class="headline" style="text-align: center; display: inherit;">
            確認コード入力
          </v-card-title>
          <v-form ref="form" class="px-10 py-6" style="text-align: center;">
            <vue-fake-input
                label="確認コード"
                :length="6"
                :font-size="16"
                color="green accent-4"
                required
                v-model="credentials.hash_cd"
                @keypress="can_login=false;"
            />
          </v-form>
          <v-card-actions>
            <v-col style="text-align: center;">
              <v-btn
                  :disabled="!valid"
                  class="white--text"
                  width="80%"
                  color="green accent-4"
                  @click="registerUser"
              >
                確認
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="writeDisclosureDialog"
          max-width="600"
      >
        <v-card class="pa-10">
          <v-card-title class="headline">
            情報発信
          </v-card-title>
          <v-row class="ma-0 pa-0">
            <v-checkbox
                v-model="selected"
                label="案件情報"
                value="1"
                :color="checkBoxColor"
            ></v-checkbox>
            <v-checkbox
                v-model="selected"
                label="人材情報"
                value="2"
                :color="checkBoxColor"
                class="pl-2"
            ></v-checkbox>
            <v-checkbox
                v-model="selected"
                label="交流会"
                value="3"
                :color="checkBoxColor"
                class="pl-2"
            ></v-checkbox>
            <v-checkbox
                v-model="selected"
                label="その他"
                value="5"
                :color="checkBoxColor"
                class="pl-2"
            ></v-checkbox>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-text-field
                label="タイトル"
                color="green accent-4"
                :counter="30"
                :maxlength="30"
                v-model="send_info.title"
            ></v-text-field>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-textarea
                label="内容"
                name="input-7-4"
                v-model="send_info.body"
                color="green accent-4"
                :counter="300"
                :maxlength="300"
                required
            ></v-textarea>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-file-input
                truncate-length="0"
                hide-input
                v-model="send_info.file"
            ></v-file-input>
            <v-spacer></v-spacer>
            <v-btn
                @click="sendJobInfo(); disclosureDialog=false;"
                width=120
                color="green accent-4"
                class="white&#45;&#45;text px-8"
            >
              送信
            </v-btn>
          </v-row>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="settingsDialog"
          max-width="600"
      >
        <v-card class="pa-10">
          <v-card-title class="headline pb-10">
            設定
          </v-card-title>
          <v-card-subtitle class="my-0 py-0">通知設定</v-card-subtitle>
          <v-card-actions class="ml-10 my-0 py-0">
            <v-row class="my-0 py-0">
              <v-col class="my-0 py-0">
                <v-switch
                    v-model="messageSendMail"
                    color="green accent-4"
                    inset
                    :label="'メッセージの受信をメールで通知する'"
                    @click="toggleSettings(msmKind);"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-actions class="ml-10 my-0 py-0">
            <v-row class="my-0 py-0">
              <v-col class="my-0 py-0">
                <v-switch
                    v-model="bpSendMail"
                    color="green accent-4"
                    class="my-1 py-0"
                    inset
                    :label="'BPリクエストをメールで通知する'"
                    @click="toggleSettings(bsmKind);"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="my-3 py-0">アカウント</v-card-subtitle>
          <v-card-actions class="ml-10 my-0 py-0">
            <v-row class="my-0 py-0">
              <v-col class="my-0 py-0">
                <v-switch
                    v-model="canFindName"
                    color="green accent-4"
                    class="my-1 py-0"
                    inset
                    :label="'アカウント検索を有効にする'"
                    @click="toggleSettings(cfnKind);"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="mt-1 py-0" style="text-align: center;">あなたのアカウントのQRコード</v-card-subtitle>
          <div class="ma-0 pa-0" style="text-align: center;">
            <vue-qrcode :value="'http://localhost:8080/profile/' + userId"
                        :color="{ dark: '#666666', light: '#ffffff' }"/>
          </div>
          <v-card-actions>
            <v-col class="mt-4 mb-0 pb-4 py-0" style="text-align: center;">
              <v-btn
                  color=red
                  class="white--text"
                  height="40"
                  width="140"
                  @click.stop="logoutDialog = true"
              >
                <b>ログアウト</b>
              </v-btn>
            </v-col>
          </v-card-actions>
          <v-card-subtitle class="mb-0 pb-0">その他</v-card-subtitle>
          <v-card-actions>
            <v-col class="mb-2 pa-0" style="text-align: center;">
              <v-card-text
                  class="mt-2 pa-0"
                  style="color: #cccccc; font-weight: normal; text-decoration: underline; cursor: pointer;"
                  @click.stop="deleteAccountDialog=true"
              >
                <b>アカウントの退会について</b>
              </v-card-text>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog

          v-model="logoutDialog"
          max-width="420"
      >
        <v-card class="px-10 py-6">
          <v-card-text class="px-6 pt-10 pb-6" style="font-weight: bold; text-align: center;">
            ログアウトしますか?
          </v-card-text>
          <v-card-actions style="text-align: center;">
            <v-col>
              <v-btn
                  color="red"
                  class="white--text"
                  @click="logout()"
              >
                ログアウト
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                  color="grey"
                  class="white--text"
                  @click="logoutDialog=false"
              >
                キャンセル
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="deleteAccountDialog"
          max-width="480"
      >
        <v-card class="px-10 py-6">
          <v-card-text class="px-6 pt-10 pb-6" style="font-weight: bold; text-align: center;">
            アカウントを退会しますか？<br>
            <p class="pt-4 ma-0" style="text-align: left; font-size: 12px;">※法人ドメインのメールアドレスではない場合、<br>
              過去に登録したことがあるメールアドレスでの再登録は、<br>
              不可能となります。</p>
          </v-card-text>
          <v-card-actions style="text-align: center;">
            <v-col>
              <v-btn
                  color="red"
                  class="white--text"
                  @click="deleteUser()"
              >
                退会する
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                  color="grey"
                  class="white--text"
                  @click="deleteAccountDialog=false"
              >
                キャンセル
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios';
import VueQrcode from 'vue-qrcode';

export default {
  name: "NaviLeft",
  components: {
    VueQrcode
  },
  mounted() {
    this.initOutline();
    this.getNoReadCount();
    window.setInterval(() => {
      this.getNoReadCount();
    }, 60000);
  },
  data() {
    return {
      // style
      baseColor: 'grey lighten-3',
      iconColor: 'grey darken-1',
      buttonColor: 'green accent-4',
      naviFont: 'green--text text--accent-4',
      defaultColor: 'gray--text text--darken-1',
      naviItmColor: {
        explore: 'grey darken-1',
        bp: 'grey darken-1',
        messages: 'grey darken-1',
      },
      checkBoxColor: 'green accent-4',
      // green accent-4

      // メッセージ未読数
      noReadCount: '',

      selectedProfile: false,
      activeNaviItm: 'test',

      // 制御
      can_login: false,
      can_confirm: false,

      // エラーメッセージ(フラグ)
      loginError: false,
      registerError: false,
      // エラーメッセージ
      errorMessage: '',

      // ダイアログ表示用のフラグ
      loginDialog: false,
      registerDialog: false,
      hashDialog: false,
      writeDisclosureDialog: false,
      settingsDialog: false,
      logoutDialog: false,
      deleteAccountDialog: false,

      // 設定フラグ
      messageSendMail: false,
      bpSendMail: false,
      canFindName: false,

      // 設定種別（固定値）
      msmKind: '1',
      bsmKind: '2',
      cfnKind: '5',

      // User Info
      userInfo: {
        userId: '',
        token: '',
        name: '',
        img: '',
        groupName: '',
        Key: '',
      },
      img: '',
      send_info: {
        title: "",
        body: "",
        file: ""
      },
      valid: true,
      credentials: {},
      rules: {
        email: [
          v => !!v || "ユーザー名は必須です",
          v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません",
        ],
        password: [
          v => !!v || "パスワードは必須です",
          v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません"
        ]
      },
      login_state: false,
      showPassword: false,
      test_token: "",
      user_id: "",

      // add register
      hash_cd: '',
      invite_email: '',
      axios_res: '',
      axios_get_res: '',

      // CSS
      outlined: '',

      //案件情報投稿 チェックボックス
      selected: ''
    }
  },
  watch: {
    '$route': function () {
      this.initOutline();
    }
  },
  methods: {
    initOutline () {
      if (this.$route.path === '/profile/' + this.userId) {
        this.outlined = 'outlined';
      } else {
        this.outlined = '';
      }
    },

    // メッセージ未読数取得
    getNoReadCount: function () {
      if (!this.loginState) {
        return;
      }
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };
      axios.get('http://localhost:8000/api/message/notice/' + this.userId + '/', reqHeader).then(res => {
        if (res.status.toString() === '200') {
          this.noReadCount = res.data.message_count;
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    // ログイン処理
    login: async function () {
      if (!this.can_login) {
        return;
      }
      if (this.$refs.form.validate()) {
        // 認証処理を同期呼び出し、その後ユーザ情報取得
        await this.authenticate();
        if (!this.userId) {
          this.loginError = true;
          return;
        }
        await this.getUserInfo();
        if (!this.userId) {
          this.loginError = true;
          return;
        }
        this.setLoginState(true);
        this.credentials.email = '';
        this.credentials.password = '';
        this.loginDialog = false;
      }
    },
    // Email,Passwordによる認証処理
    authenticate: async function () {
      const requestBody = {
        email: this.credentials.email,
        password: this.credentials.password
      };
      await axios.post('http://localhost:8000/api/auth/', requestBody).then(res => {
        // 受け取ったトークンを変換しユーザIDを取得
        let payload = res.data.token.split('.')[1];
        this.userInfo.userId = JSON.parse(atob(payload)).user_id;
        this.setUserId(this.userInfo.userId);
        this.userInfo.token = res.data.token;
        this.setToken(res.data.token);
      }).catch(e => {
        console.log("error");
        console.log(e.message);
      });
    },
    // ユーザ情報取得処理
    getUserInfo: async function () {
      await axios.get('http://localhost:8000/api/user/' + this.userInfo.userId + '/').then(res => {
        if (!res.data.id) {
          this.deleteToken();
          return;
        }
        this.userInfo.key = res.data.key;
        this.userInfo.name = res.data.name;
        this.userInfo.img = res.data.img;
        this.userInfo.groupName = res.data.group__name;
        this.messageSendMail = res.data.should_send_message;
        this.bpSendMail = res.data.should_send_bp;
        this.canFindName = res.data.can_find_name;
        this.setUserKey(this.userInfo.key);
        this.setUserName(this.userInfo.name);
        this.setUserImg(this.userInfo.img);
        this.setGroupName(this.userInfo.groupName);
      }).catch(e => {
        console.log("error");
        console.log(e.message);
      });
    },
    // ログイン画面(ダイアログ):「新規登録」ボタン押下時の処理
    registerHash() {
      if (this.$refs.form.validate()) {
        axios.post('http://localhost:8000/api/user/hash/', {'email': this.credentials.email}).then(res => {
          // 確認コード入力画面(ダイアログ)を開く
          if (res.status.toString() === '200') {
            this.hashDialog = true;
          }
        }).catch(e => {
          console.log(e.message);
        });
      } else {
        this.loginDialog = false;
      }
    },
    // 確認コード入力画面(ダイアログ):「確認」ボタン押下時の処理
    registerUser() {
      const requestBody = {
        'name': this.credentials.name,
        'email': this.credentials.email,
        'password': this.credentials.password,
        'hash_cd': this.credentials.hash_cd,
      };
      if (this.$refs.form.validate()) {
        axios.post('http://localhost:8000/api/user/', requestBody).then(res => {
          // JWTログイン後にユーザー情報を取得する
          if (res.status.toString() === '200') {
            this.can_login = true;
            this.login();
          }
        }).catch(e => {
          console.log(e.message);
        });
        this.loginDialog = false;
        this.registerDialog = false;
        this.hashDialog = false;
        this.credentials.name = '';
        this.credentials.hash_cd = '';
      }
    },
    logout() {
      this.deleteToken();
      this.setLoginState(false);
      this.settingsDialog = false;
      this.logoutDialog = false;
      this.$router.push('/').catch(err => {
        console.log(err)
      });
    },
    deleteToken: function () {
      this.setUserName("");
      this.setGroupName('');
      this.setUserId("");
      this.setUserKey('');
      this.setUserImg('');
      this.setToken("");
      this.setProfileUserId("");
    },
    setLoginState: function (state) {
      this.$store.commit('setLoginState', state);
    },
    setUserName: function (user_name) {
      this.$store.commit('setUserName', user_name);
    },
    setGroupName: function (groupName) {
      this.$store.commit('setGroupName', groupName);
    },
    setUserId: function (userId) {
      this.$store.commit('setUserId', userId);
    },
    setUserKey: function (userKey) {
      this.$store.commit('setUserKey', userKey);
    },
    setUserImg: function (userImg) {
      this.$store.commit('setUserImg', userImg);
    },
    setToken: function (token) {
      this.$store.commit('setToken', token);
    },
    setProfileUserId: function (profileUserId) {
      this.$store.commit('setProfileUserId', profileUserId)
    },
    sendJobInfo: function () {
      const requestBody = {
        'title': this.send_info.title,
        'description': this.send_info.body,
        'kind': this.selected,
        'limit': '0',
        'data': '',
        'user_id': this.userId,
      };

      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.post('http://localhost:8000/api/disclosure/', requestBody, reqHeader).then(res => {
        // JWTログイン後にユーザー情報を取得する
        if (res.status.toString() === '200') {
          console.log(res);
          if (this.send_info.file) {
            this.sendFile(res.data.disclosure_id)
          }
        }
      }).catch(e => {
        console.log(e.message);
      });

      this.send_info.title = '';
      this.send_info.body = '';
      this.writeDisclosureDialog = false;
    },
    sendFile(disclosureId) {
      let form = new FormData();
      let file = this.send_info.file;
      form.append('file', file);
      console.log(file);
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };
      axios.put('http://localhost:8000/api/disclosure/file/' + disclosureId + '/', form, reqHeader).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e.message);
      });
      this.send_info.file = "";
    },
    toggleSettings: function (kind) {
      let isEnable = false;
      if (kind === this.msmKind) {
        this.messageSendMail = !this.messageSendMail;
        isEnable = this.messageSendMail;
      } else if (kind === this.bsmKind) {
        this.bpSendMail = !this.bpSendMail;
        isEnable = this.bpSendMail;
      } else if (kind === this.cfnKind) {
        this.canFindName = !this.canFindName;
        isEnable = this.canFindName;
      }
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };
      const reqBody = {
        'kind': kind,
        'is_enable': isEnable,
      };
      axios.put('http://localhost:8000/api/user/settings/' + this.userId + '/', reqBody, reqHeader).then(res => {
        if (res.status.toString() === '200') {
          console.log('ok');
        }
      }).catch(e => {
        console.log("error");
        console.log(e.message);
      });
    },
    toProfile() {
      this.setProfileUserId(this.userId);
      console.log("toProfile()");
      // if (this.$router.currentRoute.path === "/profile") {
      //   this.$router.go({path: this.$router.currentRoute.path, force: true});
      // } else {
      //   // let path = '/profile/' + this.userId;
      //   this.$router.push('/profile/' + this.userId).catch(err => {
      //     console.log(err)
      //   });
      // }
      this.$router.push('/profile/' + this.userId).catch(err => {
        console.log(err)
      });
      this.selectedProfile = true;
    },
    deleteUser: function () {
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };
      axios.delete('http://localhost:8000/api/user/' + this.userInfo.userId + '/', reqHeader).then(res => {
        if (res.status.toString() === '200') {
          this.logout();
          this.deleteAccountDialog = false;
        }
      }).catch(e => {
        console.log("error");
        console.log(e.message);
      });
    },
  },
  computed: {
    loginState: function () {
      return this.$store.state.loginState;
    },
    userName: function () {
      return this.$store.state.userName;
    },
    groupName: function () {
      return this.$store.state.groupName;
    },
    userId: function () {
      return this.$store.state.userId;
    },
    userKey: function () {
      return this.$store.state.userKey;
    },
    userImg: function () {
      return this.$store.state.userImg;
    },
    token: function () {
      return this.$store.state.token;
    },
    profileUserId: function () {
      return this.$store.state.profileUserId
    },
  }
}
</script>

<style scoped>
  .outlined {
    border: 2px solid #00C853;
    border-radius:50%;
    height: 56px;
    width: 56px;
  }
</style>