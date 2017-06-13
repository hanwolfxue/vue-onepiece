<template>
  <div>
    <div class="scale">11</div>
    <div style="font-size: 32px">11</div>
  </div>
</template>
<script>
  require('../assets/scss/screenAdaptation.scss')
  export default {
    data(){
      return {}
    },
    mounted(){
      console.log('屏幕dpr',window.devicePixelRatio);
    }
  }
</script>
