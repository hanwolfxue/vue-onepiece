<template>
  <div class="lineStyle">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'lineBasis',
    data() {
      return {}
    },
    props: {},
    computed: {},
    components: {},
    methods: {
    }
  }
</script>
<style scoped>
  .lineStyle {
    height: 44px;
    line-height: 44px;
    border-top: 1px solid #c0c0c0;
    border-bottom: 1px solid #c0c0c0;
  }
</style>

