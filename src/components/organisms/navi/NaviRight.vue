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
                お知らせ
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-subtitle class="ma-0 pa-0">
                  <v-row class="ma-0">
                    <v-col cols="3">2021/10/1</v-col>
                    <v-col cols="9">登録ユーザー数：60人突破（予定）</v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-subtitle class="ma-0 pa-0">
                  <v-row class="ma-0">
                    <v-col cols="3">2021/9/1</v-col>
                    <v-col cols="9">登録ユーザー数：30人突破（予定）</v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-subtitle class="ma-0 pa-0">
                  <v-row class="ma-0">
                    <v-col cols="3">2021/8/1</v-col>
                    <v-col cols="9">登録ユーザー数：10人突破（予定）</v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-subtitle class="ma-0 pa-0">
                  <v-row class="ma-0">
                    <v-col cols="3">2021/5/1</v-col>
                    <v-col cols="9">正式サービス提供開始（予定）</v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-subtitle class="ma-0 pa-0">
                  <v-row class="ma-0">
                    <v-col cols="3">2021/4/17</v-col>
                    <v-col cols="9">β版（PC&SP版）テスト環境（予定）</v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content class="py-0">
                <v-list-item-subtitle class="ma-0 pa-0">
                  <v-row class="ma-0">
                    <v-col cols="3">2021/3/20</v-col>
                    <v-col cols="9">α版（PC版のみ）テスト環境（予定）</v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
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
            class="caption mb-1"
        >
          <v-col
              cols="1"
          >
          </v-col>
          <v-col
              cols="3"
          >
            <a class="green--text">利用規約</a>
          </v-col>
          <v-col
              cols="5"
          >
            <a class="green--text">プライバシーポリシー</a>
          </v-col>
          <v-col
              cols="3"
          >
            <a class="green--text">広告情報</a>
          </v-col>
        </v-row>
        <v-row
            no-gutters
            class="caption"

        >
          <v-col
              cols="1"
          >
          </v-col>
          <v-col
              cols="3"
          >
            <a href="https://allgoal.co.jp" class="green--text" style="text-decoration: none;">運営会社情報</a>
          </v-col>
          <v-col
              cols="8"
          >
            <a class="green--text">お問い合わせ</a>
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