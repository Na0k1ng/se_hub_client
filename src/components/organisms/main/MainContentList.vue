<template>
  <div class="maincontentlist">
    <v-row no-gutters class="ma-0 pa-0">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
                v-for="content in contentsList"
                :key="content"
        >
          <v-list-item @click="displayContent(content)">
            <v-list-item-avatar>
              <v-img :src="'http://127.0.0.1:8000/media/' + content.user__img"></v-img>
              <!--              <v-icon class="grey lighten-1">-->
              <!--                mdi-account-->
              <!--              </v-icon>-->
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ content.user__name }}</v-list-item-title>
              <v-list-item-text class="mt-2">[ {{ content.title }} ]</v-list-item-text>
              <v-list-item-text>{{ content.description }}</v-list-item-text>
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
          案件情報：{{ this.content.title }}
        </v-card-title>
        <v-row class="ma-0 pa-0">
          <v-avatar>
            <v-img :src="'http://127.0.0.1:8000/media/' + this.content.user__img"></v-img>
            <!--              <v-icon class="grey lighten-1">-->
            <!--                mdi-account-->
            <!--              </v-icon>-->
          </v-avatar>
          <p>{{ this.content.user__name }}</p>
        </v-row>
        <v-row class="ma-0 pa-0">
          <p class="mt-2">タイトル： {{ this.content.title }} </p>
        </v-row>
        <v-row>
          <p class="mt-2">{{ this.content.description }}</p>
        </v-row>
        <v-card-actions>
          <v-btn
                  class="red"
                  @click="deleteContent()"
          >
            削除
          </v-btn>

          <v-spacer></v-spacer>
          <v-btn
                  class="info"
                  @click="dialog=false"
          >
            閉じる
          </v-btn>
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
                contentsList: [],
                content: {},
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
                        this.contentsList = res.data;
                    }
                }).catch(e => {
                    alert("異常系です。");
                    console.log(e.message);
                });
                //this.contentsList = contentsList;
            },
            displayContent(content) {
                this.content = content;
                this.dialog = true;
            },
            deleteContent() {
                const reqHeader = {
                    headers: {
                        Authorization: 'JWT' + ' ' + this.token,
                    },
                };
                axios.delete('http://localhost:8000/api/disclosure/'+ this.content.id +'/', reqHeader).then(res => {
                    // JWTログイン後にユーザー情報を取得する
                    if (res.status.toString() === '200') {
                        alert("大成功");
                    }
                }).catch(e => {
                    alert("エラーが発生しました。\nお手数をお掛け致しますが、最初からやり直してください。");
                    console.log(e.message);
                });

                this.dialog = false;

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