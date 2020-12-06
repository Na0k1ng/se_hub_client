<template>
  <div class="mainexplore">
    <MainExploreForm/>
    <MainExploreTag :tagList = "tagList" />
    <v-divider/>
  </div>
</template>

<script>
import MainExploreForm from '@/components/molecules/MainExploreForm.vue'
import MainExploreTag from '@/components/molecules/MainExploreTag.vue'

export default {
  name: "MainExplore",
  components: {
    MainExploreForm,
    MainExploreTag
  },
  props: ["tagList"],
  data () {
    return {
    }
  },
}
</script>

<style scoped>

</style>