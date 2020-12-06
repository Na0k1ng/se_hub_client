<template>
  <div class="mainexploretag">
    <v-row no-gutters class="ma-1 mb-3 mt-0 pa-1 pt-0 ">
      <p class="ma-1 px-2">タグ：</p>
      <v-chip
        link
        class="mx-1 px-2"
        v-for="n in tagList"
        :key = "n"
      >
        {{ n }}
      </v-chip>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "MainExploreTag",
  props: ["tagList"]
}
</script>

<style scoped>

</style>