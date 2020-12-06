<template>
  <div class="explore">
    <v-app>
      <ExplorePage/>
    </v-app>
  </div>
</template>

<script>
import ExplorePage from '@/components/pages/ExplorePage.vue'

export default {
  name: 'Explore',
  components: {
    ExplorePage,
  }
}
</script>