<template>
  <div class="mainrecommendationtitle">
    <v-row no-gutters class="ma-0 pa-0">
      <v-col
              cols="12"
              sm="12"
              class="pa-0 ma-0"
      >
        <v-sheet class="pa-0" tile>
          <v-row>
            <v-col>
              <p class="ma-0 px-6 py-2 body-2">BP承認待ち</p>
            </v-col>
            <v-divider
                    class="mx-4"
                    vertical
            ></v-divider>
            <v-col>
              <p class="ma-0 px-6 py-2 body-2">BPリクエスト</p>
            </v-col>
            <v-divider
                    class="mx-4"
                    vertical
            ></v-divider>
            <v-col>
              <p class="ma-0 px-6 py-2 body-2">BP</p>
            </v-col>
          </v-row>

        </v-sheet>
      </v-col>
    </v-row>
    <v-divider/>
  </div>
</template>

<script>
    export default {
        name: "MainBpMenuBar"
    }
</script>

<style scoped>

</style>