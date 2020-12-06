<template>
  <div class="mainrecommendation">
    <MainRecommendationTitle/>
    <v-divider/>
    <MainRecommendationList :recommendationList="recommendationList"/>
  </div>
</template>

<script>
import MainRecommendationTitle from '@/components/molecules/MainRecommendationTitle.vue'
import MainRecommendationList from '@/components/molecules/MainRecommendationList.vue'

export default {
  name: "MainRecommendation",
  components: {
    MainRecommendationTitle,
    MainRecommendationList,
  },
  data () {
    return {
      recommendationList: [
        {
            icon: "",
            title: "タイトル1",
            subtitle: "1XXXXXXXXXXXXXX",
            text: "t1XXXXXXXXXXXXXX"
        },
        {
            icon: "",
            title: "タイトル2",
            subtitle: "2XXXXXXXXXXXXX",
            text: "t2XXXXXXXXXXXXX"
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>