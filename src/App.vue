<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
//routerで設定したタイトルとめたタグを反映する
export default {
  methods: {
    createTitleDesc: function (routeInstance) {
      // タイトルを設定
      if (routeInstance.meta.title) {
        var setTitle = routeInstance.meta.title;
        document.title = setTitle;
      } else {
        document.title = 'title is not set'
      }

      // メタタグdescription設定
      if (routeInstance.meta.desc) {
        var setDesc = routeInstance.meta.desc;
        document.querySelector("meta[name='description']").setAttribute('content', setDesc)
      } else {
        document.querySelector("meta[name='description']").setAttribute('content', 'description is not set')
      }
    }
  },
  mounted: function () {
    var routeInstance = this.$route;
    this.createTitleDesc(routeInstance);
  },
  watch: {
    '$route'(routeInstance) {
      this.createTitleDesc(routeInstance);
    }
  }
}
</script>