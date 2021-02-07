<template>
  <div class="main-profile">
    <v-row no-gutters class="ma-0 pa-0 mb-10">
      <v-sheet
              class="ma-0 pa-0"
              max-width="100%"
              tile
      >
        <v-img
                :src="userInfo.group__img"
                width="800"
                height="250"
                style="overflow: visible"
        >
          <v-avatar
                  class="profile ma-0 pa-0"
                  color="grey"
                  style="postion:absolute; left: 5%; top: 70%"
                  size=130
                  max-height="100%"
          >
            <v-img :src="userInfo.icon"></v-img>
          </v-avatar>
        </v-img>
      </v-sheet>
    </v-row>
    <v-row>
      <v-sheet
              class="ma-0 pa-0"
              max-width="100%"
              tile
      >
        <v-row>
          <v-col class="ma-2 pa-2" color="grey lighten-3" cols="4">
            <p class="ma-1 pa-2">{{userInfo.name}}</p>
          </v-col>
          <v-col class="ma-2 pa-2" color="grey lighten-3" cols="1" v-show="this.userId !== this.profileUserId">
            <v-avatar class="profile grey lighten-3" @click="dialog = true">
              <v-icon large color="grey darken-1 ma-0 pa-0">
                mdi-email-outline
              </v-icon>
            </v-avatar>
          </v-col>
          <v-col class="ma-2 pa-2" color="grey lighten-3" cols="1" v-show="this.userId !== this.profileUserId">
            <v-btn class="ma-1 pa-2"
                   color="grey lighten-1"
                   rounded
                   v-if="profileBp.bp_status === '0'"
                   @click="setBpInfo"
            >
              BP申請
            </v-btn>
            <v-btn class="ma-1 pa-2"
                   color="grey lighten-1"
                   rounded
                   v-else-if="profileBp.bp_status === '1'"
                   @click="deleteBpInfo"
            >
              BP解除
            </v-btn>
            <v-btn class="ma-1 pa-2"
                   color="grey lighten-1"
                   rounded
                   v-else-if="profileBp.bp_status === '2'"
                   @click="setBpInfo"
            >
              BP申請
            </v-btn>
            <v-btn class="ma-1 pa-2"
                   color="grey lighten-1"
                   rounded
                   v-else-if="profileBp.bp_status === '3'"
                   @click="deleteBpInfo"
            >
              BP解除
            </v-btn>
          </v-col>
          <v-col class="ma-2 pa-2" color="grey lighten-3" cols="3" v-show="this.userId === this.profileUserId">
            <v-btn class="ma-1 pa-2"
                   color="grey lighten-1"
                   rounded
                   @click="editDialog = true"
            >
              プロフィールを編集
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" color="grey lighten-3">
            <p class="ma-1 pa-2">URL: {{userInfo.url}}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" color="grey lighten-3">
            <p class="ma-1 pa-2">DEBUG グループID: {{userInfo.group__id}}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" color="grey lighten-3">
            <p class="ma-1 pa-2">DEBUG プロフィールユーザID: {{profileUserId}}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" color="grey lighten-3">
            <p class="ma-0 pa-2">{{userInfo.description}}</p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-row>
    <v-dialog
            v-model="dialog"
            max-width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="dialog = false">
            mdi-close-box-outline
          </v-icon>
          <p class="ma-0 pa-0 pl-2">メッセージ</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="タイトルを入力"
                  :counter="30"
                  :maxlength="30"
                  v-model="sendInfo.title"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-textarea
                  label="本文を入力"
                  outlined rows="20"
                  name="input-7-4"
                  :counter="300"
                  :maxlength="300"
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
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="sendMessage()">
            mdi-send-circle-outline
          </v-icon>
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
            mdi-close-box-outline
          </v-icon>
          <p class="ma-0 pa-0 pl-2">プロフィール編集</p>
          <v-spacer></v-spacer>
          <v-btn
                  color="grey lighten-1"
                  rounded
                  class="ma-2 pa-0"
                  @click="editGroupDialog = true"
          >
            グループ編集
          </v-btn>
          <v-btn
                  color="grey lighten-1"
                  rounded
                  class="ma-2 pa-0"
                  @click="sendProfileInfo()"
          >
            保存
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-row class="ma-0 pa-0 mb-16">
          <v-avatar
                  class="profile ma-0 pa-0"
                  color="grey"
                  size=130
                  max-height="100%"
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
          <v-text-field
                  label="自己紹介"
                  :counter="30"
                  :maxlength="30"
                  v-model="userInfo.description"
          ></v-text-field>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
            v-model="editGroupDialog"
            max-width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 pa-0">
          <v-icon large color="grey darken-1 ma-0 pa-0" @click="editGroupDialog = false">
            mdi-close-box-outline
          </v-icon>
          <p class="ma-0 pa-0 pl-2">グループプロフィール編集</p>
          <v-spacer></v-spacer>
          <v-btn
                  color="grey lighten-1"
                  rounded
                  class="ma-2 pa-0"
                  @click="sendGroupProfileInfo"
          >
            保存
          </v-btn>
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
                  v-model="userInfo.company"
          ></v-text-field>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-text-field
                  label="URL"
                  :counter="30"
                  :maxlength="30"
                  v-model="userInfo.url"
          ></v-text-field>
        </v-row>
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
                isEnter: false,
                files: [],
                form: {},
                backImgform: [],
                userInfo: {
                    id: "",
                    name: "",
                    email: "",
                    description: "",
                    icon: [],
                    group__id: "",
                    group__name: "",
                    group__description: "",
                    group__url: "",
                    group__img: "",

                    banner: "https://automaton-media.com/wp-content/uploads/2020/02/20200206-112749-header-696x392.jpg",
                    company: "",
                    url: "https://www.allgoal.co.jp/",
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
                        alert("ユーザ情報送信大成功");
                        this.getUserInfo();
                    }
                }).catch(e => {
                    alert("ユーザ情報送信失敗\nエラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
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
                        alert("ユーザ画像送信大成功");
                        this.getUserInfo();
                    }
                }).catch(e => {
                    alert("ユーザ画像送信失敗\nエラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                    console.log(e.message);
                });

            },
            getUserInfo() {
                axios.get('http://localhost:8000/api/user/' + this.profileUserId + '/').then(res => {
                    this.userInfo.id = res.data.id;
                    this.userInfo.name = res.data.name;
                    this.userInfo.email = res.data.email;
                    this.userInfo.description = res.data.description;
                    this.userInfo.icon = 'http://127.0.0.1:8000/media/' + res.data.img;
                    this.userInfo.group__id = res.data.group__id;
                    this.userInfo.group__name = res.data.group__name;
                    this.userInfo.group__description = res.data.group__description;
                    this.userInfo.group__url = res.data.group__url;
                    this.userInfo.group__img = 'http://127.0.0.1:8000/media/' + res.data.group__img;
                }).catch(e => {
                    alert("例外");
                    alert(e.message);
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
                        alert("グループ情報送信大成功");
                        this.getUserInfo();
                    }
                }).catch(e => {
                    alert("グループ情報送信失敗\nエラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                    console.log(e.message);
                });
            },
            sendGroupImg() {
                console.log(this.backImgform);
                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };

                let form = this.backImgform;

                axios.put('http://localhost:8000/api/group/img/' + this.userInfo.group__id + '/', form, reqHeader).then(res => {
                    // JWTログイン後にユーザー情報を取得する
                    if (res.status.toString() === '200') {
                        alert("グループ画像送信大成功");
                        this.getUserInfo();
                    }
                }).catch(e => {
                    alert("グループ画像送信失敗\nエラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
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
                        alert("正常系です。");
                        this.setProfileBp(res.data);
                    }
                }).catch(e => {
                    alert("異常系です。");
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
                        alert("正常系です。");
                        this.getBpInfo()
                    }
                }).catch(e => {
                    alert("異常系です。");
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
                        alert("正常系です。");
                        this.getBpInfo()
                    }
                }).catch(e => {
                    alert("異常系です。");
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
                        alert("正常系です。");
                        console.log(this.sendInfo.file);
                        if (this.sendInfo.file){
                          console.log('sendFile');
                          this.sendFile(res.data.message_id)
                        }
                    }
                }).catch(e => {
                    alert("異常系です。");
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

                // let form = new FormData();
                // const group_id = this.userInfo.group__id;
                //
                // files.forEach(file => {
                //     console.log(file);
                //     form.append('group_img', file, group_id + '.jpg');
                //     console.log(form);
                // });
                //
                // this.backImgform = form;
                // console.log(form);
                // console.log(this.backImgform);
                // for (let [key, value] of form.entries()) {
                //     console.log(key, value);
                // }

                const reauestBody ={
                    'file' : this.sendInfo.file
                };
                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };

                axios.put('http://localhost:8000/api/message/file/' + message_id + '/', reauestBody , reqHeader).then(res => {
                    if (res.status.toString() === '200') {
                        alert("正常系です。");
                    }
                }).catch(e => {
                    alert("異常系です。");
                    console.log(e.message);
                });
            },

        },
        mounted: function () {
            this.getUserInfo();
            this.getBpInfo();
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