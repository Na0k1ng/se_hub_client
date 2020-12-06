<template>
  <div class="explorepage">
    <NaviLeft/>
    <NaviRight/>
    <v-main>
      <v-container
        class="ma-0 pa-0"
      >
        <MainExplore :tagList = "tagList"/>
        <MainRecommendation/>
        <MainDivider/>
        <MainContentList/>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NaviLeft from '@/components/organisms/navi/NaviLeft.vue'
import NaviRight from '@/components/organisms/navi/NaviRight.vue'

import MainExplore from '@/components/organisms/main/MainExplore.vue'
import MainRecommendation from '@/components/organisms/main/MainRecommendation.vue'
import MainDivider from '@/components/organisms/main/MainDivider.vue'
import MainContentList from '@/components/organisms/main/MainContentList.vue'

export default {
  name: "ExplorePage",
  components: {
    NaviLeft,
    NaviRight,
    MainExplore,
    MainRecommendation,
    MainDivider,
    MainContentList
  },
  data () {
    return {
      mainTitleName: "検索",
      tagList: [
        "案件情報",
        "人材情報",
        "会社情報",
        "技術情報",
        "その他"
      ]
    }
  }
}
</script>

<style scoped>

</style>