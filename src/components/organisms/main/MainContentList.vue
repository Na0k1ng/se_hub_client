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
              <!--              <v-icon class="grey lighten-1">-->
              <!--                mdi-account-->
              <!--              </v-icon>-->
            </v-list-item-avatar>
            <v-list-item-content @click="displayContent(content)">
              <v-list-item-title>
                {{ content.user__name }}<span v-if="content.user__group__name">@{{ content.user__group__name }}</span>
              </v-list-item-title>
              <p class="mt-2">{{ content.title }}</p>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-divider/>
    <v-dialog
        v-model="dialog"
        max-width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="headline">
          {{ this.proposition.title }}
        </v-card-title>
        <v-row class="ma-0 pa-0">
          <v-avatar>
            <v-img :src="'http://127.0.0.1:8000/media/' + this.proposition.user__img"></v-img>
            <!--              <v-icon class="grey lighten-1">-->
            <!--                mdi-account-->
            <!--              </v-icon>-->
          </v-avatar>
          <p>{{ this.proposition.user__name }}</p>
        </v-row>
        <v-row>
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
                @click="deleteContent()"
            >
              この投稿を削除する
            </v-btn>
            <v-btn
                v-if="(this.proposition.user__id !== this.userId)"
                color="green accent-4"
                class="white--text"
                @click="dialog"
            >
              この投稿にメッセージを送信する
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
      dialog: false
    }
  },
  mounted: function () {
    console.log('mounted')
    this.getContentsList();
  },
  methods: {
    getContentsList() {
      // let contentsList = [
      //     {
      //         icon: "",
      //         title: "タイトル1",
      //         subtitle: "c1XXXXXXXXXXXXXX",
      //         text: "ct1XXXXXXXXXXXXXX"
      //     },
      //     {
      //         icon: "",
      //         title: "タイトル2",
      //         subtitle: "c2XXXXXXXXXXXXX",
      //         text: "ct2XXXXXXXXXXXXX"
      //     },
      //     {
      //         icon: "",
      //         title: "タイトル3",
      //         subtitle: "c3XXXXXXXXXXXXX",
      //         text: "ct3XXXXXXXXXXXXX"
      //     }
      // ];
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
      //this.contentsList = contentsList;
    },
    displayContent(content) {
      this.proposition = content;
      this.dialog = true;
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
      if(this.$router.currentRoute.path == "/profile") {
          this.$router.go({path: this.$router.currentRoute.path, force: true});
      } else {
        this.$router.push('/profile');
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