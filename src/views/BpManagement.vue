<template>
  <div class="bpManagement">
    <v-app>
      <BpManagementPage/>
    </v-app>
  </div>
</template>

<script>
    import BpManagementPage from '@/components/pages/BpManagementPage.vue'

    export default {
        name: 'BpManagement',
        components: {
            BpManagementPage,
        },
    }
</script>