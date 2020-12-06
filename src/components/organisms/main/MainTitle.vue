<template>
  <div class="maintitle">
    <v-row no-gutters class="ma-0 pa-0">
      <v-col
        cols="12"
        sm="12"
        class="pa-1 ma-1"
      >
        <v-sheet class="pa-2" tile>
          <p class="ma-0 pa-0 font-weight-bold">{{mainTitleName}}</p>
        </v-sheet>
      </v-col>
    </v-row>
    <v-divider/>
  </div>
</template>

<script>
    export default {
        name: "MainTitle",
        props: ['mainTitleName'],
    }
</script>

<style scoped>

</style>