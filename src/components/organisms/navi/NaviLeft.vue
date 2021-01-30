<template>
  <v-navigation-drawer
          app
          color="grey lighten-3"
          permanent
          width="350"
  >
    <v-sheet
            color="grey lighten-3"
            width="100%"
    >
      <v-list
              class="pl-14"
              flat
      >
        <v-list-item
                v-if="loginState"
                to="/profile" active-class="font-weight-bold"
        >
          <v-list-item-icon>
            <v-icon large color="grey darken-1">
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{userName}}</v-list-item-title>
            <v-list-item-subtitle>{{userId}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{token}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
                v-else
                link
                @click.stop="dialog = true"
        >
          <v-list-item-icon>
            <v-icon large color="grey darken-1">
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ゲスト</v-list-item-title>
            <v-list-item-subtitle>ログインするにはクリック</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/" active-class="font-weight-bold" v-if="loginState">
          <v-list-item-icon>
            <v-icon large color="grey darken-1">
              mdi-home
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ホーム</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/explore" active-class="font-weight-bold">
          <v-list-item-icon>
            <v-icon large color="grey darken-1">
              mdi-magnify
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>検索</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/bpManagement" active-class="font-weight-bold" v-if="loginState">
          <v-list-item-icon>
            <v-icon large color="grey darken-1">
              mdi-bell-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>BP管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/messages" active-class="font-weight-bold" v-if="loginState">
          <v-list-item-icon>
            <v-icon large color="grey darken-1">
              mdi-email-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>メッセージ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item active-class="font-weight-bold" @click="toProfile()" v-if="loginState">
          <v-list-item-icon>
            <v-icon large color="grey darken-1">
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>プロフィール</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="dialog_settings = true">
          <v-list-item-icon>
            <v-icon large color="grey darken-1">
              mdi-cog-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pt-4" v-if="loginState">
          <v-btn
                  color="grey lighten-1"
                  rounded
                  height="60"
                  width="250"
                  @click.stop="dialog_trans_info = true"
          >
            <b>情報を発信する</b>
          </v-btn>
        </v-list-item>
        <v-list-item class="pt-10 mt-10" v-if="loginState">
          <v-btn
                  color="grey lighten-1"
                  rounded
                  height="50"
                  width="140"
                  @click.stop="dialog_logout = true"
          >
            ログアウト
          </v-btn>
        </v-list-item>
      </v-list>
      <v-dialog
              v-model="dialog"
              max-width="600"
      >
        <v-card class="pa-10">
          <v-card-title class="headline">
            ログイン
          </v-card-title>
          <v-form ref="form" v-model="valid">
            <v-text-field
                    prepend-icon="mdi-account-circle"
                    label="メールアドレス"
                    :counter="50"
                    maxlength="50"
                    required
                    :rules="rules.email"
                    v-model="credentials.email"
            />
            <v-text-field
                    prepend-icon="mdi-lock"
                    label="パスワード"
                    :counter="20"
                    maxlength="20"
                    required
                    :rules="rules.password"
                    v-model="credentials.password"
                    v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    v-bind:type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
            />
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    :disabled="!valid"
                    class="info"
                    @click="login"
            >
              ログイン
            </v-btn>
            <v-btn
                    :disabled="!valid"
                    class="info"
                    @click="registerHash"
            >
              新規登録
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
              v-model="dialog_hash"
              max-width="550"
      >
        <v-card class="pa-10">
          <v-card-title class="headline">
            確認コード入力
          </v-card-title>
          <v-form ref="form">
            <v-text-field
                    prepend-icon="mdi-account-circle"
                    label="確認コード"
                    :counter="6"
                    maxlength="6"
                    required
                    v-model="credentials.hash_cd"
            />
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    :disabled="!valid"
                    class="info"
                    @click="registerUser"
            >
              確認
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
              v-model="dialog_trans_info"
              max-width="600"
      >
        <v-card class="pa-10">
          <v-card-title class="headline">
            情報発信
          </v-card-title>
          <v-row class="ma-0 pa-0">
            <v-text-field
                    label="タイトル"
                    :counter="30"
                    :maxlength="30"
                    v-model="send_info.title"
            ></v-text-field>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-textarea
                    outlined rows="20"
                    name="input-7-4"
                    v-model="send_info.body"
                    :counter="300"
                    :maxlength="300"
                    required
                    label="Message"
            ></v-textarea>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    class="info"
                    @click="sendJobInfo()"
            >
              送信
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
              v-model="dialog_settings"
              max-width="600"
      >
        <v-card class="pa-10">
          <v-card-title class="headline">
            設定
          </v-card-title>

        </v-card>
      </v-dialog>
      <v-dialog

              v-model="dialog_logout"
              max-width="600"
      >
        <v-card class="pa-10">
          <v-card-title class="headline">
            ログアウト
          </v-card-title>
          <row class="pt-5">
            ログアウトしますか?
          </row>
          <v-card-actions class="pt-4">
            <v-btn
                    class="info"
                    @click="logout()"
            >
              ログアウト
            </v-btn>
            <v-btn
                    class="info"
                    @click="dialog_logout=false"
            >
              キャンセル
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "NaviLeft",
        components: {},
        data() {
            return {
                // dialog flag
                dialog: false,
                dialog_hash: false,
                dialog_trans_info: false,
                dialog_settings: false,
                dialog_logout: false,

                // User Info
                send_info: {
                    title: "",
                    body: "",
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
            }
        },

        methods: {
            login() {
                let tmp = '';
                let payload = '';
                let ret = '';
                if (this.$refs.form.validate()) {
                    const qs = require('qs');
                    axios
                        .post('http://localhost:8000/api/auth/', qs.stringify(this.credentials))
                        .then(res => {
                            payload = res.data.token.split('.')[1];
                            this.user_id = JSON.parse(atob(payload)).user_id;
                            this.test_token = this.user_id;
                            this.setUserId(this.test_token);
                            this.setToken(res.data.token);
                            tmp = res.data.token;
                            alert('http://localhost:8000/api/user/' + this.test_token + '/');
                            axios.get('http://localhost:8000/api/user/' + this.user_id + '/').then(res => {
                                this.setUserName(res.data.email);
                            }).catch(e => {
                                alert("例外");
                                alert(e.message);
                            });
                        });
                    //     .then(res => (this.axios_res = res))
                    //     .catch(e => {
                    //         this.test_token = e.data.detail[0];
                    //         tmp = JSON.stringify(e.status);
                    //         alert("例外1");
                    //         alert(e.message);
                    //     });
                    // payload = this.axios_res.data.token.split('.')[1];
                    // this.test_token = JSON.parse(atob(payload)).user_id;
                    //
                    // alert(this.axios_res.data.email);
                    // axios
                    //     .get('http://localhost:8000/api/user/' + this.test_token + '/')
                    //     .then(res => (this.axios_get_res = res))
                    //     .catch(e => {
                    //         alert("例外2");
                    //         alert(e.message);
                    //     });
                    //
                    // alert(this.axios_get_res.data.email);
                    // this.setUserName(this.axios_get_res.data.email);

                    //this.test_token = atob(tmp);
                    ret = btoa(tmp);
                    //alert(user_id);
                    console.log(tmp);
                    console.log(ret);
                    //alert(ret);
                    //this.login_state = !this.login_state;
                    this.setLoginState(true);
                    this.dialog = false;
                } else {
                    this.dialog = false;
                }
            },
            // ログイン画面(ダイアログ):「新規登録」ボタン押下時の処理
            registerHash() {
                if (this.$refs.form.validate()) {
                    axios.post('http://localhost:8000/api/user/hash/', {'email': this.credentials.email}).then(res => {
                        // 確認コード入力画面(ダイアログ)を開く
                        if (res.status.toString() === '200') {
                            this.dialog_hash = true;
                        }
                    }).catch(e => {
                        alert("エラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                        console.log(e.message);
                    });
                } else {
                    this.dialog = false;
                }
            },
            // 確認コード入力画面(ダイアログ):「確認」ボタン押下時の処理
            registerUser() {
                const requestBody = {
                    'email': this.credentials.email,
                    'password': this.credentials.password,
                    'hash_cd': this.credentials.hash_cd,
                    'invite_email': this.invite_email,
                };
                if (this.$refs.form.validate()) {
                    axios.post('http://localhost:8000/api/user/', requestBody).then(res => {
                        // JWTログイン後にユーザー情報を取得する
                        if (res.status.toString() === '200') {
                            this.login();
                        }
                    }).catch(e => {
                        alert("エラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                        console.log(e.message);
                    });
                    this.dialog = false;
                    this.dialog_hash = false;
                } else {
                    this.dialog = false;
                }
            },
            logout() {
                this.setUserName("");
                this.setUserId("");
                this.setToken("");
                this.setLoginState(false);
                this.dialog_logout = false;
                this.$router.push('/');

            },
            setLoginState: function (state) {
                this.$store.commit('setLoginState', state)
            },
            setUserName: function (user_name) {
                this.$store.commit('setUserName', user_name)
            },
            setUserId: function (userId) {
                this.$store.commit('setUserId', userId)
            },
            setToken: function (token) {
                this.$store.commit('setToken', token)
            },
            setProfileUserId: function (profileUserId) {
                this.$store.commit('setProfileUserId', profileUserId)
            },
            // 情報を発信する画面(ダイアログ):「発信」ボタン押下時の処理
            /*
            createDisclosure() {
                const requestBody = {
                    'email': this.credentials.email,
                    'password': this.credentials.password,
                    'hash_cd': this.credentials.hash_cd,
                    'invite_email': this.invite_email,
                }
                if (this.$refs.form.validate()) {
                    axios.post('http://localhost:8000/api/disclosure/', requestBody).then(res => {
                        // JWTログイン後にユーザー情報を取得する
                        if(res.status.toString() === '200') {
                            this.login();
                        }
                    }).catch(e => {
                        alert("エラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                        console.log(e.message);
                    });
                    this.dialog = false;
                    this.dialog_hash = false;
                } else {
                    this.dialog = false;
                }
            }
            */
            sendJobInfo: function () {
                const requestBody = {
                    'title': this.send_info.title,
                    'description': this.send_info.body,
                    'kind': '0',
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
                        alert("大成功");
                    }
                }).catch(e => {
                    alert("エラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                    console.log(e.message);
                });

                this.dialog_trans_info = false;
            },
            toProfile(){
                this.setProfileUserId(this.userId);
                this.$router.push('/profile');
            },
        },
        computed: {
            loginState: function () {
                return this.$store.state.loginState
            },
            userName: function () {
                return this.$store.state.userName
            },
            userId: function () {
                return this.$store.state.userId
            },
            token: function () {
                return this.$store.state.token
            },
            profileUserId: function () {
                return this.$store.state.profileUserId
            },

        }
    }
</script>

<style scoped>

</style>