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
                  <v-list-item-title>BPリクエスト</v-list-item-title>
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
                v-for="n in bpList"
                :key="n"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="grey lighten-1">
                mdi-account
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ n.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-row no-gutters class="ma-0 pa-0" v-else-if="choice === 'applyingBp'">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
                v-for="n in applyingBpList"
                :key="n"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="grey lighten-1">
                mdi-account
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ n.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-row>
    <v-row no-gutters class="ma-0 pa-0" v-else>
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
                v-for="n in applicantBpList"
                :key="n"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="grey lighten-1">
                mdi-account
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ n.name }}</v-list-item-title>
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
                test: "変わってないよ",
            }
        },
        async beforeRouteEnter(to, from, next) {
            console.log('test1')
            await alert("ナビゲーションガードコンポーネント")
            next()
        },
        beforeRouteUpdate(to, from, next) {
            console.log('test2')
            alert('test');
            this.test = "変わったよ"
            next()
        },
        methods: {
            window: onload = function () {
                console.log('test3')
                alert('test');
                this.test = "変わったよ";
            },
            getBpList() {
                let bpList = [
                    {
                        icon: "",
                        name: "△△△△",
                    },
                    {
                        icon: "",
                        name: "△△△△",
                    },
                    {
                        icon: "",
                        name: "△△△△",
                    },
                ];

                axios.post('http://localhost:8000/api/user/' + this.userName + '/').then(res => {
                    if (res.status.toString() === '200') {
                        alert("正常系です。");
                    }
                }).catch(e => {
                    alert("異常系です。");
                    console.log(e.message);
                });
                this.bpList = bpList;
                this.choice = 'bp'
            },
            getApplyingBpList() {
                let applyingBpList = [
                    {
                        icon: "",
                        name: "〇〇〇〇",
                    },
                    {
                        icon: "",
                        name: "〇〇〇〇",
                    },
                    {
                        icon: "",
                        name: "〇〇〇〇",
                    },

                ];
                axios.post('http://localhost:8000/api/user/' + this.userName + '/').then(res => {
                    if (res.status.toString() === '200') {
                        alert("正常系です。");
                    }
                }).catch(e => {
                    alert("異常系です。");
                    console.log(e.message);
                });
                this.applyingBpList = applyingBpList;
                this.choice = 'applyingBp'
            },
            getApplicantBpList() {
                let applicantBpList = [
                    {
                        icon: "",
                        name: "××××",
                    },
                    {
                        icon: "",
                        name: "××××",
                    },
                    {
                        icon: "",
                        name: "××××",
                    },
                ];
                axios.post('http://localhost:8000/api/user/' + this.userName + '/').then(res => {
                    if (res.status.toString() === '200') {
                        alert("正常系です。");
                    }
                }).catch(e => {
                    alert("異常系です。");
                    console.log(e.message);
                });
                this.applicantBpList = applicantBpList;
                this.choice = 'applicantBp'
            }
        },
        computed: {
            userName: function () {
                return this.$store.state.userName
            },
        },
    }
</script>

<style scoped>

</style>