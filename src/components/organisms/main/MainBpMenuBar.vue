<template>
  <div>
    <v-row no-gutters class="ma-0 pa-0">
      <v-col
          cols="12"
          sm="12"
          class="pa-0 ma-0"
      >
        <v-sheet class="pa-0 ma-0" tile>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0 ma-0 text-center">
              <v-list-item @click="getUserList()" :ripple="false">
                <v-list-item-content>
                  <v-list-item-title>ユーザー</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-0 ma-0 text-center">
              <v-list-item @click="getApplicantBpList()" :ripple="false">
                <v-list-item-content>
                  <v-list-item-title>BPリクエスト</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-0 ma-0 text-center">
              <v-list-item @click="getApplyingBpList()" :ripple="false">
                <v-list-item-content>
                  <v-list-item-title>BP承認待ち</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-0 ma-0 text-center">
              <v-list-item @click="getBpList()" :ripple="false">
                <v-list-item-content>
                  <v-list-item-title>BP</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-divider/>
    <v-row no-gutters class="ma-0 pa-0" v-if="choice === 'user'">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
            v-for="(n,index) in userList"
            :key="index"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="grey lighten-1">
                mdi-account
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ n.user__name }}</v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-content>
              <v-btn
                  style="position: absolute; right: 32px;"
                  color="green accent-4"
                  class="white--text"
                  rounded
                  height="40"
                  width="180"
                  max-width="180"
                  @click="setBpInfo(n.user__id);"
              >
                BP申請をする
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-row no-gutters class="ma-0 pa-0" v-else-if="choice === 'bp'">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
            v-for="(n,index) in bpList"
            :key="index"
        >
          <v-list-item>
            <v-list-item-avatar @click="toProfile(n)">
              <v-img :src="'http://127.0.0.1:8000/media/' + n.user__img"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-weight: bold; font-size: 14px; opacity: 0.75;">
                {{ n.user__name }}<span v-if="n.user__group__name"
                                              style="color: darkslateblue;">:{{ n.user__group__name }}</span>
              </v-list-item-title>
              <!--
              <span v-if="(content.user__id!==userId)&(loginState)">
                <span style="position: absolute; bottom: 15px; right: 64px;"><v-icon
                    @click.stop="blockConfirmDialog=true; otherId=content.user__id;" style="opacity: 0.4;">mdi-account-off</v-icon></span>
                <span style="position: absolute; bottom: 16px; right: 32px;"><v-icon
                    @click.stop="alarmConfirmDialog=true; disclosureId=content.id;" style="opacity: 0.4;">mdi-alarm-light-off</v-icon></span>
                </span>
              -->
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-content>
              <v-btn
                  style="position: absolute; right: 32px;"
                  color="red"
                  class="white--text"
                  rounded
                  height="40"
                  width="180"
                  max-width="180"
              >
                BP関係を解消する
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-row no-gutters class="ma-0 pa-0" v-else-if="choice === 'applyingBp'">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
            v-for="(n,index) in applyingBpList"
            :key="index"
        >
          <v-list-item>
            <v-list-item-avatar @click="toProfile(n)">
              <v-img :src="'http://127.0.0.1:8000/media/' + n.user__img"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-weight: bold; font-size: 14px; opacity: 0.75;">
                {{ n.user__name }}<span v-if="n.user__group__name"
                                              style="color: darkslateblue;">:{{ n.user__group__name }}</span>
              </v-list-item-title>
              <!--
              <span v-if="(content.user__id!==userId)&(loginState)">
                <span style="position: absolute; bottom: 15px; right: 64px;"><v-icon
                    @click.stop="blockConfirmDialog=true; otherId=content.user__id;" style="opacity: 0.4;">mdi-account-off</v-icon></span>
                <span style="position: absolute; bottom: 16px; right: 32px;"><v-icon
                    @click.stop="alarmConfirmDialog=true; disclosureId=content.id;" style="opacity: 0.4;">mdi-alarm-light-off</v-icon></span>
                </span>
              -->
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-content>
              <v-btn
                  style="position: absolute; right: 32px;"
                  color="red"
                  class="white--text"
                  rounded
                  height="40"
                  width="180"
                  max-width="180"
                  @click="deleteBpInfo(n.user__id);"
              >
                BP申請を取り消す
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-row no-gutters class="ma-0 pa-0" v-else-if="choice === 'applicantBp'">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
            v-for="(n,index) in applicantBpList"
            :key="index"
        >
          <v-list-item>
            <v-list-item-avatar @click="toProfile(n)">
              <v-img :src="'http://127.0.0.1:8000/media/' + n.user__img"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-weight: bold; font-size: 14px; opacity: 0.75;">
                {{ n.user__name }}<span v-if="n.user__group__name"
                                              style="color: darkslateblue;">:{{ n.user__group__name }}</span>
              </v-list-item-title>
              <!--
              <span v-if="(content.user__id!==userId)&(loginState)">
                <span style="position: absolute; bottom: 15px; right: 64px;"><v-icon
                    @click.stop="blockConfirmDialog=true; otherId=content.user__id;" style="opacity: 0.4;">mdi-account-off</v-icon></span>
                <span style="position: absolute; bottom: 16px; right: 32px;"><v-icon
                    @click.stop="alarmConfirmDialog=true; disclosureId=content.id;" style="opacity: 0.4;">mdi-alarm-light-off</v-icon></span>
                </span>
              -->
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-content>
              <v-btn
                  style="position: absolute; right: 32px;"
                  color="green accent-4"
                  class="white--text"
                  rounded
                  height="40"
                  width="180"
                  max-width="180"
                  @click="setBpInfo(n.user__id);"
              >
                BP申請を承諾する
              </v-btn>
            </v-list-item-content>

          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-divider/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "MainBpMenuBar",
  data() {
    return {
      choice: "bp",
      userList: [],
      applyingBpList: [],
      applicantBpList: [],
      bpList: [],
    }
  },
  mounted: function () {
    console.log('mounted')
    this.getBpList();
  },
  methods: {
    getUserList: function () {
      const requestBody = {
        'bp_status': '0',
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.post('http://localhost:8000/api/bp/list/' + this.userId + '/', requestBody, reqHeader).then(res => {
        if (res.status.toString() === '200') {
          console.log(res.data);
          this.userList = res.data;
        }
      }).catch(e => {
        console.log(e.message);
      });
      this.choice = 'user'
    },
    getApplyingBpList() {
      const requestBody = {
        'bp_status': '1',
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.post('http://localhost:8000/api/bp/list/' + this.userId + '/', requestBody, reqHeader).then(res => {
        if (res.status.toString() === '200') {
          console.log(res.data);
          this.applyingBpList = res.data;
        }
      }).catch(e => {
        console.log(e.message);
      });
      this.choice = 'applyingBp'
    },
    getApplicantBpList() {
      const requestBody = {
        'bp_status': '2',
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.post('http://localhost:8000/api/bp/list/' + this.userId + '/', requestBody, reqHeader).then(res => {
        if (res.status.toString() === '200') {
          console.log(res.data);
          this.applicantBpList = res.data;
        }
      }).catch(e => {
        console.log(e.message);
      });
      this.choice = 'applicantBp'
    },
    getBpList() {
      const requestBody = {
        'bp_status': '3',
      };

      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.post('http://localhost:8000/api/bp/list/' + this.userId + '/', requestBody, reqHeader).then(res => {
        if (res.status.toString() === '200') {
          console.log(res.data);
          this.bpList = res.data;
        }
      }).catch(e => {
        console.log(e.message);
      });
      this.choice = 'bp'
    },
    setBpInfo: function (otherId) {
      const reqBody = {
        'user_id': this.userId,
        'other_id': otherId,
      };
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.post('http://localhost:8000/api/bp/', reqBody, reqHeader).then(res => {
        if (res.status.toString() === '200') {
          console.log('');
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    deleteBpInfo: function (otherId) {
      const reqHeader = {
        headers: {
          Authorization: 'JWT' + ' ' + this.token,
        },
      };

      axios.delete('http://localhost:8000/api/bp/' + this.userId + '/' + otherId + '/', reqHeader).then(res => {
        if (res.status.toString() === '200') {
          console.log('');
        }
      }).catch(e => {
        console.log(e.message);
      });
    },
    toProfile(targetUser) {
      this.setProfileUserId(targetUser.user__id);
      console.log(targetUser.user__id);
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
  },
  computed: {
    userId: function () {
      return this.$store.state.userId
    },
    token: function () {
      return this.$store.state.token
    },

  },
}
</script>

<style scoped>

</style>