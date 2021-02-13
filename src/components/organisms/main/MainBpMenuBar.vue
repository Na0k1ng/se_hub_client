<template>
  <div class="mainrecommendationtitle">
    <v-row no-gutters class="ma-0 pa-0">
      <v-col
              cols="12"
              sm="12"
              class="pa-0 ma-0"
      >
        <v-sheet class="pa-0 ma-0" tile>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0 ma-0 text-center">
              <v-list-item @click="getBpList()">
                <v-list-item-content>
                  <v-list-item-title>BP</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-0 ma-0 text-center">
              <v-list-item @click="getApplyingBpList()">
                <v-list-item-content>
                  <v-list-item-title>BP承認待ち</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-0 ma-0 text-center">
              <v-list-item @click="getApplicantBpList()">
                <v-list-item-content>
                  <v-list-item-title>BPリクエスト</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-divider/>
    <v-row no-gutters class="ma-0 pa-0" v-if="choice === 'bp'">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
                v-for="(n,index) in bpList"
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
                      color="grey lighten-1"
                      rounded
                      height="40"
                      width="100"
                      max-width="100"
              >
                BP解除
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
                      color="grey lighten-1"
                      rounded
                      height="40"
                      width="100"
                      max-width="100"
              >
                BP登録
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-row no-gutters class="ma-0 pa-0" v-else>
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
                v-for="(n,index) in applicantBpList"
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
                      color="grey lighten-1"
                      rounded
                      height="40"
                      width="100"
                      max-width="100"
              >
                BP申請解除
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
            getApplyingBpList() {
                // let applyingBpList = [
                //     {
                //         icon: "",
                //         name: "〇〇〇〇",
                //     },
                //     {
                //         icon: "",
                //         name: "〇〇〇〇",
                //     },
                //     {
                //         icon: "",
                //         name: "〇〇〇〇",
                //     },
                //
                // ];

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
                // this.applyingBpList = applyingBpList;
                this.choice = 'applyingBp'
            },
            getApplicantBpList() {
                // let applicantBpList = [
                //     {
                //         icon: "",
                //         name: "××××",
                //     },
                //     {
                //         icon: "",
                //         name: "××××",
                //     },
                //     {
                //         icon: "",
                //         name: "××××",
                //     },
                // ];

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
                // this.applicantBpList = applicantBpList;
                this.choice = 'applicantBp'
            },
            getBpList() {
                // let bpList = [
                //     {
                //         icon: "",
                //         name: "△△△△",
                //     },
                //     {
                //         icon: "",
                //         name: "△△△△",
                //     },
                //     {
                //         icon: "",
                //         name: "△△△△",
                //     },
                // ];

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
                // this.bpList = bpList;
                this.choice = 'bp'
            }
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