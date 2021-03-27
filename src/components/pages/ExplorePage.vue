<template>
  <div class="explorepage">
    <NaviLeft/>
    <NaviRight/>
    <v-main>
      <SpNaviHeader/>
      <v-container class="ma-0 pa-0">
        <MainExplore/>
        <MainContentList/>
      </v-container>
      <SpNaviFooter/>
    </v-main>
  </div>
</template>

<script>
import SpNaviHeader from '@/components/organisms/navi/sp/SpNaviHeader'
import SpNaviFooter from '@/components/organisms/navi/sp/SpNaviFooter'
import NaviLeft from '@/components/organisms/navi/NaviLeft.vue'
import NaviRight from '@/components/organisms/navi/NaviRight.vue'

import MainExplore from '@/components/organisms/main/MainExplore.vue'
import MainContentList from '@/components/organisms/main/MainContentList.vue'

export default {
  name: "ExplorePage",
  components: {
    SpNaviHeader,
    SpNaviFooter,
    NaviLeft,
    NaviRight,
    MainExplore,
    MainContentList
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>