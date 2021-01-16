<template>
  <div class="maincontentlist">
    <v-row no-gutters class="ma-0 pa-0">
      <v-list width="100%" class="ma-0 pa-0">
        <v-list-item-group
                v-for="content in contentsList"
                :key="content"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="grey lighten-1">
                mdi-account
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ content.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ content.subtitle }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ content.text }}</v-list-item-subtitle>
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
        name: "MainContentList",
        data() {
            return {
                contentsList: []
            }
        },
        mounted: function () {
            console.log('mounted')
            this.getContentsList();
        },
        methods: {
            getContentsList() {
                let contentsList = [
                    {
                        icon: "",
                        title: "タイトル1",
                        subtitle: "c1XXXXXXXXXXXXXX",
                        text: "ct1XXXXXXXXXXXXXX"
                    },
                    {
                        icon: "",
                        title: "タイトル2",
                        subtitle: "c2XXXXXXXXXXXXX",
                        text: "ct2XXXXXXXXXXXXX"
                    },
                    {
                        icon: "",
                        title: "タイトル3",
                        subtitle: "c3XXXXXXXXXXXXX",
                        text: "ct3XXXXXXXXXXXXX"
                    }
                ];
                const requestBody = {
                    'user_id': this.userId,
                    'kind': '0',
                    'count': '1',
                };

                axios.post('http://localhost:8000/api/disclosure/lst/',requestBody ).then(res => {
                    if (res.status.toString() === '200') {
                        alert("正常系です。");
                    }
                }).catch(e => {
                    alert("異常系です。");
                    console.log(e.message);
                });
                this.contentsList = contentsList;
            }
        },
        computed: {
            userId: function () {
                return this.$store.state.userId
            },

        },
    }
</script>

<style scoped>

</style>