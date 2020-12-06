<template>
  <div class="messages">
    <v-app>
      <MessagesPage/>
    </v-app>
  </div>
</template>

<script>
import MessagesPage from '@/components/pages/MessagesPage.vue'

export default {
  name: 'Messages',
  components: {
    MessagesPage,
  }
}
</script>