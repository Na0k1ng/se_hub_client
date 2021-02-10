<template>
  <v-navigation-drawer app :color="baseColor" permanent width="350">
    <v-sheet :color="baseColor" width="100%">
      <v-list class="pl-14" flat>
        <v-list-item-group v-if="loginState">
          <v-list-item @click="toProfile()">
            <v-list-item-avatar>
              <v-img v-if="img !== ''" :src="img"></v-img>
              <v-icon v-else large :color="iconColor">mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ userName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group v-else>
          <v-list-item @click.stop="dialog = true">
            <v-list-item-avatar>
              <v-icon large :color="iconColor">mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>ゲスト</v-list-item-title>
              <v-list-item-subtitle>ログインするにはクリック</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-divider></v-divider>
        <v-list-item v-if="loginState" to="/" @click="toHome" :active-class="naviFont">
          <v-list-item-icon>
            <v-icon large :color="naviItmColor.home">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ホーム {{ activeNaviItm }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/explore" :active-class="naviFont">
          <v-list-item-icon>
            <v-icon large :color="iconColor">mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>検索</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loginState" to="/bpManagement" :active-class="naviFont">
          <v-list-item-icon>
            <v-icon large :color="iconColor">mdi-bell-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>BP管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loginState" to="/messages" :active-class="naviFont">
          <v-list-item-icon>
            <v-icon large :color="iconColor">mdi-email-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>メッセージ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loginState" @click="toProfile()" to="/profile" :active-class="naviFont">
          <v-list-item-icon>
            <v-icon large :color="iconColor">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>プロフィール</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="selectedSettingsDialog = true">
          <v-list-item-icon>
            <v-icon large :color="iconColor">mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loginState" class="pt-4">
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
        <v-list-item v-if="loginState" class="pt-10 mt-10">
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
              v-model="selectedSettingsDialog"
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
                // style
                baseColor: 'grey lighten-3',
                iconColor: 'grey darken-1',
                selectedIconColor: 'green accent-4',
                naviFont: 'font-weight-bold green--text text--accent-4',
                naviItmColor: {
                    home: 'grey darken-1',
                    explore: 'grey darken-1',
                    bpManagement: 'grey darken-1',
                    messages: 'grey darken-1',
                    profile: 'grey darken-1'
                },
                // green accent-4


                activeNaviItm: 'test',

                // dialog flag
                dialog: false,
                dialog_hash: false,
                dialog_trans_info: false,
                selectedSettingsDialog: false,
                dialog_logout: false,

                // User Info
                userInfo: {
                    userId: '',
                    token: '',
                    name: '',
                    img: '',
                },
                img: '',
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
            // ログイン処理
            login: async function () {
                if (this.$refs.form.validate()) {
                    // 認証処理を同期呼び出し、その後ユーザ情報取得
                    await this.authenticate();
                    this.getUserInfo();
                    this.setLoginState(true);
                    this.dialog = false;
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
            getUserInfo: function () {
                axios.get('http://localhost:8000/api/user/' + this.userInfo.userId + '/').then(res => {
                    this.userInfo.name = res.data.name;
                    this.userInfo.img = res.data.img;
                    this.setUserName(this.userInfo.name);
                }).catch(e => {
                    console.log("error");
                    console.log(e.message);
                });
            },

            //     if (this.$refs.form.validate()) {
            //         const requestBody = {
            //             email: this.credentials.email,
            //             password: this.credentials.password
            //         };
            //         axios.post('http://localhost:8000/api/auth/', requestBody).then(res => {
            //             payload = res.data.token.split('.')[1];
            //             userId = JSON.parse(atob(payload)).user_id;
            //             token = res.data.token;
            //         }).catch(e => {
            //             alert("例外");
            //             alert(e.message);
            //         });
            //     }
            //
            //     let tmp = '';
            //     let payload = '';
            //     let ret = '';
            //     if (this.$refs.form.validate()) {
            //         const qs = require('qs');
            //         console.log(this.credentials);
            //         console.log(qs.stringify(this.credentials))
            //         axios
            //             .post('http://localhost:8000/api/auth/', qs.stringify(this.credentials))
            //             .then(res => {
            //                 payload = res.data.token.split('.')[1];
            //                 this.user_id = JSON.parse(atob(payload)).user_id;
            //                 this.test_token = this.user_id;
            //                 this.setUserId(this.test_token);
            //                 this.setToken(res.data.token);
            //                 tmp = res.data.token;
            //                 alert('http://localhost:8000/api/user/' + this.test_token + '/');
            //                 axios.get('http://localhost:8000/api/user/' + this.user_id + '/').then(res => {
            //                     this.setUserName(res.data.email);
            //                 }).catch(e => {
            //                     alert("例外");
            //                     alert(e.message);
            //                 });
            //             });
            //         //     .then(res => (this.axios_res = res))
            //         //     .catch(e => {
            //         //         this.test_token = e.data.detail[0];
            //         //         tmp = JSON.stringify(e.status);
            //         //         alert("例外1");
            //         //         alert(e.message);
            //         //     });
            //         // payload = this.axios_res.data.token.split('.')[1];
            //         // this.test_token = JSON.parse(atob(payload)).user_id;
            //         //
            //         // alert(this.axios_res.data.email);
            //         // axios
            //         //     .get('http://localhost:8000/api/user/' + this.test_token + '/')
            //         //     .then(res => (this.axios_get_res = res))
            //         //     .catch(e => {
            //         //         alert("例外2");
            //         //         alert(e.message);
            //         //     });
            //         //
            //         // alert(this.axios_get_res.data.email);
            //         // this.setUserName(this.axios_get_res.data.email);
            //
            //         //this.test_token = atob(tmp);
            //         ret = btoa(tmp);
            //         //alert(user_id);
            //         console.log(tmp);
            //         console.log(ret);
            //         //alert(ret);
            //         //this.login_state = !this.login_state;
            //         this.setLoginState(true);
            //         this.dialog = false;
            //     } else {
            //         this.dialog = false;
            //     }
            // },
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

                this.send_info.title = '';
                this.send_info.body = '';
                this.dialog_trans_info = false;
            },
            toProfile() {
                this.setProfileUserId(this.userId);
                // this.$router.push('/profile');
            },
            toHome() {
                this.naviItmColor.home = this.selectedIconColor;
                this.activeNaviItm = 'home';
                // this.$router.push('/');
            }
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