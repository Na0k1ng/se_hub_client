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
              rounded
      >
        <v-list-item
                v-if="login_state"
        >
          <v-list-item-icon>
            <v-icon
                    large
                    color="grey darken-1"
            >
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{user_name}}</v-list-item-title>
            <v-list-item-subtitle>{{test_token}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
                v-else
                link
                @click.stop="dialog = true"
        >
          <v-list-item-icon>
            <v-icon
                    large
                    color="grey darken-1"
            >
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ゲスト</v-list-item-title>
            <v-list-item-subtitle>ログインするにはクリック</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon
                    large
                    color="grey darken-1"
            >
              mdi-home
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ホーム</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon
                    large
                    color="grey darken-1"
            >
              mdi-bell-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>通知</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon
                    large
                    color="grey darken-1"
            >
              mdi-email-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>メッセージ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon
                    large
                    color="grey darken-1"
            >
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>プロフィール</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon
                    large
                    color="grey darken-1"
            >
              mdi-cog-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn
                  color="grey lighten-1"
                  rounded
                  height="60"
                  width="250"
          >
            <b>情報を発信する</b>
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
    </v-sheet>
  </v-navigation-drawer>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "NaviLeft",

        data() {
            return {
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
                user_name: "",
                login_state: false,
                dialog: false,
                showPassword: false,
                test_token: "",
                user_id: "",
                // add register
                dialog_hash: false,
                hash_cd: '',
                invite_email: '',
            }
        },

        methods: {
            login() {
                let tmp = '';
                let payload = '';
                let ret = '';
                if (this.$refs.form.validate()) {
                    const qs = require('qs');
                    axios.post('http://localhost:8000/api/auth/', qs.stringify(this.credentials)).then(res => {
                        payload = res.data.token.split('.')[1];
                        this.user_id = JSON.parse(atob(payload)).user_id;
                        this.test_token = this.user_id;
                        tmp = res.data.token;
                        alert('http://localhost:8000/api/user/' + this.test_token + '/');
                        axios.get('http://localhost:8000/api/user/' + this.user_id + '/').then(res => {
                            this.user_name = res.data[0].email;
                        }).catch(e => {
                            alert("例外");
                            alert(e.message);
                        });
                    }).catch(e => {
                        this.test_token = e.data.detail[0];
                        tmp = JSON.stringify(e.status);
                        alert("例外");
                        alert(e.message);

                    });


                    //this.test_token = atob(tmp);
                    ret = btoa(tmp);
                    //alert(user_id);
                    console.log(tmp);
                    console.log(ret);
                    //alert(ret);
                    this.login_state = !this.login_state;
                    this.dialog = false;
                } else {
                    this.dialog = false;
                }
            },
            // ログイン画面(ダイアログ):「新規登録」ボタン押下時の処理
            registerHash() {
                if (this.$refs.form.validate()) {
                    axios.post('http://localhost:8000/api/user/hash/', { 'email': this.credentials.email}).then(res => {
                        // 確認コード入力画面(ダイアログ)を開く
                        if(res.status.toString() === '200') {
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
                }
                if (this.$refs.form.validate()) {
                    axios.post('http://localhost:8000/api/user/', requestBody).then(res => {
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
        },
    }
</script>

<style scoped>

</style>