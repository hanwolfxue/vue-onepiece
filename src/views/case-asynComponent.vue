<template>
  <div>
    <div>异步组件</div>
    <asyn-component></asyn-component>
    <div>render编译函数</div>
    <!--<render-component>-->
    <!--<div slot="header">我是头部</div>-->
    <!--<div>我是主体</div>-->
    <!--<div slot="footer">我是尾部</div>-->
    <!--</render-component>-->
    <render-component>
      <template scope="props">
        123
        <span>{{props.text}}</span>
        <span slot="name-of-slot">555</span>
      </template>
    </render-component>
    <anchored-heading :level="2">sdfsadf</anchored-heading>
    <js-native></js-native>
    <model-native v-model="msg" @input="text"></model-native>
    <my-component :level="3">上上之签</my-component>
  </div>
</template>
<script>
  import Vue from 'vue'
  import renderComponent from '../components/renderComponent'
  //  import asynComponent from './asynComponent.vue'
  //  const search = Vue.component('asynComponet', function (resolve) {
  //    require(['../components/asynComponent.vue'], resolve);
  //  })
  export default {
//    name: 'components',
    data() {
      return {
        msg: 'message'
      }
    },
    components: {
//      asynComponent: search,
      asynComponent: function (resolve) {
        require(['../components/asynComponent.vue'], resolve);
      },
      renderComponent
    },
    computed: {},
    mounted() {
      console.log('哈哈');
    },
    methods: {
      text(){
        console.log('外部的值', this.msg);
      }
    }
  }
</script>
