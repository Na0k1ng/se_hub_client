<template>
  <div class="explorepage">
    <NaviLeft/>
    <NaviRight/>
    <v-main>
      <v-container
        class="ma-0 pa-0"
      >
        <MainExplore/>
        <MainContentList/>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NaviLeft from '@/components/organisms/navi/NaviLeft.vue'
import NaviRight from '@/components/organisms/navi/NaviRight.vue'

import MainExplore from '@/components/organisms/main/MainExplore.vue'
import MainContentList from '@/components/organisms/main/MainContentList.vue'

export default {
  name: "ExplorePage",
  components: {
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