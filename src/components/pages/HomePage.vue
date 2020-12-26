<template>
  <div class="homepage">
    <NaviLeft/>
    <NaviRight/>
    <v-main>
      <v-container
              class="ma-0 pa-0"
      >
        <MainTitle :mainTitleName="mainTitleName"/>
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

    import MainTitle from '@/components/organisms/main/MainTitle.vue'
    import MainRecommendation from '@/components/organisms/main/MainRecommendation.vue'
    import MainDivider from '@/components/organisms/main/MainDivider.vue'
    import MainContentList from '@/components/organisms/main/MainContentList.vue'

    export default {
        name: "Home",
        components: {
            NaviLeft,
            NaviRight,
            MainTitle,
            MainRecommendation,
            MainDivider,
            MainContentList
        },
        data() {
            return {
                mainTitleName: "ホーム",
            }
        }
    }
</script>

<style scoped>

</style>