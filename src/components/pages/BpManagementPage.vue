<template>
  <div class="bpManagementPage">
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
    import MainBpList from '@/components/organisms/main/MainBpList.vue'
    import MainBpMenuBar from '@/components/organisms/main/MainBpMenuBar.vue'

    export default {
        name: "BpManagementPage",
        components: {
            NaviLeft,
            NaviRight,
            MainTitle,
            MainBpList,
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