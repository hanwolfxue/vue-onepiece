<template>
  <div>
    第一个组件
    <input v-model="data1">
    <!--<input v-model="data2">-->
    {{data2}}
    <!-- <div v-for="item in data3">
      {{item}}
      <input v-model="item.name" @input="change">
    </div>
    <input v-model="data4.name" @input="change2"> -->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'componentsTest1',
    data() {
      return {
        data1: this.string1
      }
    },
    props: ['string1', 'string2', 'arr1', 'obj'],
    computed: {
      data2(){
      },
      data3(){
        return this.arr1;
      },
      data4(){
        return this.obj;
      }
    },
    components: {},
    methods: {
      change(){
        console.log('hahaahahha', JSON.stringify(this.arr1));
      },
      change2(){
//        console.log('对象', JSON.stringify(this.obj));
        this.$emit('changeObj');
      }
    },
    mounted(){
      console.log('数组is', JSON.stringify(this.arr1));
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
