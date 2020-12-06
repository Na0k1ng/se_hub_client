<template>
  <div class="home">
    <v-app>
      <HomePage/>
    </v-app>
  </div>
</template>

<script>
import HomePage from '@/components/pages/HomePage.vue'

export default {
  name: 'Home',
  components: {
    HomePage,
  }
}
</script>
