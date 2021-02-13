<template>
  <div>
    <v-row no-gutters class="ma-2 mb-0 pa-1 px-4 pb-0">
      <v-col>
        <v-text-field
                label="キーワード検索"
                prepend-inner-icon="mdi-magnify"
                v-model="searchString"
                @keyup.enter="getContentsList"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters class="ma-1 mb-3 mt-0 pa-1 pt-0 ">
      <v-col cols=1>
        <p class="ma-1">タグ：</p>
      </v-col>
      <v-col cols=10>
        <v-chip-group active-class="grey">
          <v-chip
                  class="mx-1 px-2"
                  v-for="(tag,index) in tagList"
                  :key="index"
                  @click="getSelectedTag(tag.id)"
          >
            {{ tag.title }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-divider/>
  </div>
</template>
<!--                  @click="getSelectedTag(tag.id)"-->
<script>
    import axios from 'axios';

    export default {
        name: "MainExplore",
        components: {},
        data() {
            return {
                tagList: [
                    {title: "案件情報", id: "1"},
                    {title: "人材情報", id: "2"},
                    {title: "会社情報", id: "3"},
                    {title: "技術情報", id: "4"},
                    {title: "その他", id: "5"}
                ],
                searchString: "",
                selectedTag: "0"
            }
        },
        methods: {
            getSelectedTag(tag) {
                if (this.selectedTag !== tag) {
                    this.selectedTag = tag;
                } else {
                    this.selectedTag = "0"
                }
                console.log(this.selectedTag)
            },
            getContentsList() {
                console.log(this.searchString);
                const requestBody = {
                    'user_id': this.userId,
                    'kind': this.selectedTag,
                    'count': '1',
                    'search_string': this.searchString
                };

                axios.post('http://localhost:8000/api/disclosure/list/', requestBody).then(res => {
                    if (res.status.toString() === '200') {
                        this.setContentsList(res.data);
                    }
                }).catch(e => {
                    console.log(e.message);
                });
            },
            setContentsList: function (contentsList) {
                this.$store.commit('setContentsList', contentsList)
            }
        },
        computed: {
            userId: function () {
                return this.$store.state.userId
            },
            contentsList: function () {
                return this.$store.state.contentsList
            }
        }
    }
</script>

<style scoped>

</style>