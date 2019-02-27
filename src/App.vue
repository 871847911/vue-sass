<template>
  <div id="app">
    <login></login>
    <router-view></router-view>
  </div>
</template>
<script>
import login from '@/components/Login'
export default {
  name: 'App',
  components:{
    login
  }
}
</script>
