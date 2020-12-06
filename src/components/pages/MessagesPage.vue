<template>
  <div class="messagespage">
    <NaviLeft/>
    <NaviRight/>
    <v-main>
      <v-container
        class="ma-0 pa-0"
      >
        <MainTitle :mainTitleName="mainTitleName"/>
        <MainExplore :tagList="tagList"/>
        <MainMessageList/>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NaviLeft from '@/components/organisms/navi/NaviLeft.vue'
import NaviRight from '@/components/organisms/navi/NaviRight.vue'

import MainTitle from '@/components/organisms/main/MainTitle.vue'
import MainExplore from '@/components/organisms/main/MainExplore.vue'
import MainMessageList from '@/components/organisms/main/MainMessageList.vue'

export default {
  name: "MessagesPage",
  components: {
    NaviLeft,
    NaviRight,
    MainTitle,
    MainExplore,
    MainMessageList
  },
  data () {
    return {
      mainTitleName: "メッセージ",
      tagList: [
        "BPのみ",
        "未読のみ",
      ]
    }
  }
}
</script>

<style scoped>

</style>