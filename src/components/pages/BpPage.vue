<template>
  <div class="bpPage">
    <NaviLeft/>
    <NaviRight/>
    <v-main>
      <v-container
          class="ma-0 pa-0"
      >
        <MainTitle :mainTitleName="mainTitleName"/>
        <MainBpMenuBar/>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NaviLeft from '@/components/organisms/navi/NaviLeft.vue'
import NaviRight from '@/components/organisms/navi/NaviRight.vue'

import MainTitle from '@/components/organisms/main/MainTitle.vue'
import MainBpMenuBar from '@/components/organisms/main/MainBpMenuBar.vue'

export default {
  name: "BpPage",
  components: {
    NaviLeft,
    NaviRight,
    MainTitle,
    MainBpMenuBar,

  },
  data() {
    return {
      mainTitleName: "BP管理",
    }
  }
}
</script>

<style scoped>

</style>