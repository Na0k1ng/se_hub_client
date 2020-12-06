<template>
  <div class="mainprofile">
    <v-row no-gutters>
      <p>test</p>
      <p>{{ test }}</p>
    </v-row>
    <v-divider/>
  </div>
</template>

<script>
export default {
  name: "MainProfile",
  computed: {
    test: function() {
      return this.$store.state.test
    }
  }
}
</script>

<style scoped>

</style>