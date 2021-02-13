<template>
  <div class="messagespage">
    <NaviLeft/>
    <NaviRight/>
    <v-main>
      <v-container
        class="ma-0 pa-0"
      >
        <MainTitle :mainTitleName="mainTitleName"/>
        <MainMessageList/>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NaviLeft from '@/components/organisms/navi/NaviLeft.vue'
import NaviRight from '@/components/organisms/navi/NaviRight.vue'

import MainTitle from '@/components/organisms/main/MainTitle.vue'
import MainMessageList from '@/components/organisms/main/MainMessageList.vue'

export default {
  name: "MessagesPage",
  components: {
    NaviLeft,
    NaviRight,
    MainTitle,
    MainMessageList
  },
  data () {
    return {
      mainTitleName: "メッセージ",
    }
  }
}
</script>

<style scoped>

</style>