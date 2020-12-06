<template>
  <div class="profilepage">
    <NaviLeft/>
    <NaviRight/>
    <v-main>
      <v-container
        class="ma-0 pa-0"
      >
        <MainTitle :mainTitleName="mainTitleName"/>
        <MainProfile/>
        <MainDivider/>
        <MainDivider/>

        <MainContentList/>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NaviLeft from '@/components/organisms/navi/NaviLeft.vue'
import NaviRight from '@/components/organisms/navi/NaviRight.vue'

import MainTitle from '@/components/organisms/main/MainTitle.vue'
import MainProfile from '@/components/organisms/main/MainProfile.vue'
import MainDivider from '@/components/organisms/main/MainDivider.vue'
import MainContentList from '@/components/organisms/main/MainContentList.vue'

export default {
  name: "ProfilePage",
  components: {
    NaviLeft,
    NaviRight,
    MainTitle,
    MainProfile,
    MainDivider,
    MainContentList
  },
  data () {
    return {
      mainTitleName: "プロフィール",
    }
  }
}
</script>

<style scoped>

</style>