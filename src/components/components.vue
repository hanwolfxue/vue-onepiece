<template>
  <div>
    <div>组件</div>
    <components-first ref="first" :string1="string1" :string2="string2" :arr1="arr1" :obj="obj"
                      @changeObj="changeObj"></components-first>
    <!--<div v-for="item in arr1">-->
    <!--<input v-model="item.name">-->
    <!--</div>-->
    <input type="checkbox" id="one" class="one">
    <label for="one">One</label>
    <br>
    <!--<input type="radio" id="two" v-model="picked">-->
    <!--<label for="two">Two</label>-->
    <select id="two">
      <option></option>
    </select>
    <br>
    <span>Picked: {{ picked }}</span>
    <div style="height: 1px;background: red;width: 100%"></div>
    <!-- <components-second :propA="propA" :propB="propB" :propC="propC" v-on:click.native="doTheThing">
      <template scope="props">
        <span>hello from parent</span>
        <span>{{ props.text }}</span>
  </template>
      <template slot="item" scope="props">
  <li class="my-fancy-item">
    {{ props.text }}</li>
  </template>
      </components-second> -->
    <!-- <keep-alive>
    <component v-bind:is="currentView">
    </component>
  </keep-alive> -->
    <router-view name="templateString"></router-view>
    <button class="button button-glow button-border button-rounded button-primary" @click='changeComponent'>切换</button>
    <asyn-component></asyn-component>
    <asyn-component-two></asyn-component-two>
  </div>
</template>
<script>
  import Vue from 'vue'
  import componentsFirst from './components-test01.vue'
  import componentsSecond from './components-test02.vue'
  import asynComponent from './asynComponent.vue'
//  const search = Vue.component('asynComponet', function (resolve) {
//    require(['./asynComponent.vue'], resolve);
//  })
  export default {
    name: 'components',
    data() {
      return {
        string1: '旋涡鸣人',
        string2: '佐助',
        arr1: [{
          name: '路飞'
        }, {
          name: '女帝'
        }],
        obj: {
          name: '大树'
        },
        picked: true,
        propA: 100,
        propB: '火舞旋风',
        propC: '大王叫我来巡山',
        currentView: 'componentsFirst'
      }
    },
    components: {
      componentsFirst,
      componentsSecond,
      asynComponent,
//      asynComponent: search,
      asynComponentTwo: function (resolve) {
        require(['./asynComponent2.vue'], resolve);
      }
    },
    computed: {},
    mounted() {
      var vm = this;
      var a = $(document.querySelector('#one'));
      //      for (var i in a) {
      //        console.log('i is', i, a[i]);
      //      }
      console.log('单选框对象', a);
      var b = $(document.querySelector('#two'));
      //      for (var i in a) {
      //        console.log('i is', i, a[i]);
      //      }
      console.log('select对象', b);
      console.log('通过ref获取组件信息', vm.$refs.first);

    },
    methods: {
      changeObj() {
        console.log('对象', this.obj);
      },
      select() {
        console.log('单选框对象', document.querySelector('#one').value);
      },
      doTheThing() {
        alert(111);
      },
      changeComponent() {
        var vm = this;
        if (vm.currentView === 'componentsFirst') {
          vm.currentView = "componentsSecond";
        } else {
          vm.currentView = "componentsFirst";
        }
      }
    }
  }
</script>
