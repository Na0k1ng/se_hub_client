<template>
  <div class="bp">
    <v-app>
      <BpPage/>
    </v-app>
  </div>
</template>

<script>
    import BpPage from '@/components/pages/BpPage.vue'

    export default {
        name: 'Bp',
        components: {
            BpPage,
        },
    }
</script>