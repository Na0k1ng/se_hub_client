<template>
  <div>
    <v-row no-gutters class="ma-2 mb-0 pa-1 px-4 pb-0">
      <v-col>
        <v-text-field
            label="キーワード検索"
            color="green accent-4"
            prepend-inner-icon="mdi-magnify"
            v-model="searchString"
            @keyup.enter="getContentsList"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-3 px-8 py-0">
      <v-col cols=8>
        <v-switch
            v-model="bpFilter"
            color="green accent-4"
            inset
            :label="'BPの投稿のみ表示'"
        ></v-switch>
      </v-col>
      <v-col cols=4 style="text-align: right;">
        <v-btn
            v-if="!filterArea"
            color="grey"
            class="white--text mt-3"
            depressed
            rounded
            :ripple="false"
            @click="filterArea = true"
        >
          <v-icon
              color="white"
              class="mr-1"
          >
            mdi-select-search
          </v-icon>
          フィルター
        </v-btn>
        <v-btn
            v-if="filterArea"
            color="green accent-4"
            class="white--text mt-3"
            depressed
            rounded
            :ripple="false"
            @click="filterArea = false"
        >
          <v-icon
              color="white"
              class="mr-1"
          >
            mdi-select-search
          </v-icon>
          フィルター
        </v-btn>
      </v-col>
    </v-row>
    <v-divider v-if="filterArea"/>
    <v-row
        v-if="filterArea"
        no-gutters
        class="pt-1 px-8 py-0"
    >
      <v-col cols="3">
        <v-switch
            v-model="jobFilter"
            color="green accent-4"
            inset
            :label="'案件情報'"
        ></v-switch>
      </v-col>
      <v-col cols="3">
        <v-switch
            v-model="hrFilter"
            color="green accent-4"
            inset
            :label="'人材情報'"
        ></v-switch>
      </v-col>
      <v-col cols="3">
        <v-switch
            v-model="mtFilter"
            color="green accent-4"
            inset
            :label="'交流会'"
        ></v-switch>
      </v-col>
      <v-col cols="3">
        <v-switch
            v-model="etcFilter"
            color="green accent-4"
            inset
            :label="'その他'"
        ></v-switch>
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

      // 表示フラグ
      filterArea: false,

      // フィルター
      bpFilter: false,
      jobFilter: true,
      hrFilter: true,
      mtFilter: true,
      etcFilter: true,

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