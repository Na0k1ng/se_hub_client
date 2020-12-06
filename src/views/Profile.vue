<template>
  <div class="profile">
    <v-app>
      <ProfilePage/>
    </v-app>
  </div>
</template>

<script>
import ProfilePage from '@/components/pages/ProfilePage.vue'

export default {
  name: 'Profile',
  components: {
    ProfilePage,
  }
}
</script>