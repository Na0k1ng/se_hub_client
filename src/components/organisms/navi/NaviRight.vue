<template>
  <v-navigation-drawer
      app
      clipped
      right
      width="420"
      color="grey lighten-3"
    >
      <v-container>
        <v-card
          color="grey lighten-4"
        >
          <v-list>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  オススメ企業
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item-group
                    v-for="n in 5"
                    :key = "n"
            >
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon
                    class="grey lighten-1"
                  >
                    mdi-account
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>会社{{ n }}</v-list-item-title>
                  <v-list-item-subtitle>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    color="grey lighten-1"
                    rounded
                  >
                    BP申請
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-container>
      <v-sheet
        width="100%"
        color="grey lighten-3"
      >
        <v-container>
          <v-row
                  no-gutters
                  class = "caption"

          >
            <v-col
              cols="12"
              sm="1"
            >
            </v-col>
            <v-col
              cols="12"
              sm="2"
            >
              <a>利用規約</a>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <a>プライバシーポリシー</a>
            </v-col>
            <v-col
              cols="12"
              sm="5"
            >
              <a>広告情報</a>
            </v-col>
          </v-row>
          <v-row
                  no-gutters
                  class = "caption"

          >
            <v-col
              cols="12"
              sm="1"
            >
            </v-col>
            <v-col
              cols="12"
              sm="3"

            >
              <a>運営会社情報</a>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <a>お問い合わせ</a>
            </v-col>
          </v-row>

        </v-container>
      </v-sheet>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "NaviRight"
    }
</script>

<style scoped>

</style>