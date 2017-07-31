<template>
  <div id="app">
    <div style="height:100%">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="less" scoped>
#app{
  height:100%;
}
.fade-enter-active , .fade-leave-active{
  transition:opacity .5s;
}
.fade-enter , .fade-leave-to{
  opacity: 0;
}
</style>
