<template>
  <div class="transformOrigin">
    <h2>视距</h2>
    <div class="wrapper w2">
      <div class="cube">
        <div class="side front">1</div>
        <div class="side back">2</div>
        <div class="side right">3</div>
        <div class="side left">4</div>
        <div class="side top">5</div>
        <div class="side bottom">6</div>
      </div>
    </div>
    <div class="wrapper w1">
      <div class="cube">
        <div class="side front">1</div>
        <div class="side back">2</div>
        <div class="side right">3</div>
        <div class="side left">4</div>
        <div class="side top">5</div>
        <div class="side bottom">6</div>
      </div>
    </div>
  </div>
</template>
<script>
  require('../assets/scss/perspective.scss')
  export default {
    data(){
      return {}
    }
  }
</script>
