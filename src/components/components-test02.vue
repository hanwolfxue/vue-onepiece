<template>
<div>
  {{propA}} {{propB}} {{propC}}
  第二个组件
  <slot text="hello from child"></slot>
  <ul>
  <slot name="item"
    v-for="item in items"
    :text="item">
    <!-- fallback content here -->
  </slot>
</ul>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'componentsTest2',
  data() {
    return {
      items:[1,2,3,4]
    }
  },
  props: {
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String
    }
  },
  computed: {},
  components: {},
  methods: {},
  mounted() {
    console.log('propB的类型', typeof this.propB);
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
