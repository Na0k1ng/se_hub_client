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
                    label="ユーザ名"
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
                    text
                    @click="dialog = false"
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
                user_name: "SEくん",
                login_state: false,
                dialog: false,
                showPassword: false,
                test_token: "あああ",
                user_id: "あああ",
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
                        //          this.$session.start();
                        //          this.$session.set('token', res.data.token);
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
                        //alert(tmp);
                        //alert(payload);
                        //alert('http://localhost:8000/api/user/'+this.user_id+'/');
                        //alert("あらーと");
                        //alert(res);
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
            /*
            getLoginUser() {
                    alert('http://localhost:8000/api/user/'+this.test_token+'/');
                     axios.get('http://localhost:8000/api/user/'+this.user_id.toString()+'/').then(res => {
                         this.user_name=res.email;
                     }).catch(e => {
                        alert("例外");
                        alert(e.message);
                    });
            }
             */
        },
    }
</script>

<style scoped>

</style>