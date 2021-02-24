<template>
  <div class="maincontentlist">
    <v-row no-gutters class="ma-0 pa-0">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
            v-for="(content,index) in contentsList"
            :key="index"
        >
          <v-list-item>
            <v-list-item-avatar @click="toProfile(content)">
              <v-img :src="'http://127.0.0.1:8000/media/' + content.user__img"></v-img>
            </v-list-item-avatar>
            <v-list-item-content @click="displayContent(content)">
              <v-list-item-title style="font-weight: bold; font-size: 14px; opacity: 0.75;">
                {{ content.user__name }}<span v-if="content.user__group__name"
                                              style="color: darkslateblue;">:{{ content.user__group__name }}</span>
                <span style="position: absolute; right: 32px;">{{ parseTime(content.insert_datetime) }}</span>
              </v-list-item-title>
              <p class="ma-0 py-2" style="font-weight: bold;">{{ content.title }}</p>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-divider/>
    <v-dialog
        v-model="dialog"
        max-width="700"
    >
      <v-card class="pa-10">
        <v-card-title class="headline ma-0 px-0" style="font-size: 22px !important;">
          {{ this.proposition.title }}
        </v-card-title>
        <v-row class="my-4 mx-0 pa-0">
          <v-avatar>
            <v-img :src="'http://127.0.0.1:8000/media/' + this.proposition.user__img"></v-img>
          </v-avatar>
          <p class="my-0 ml-2" style="font-weight: bold; opacity: 0.75; line-height: 48px;">
            {{ this.proposition.user__name }}
            <span v-if="this.proposition.user__group__name" style="color: darkslateblue;">
              :{{ this.proposition.user__group__name }}
            </span>
            <span style="position: absolute; right: 64px;">
              {{ parseTime(this.proposition.insert_datetime) }}
            </span>
          </p>
        </v-row>
        <v-row class="px-8 mb-4">
          <p class="mt-2" style="white-space: pre-line; word-wrap: break-word;">
            {{ this.proposition.description }}
          </p>
        </v-row>
        <v-card-actions>
          <v-col style="text-align: center;">
            <v-btn
                v-if="(this.proposition.user__id === this.userId)"
                color="red"
                class="white--text"
                @click="deleteConfirmDialog=true"
            >
              この投稿を削除する
            </v-btn>
            <v-btn
                v-if="(this.loginState & this.proposition.user__id !== this.userId)"
                color="green accent-4"
                class="white--text"
                @click="dialog"
            >
              この投稿にメッセージを送信する
            </v-btn>
          </v-col>
        </v-card-actions>
        <v-card-text
            v-if="(!this.loginState)"
            style="text-align: center;"
        >
          この投稿にメッセージを送るには、<br>
          ログインする必要があります。
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog

        v-model="deleteConfirmDialog"
        max-width="420"
    >
      <v-card class="px-10 py-6">
        <v-card-text class="px-6 pt-10 pb-6" style="font-weight: bold; text-align: center;">
          本当に削除しますか？
        </v-card-text>
        <v-card-actions style="text-align: center;">
          <v-col>
            <v-btn
                color="red"
                class="white--text"
                @click="deleteContent(); deleteConfirmDialog=false;"
            >
              削除する
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
                color="grey"
                class="white--text"
                @click="deleteConfirmDialog=false"
            >
              キャンセル
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "MainContentList",
  data() {
    return {
      contentsList_: [],
      proposition: {},
      dialog: false,
      deleteConfirmDialog: false,
    }
  },
  mounted: function () {
    console.log('mounted')
    this.getContentsList();
  },
  methods: {
    getContentsList() {
      const requestBody = {
        'user_id': this.userId,
        'kind': '0',
        'count': '1',
      };

      axios.post('http://localhost:8000/api/disclosure/list/', requestBody).then(res => {
        if (res.status.toString() === '200') {
          this.setContentsList(res.data);
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    displayContent(content) {
      this.proposition = content;
      this.dialog = true;
    },
    parseTime(insert_datetime) {
      let ts = Date.parse(insert_datetime);
      const dt = new Date(ts);
      const year = dt.getFullYear();
      const month = dt.getMonth() + 1;
      const days = dt.getDate();
      return year + "/" + month + "/" + days;
    },
    deleteContent() {
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };
      axios.delete('http://localhost:8000/api/disclosure/' + this.proposition.id + '/', reqHeader).then(res => {
        // JWTログイン後にユーザー情報を取得する
        if (res.status.toString() === '200') {
          console.log(res)
        }
      }).catch(e => {
        console.log(e.message);
      });

      this.dialog = false;

    },
    toProfile(content) {
      this.proposition = content;
      this.setProfileUserId(this.proposition.user__id);
      console.log(this.proposition.user__id);
      console.log(this.profileUserId);
      if (this.$router.currentRoute.path === "/profile") {
        this.$router.go({path: this.$router.currentRoute.path, force: true});
      } else {
        this.$router.push('/profile').catch(err => {
          console.log(err)
        });
      }
    },
    setProfileUserId: function (profileUserId) {
      this.$store.commit('setProfileUserId', profileUserId)
    },
    setContentsList: function (contentsList) {
      this.$store.commit('setContentsList', contentsList)
    }
  },
  computed: {
    loginState: function () {
      return this.$store.state.loginState;
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
    contentsList: function () {
      return this.$store.state.contentsList
    },

  },
}
</script>

<style scoped>

</style>