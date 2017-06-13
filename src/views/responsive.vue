<template>
  <div>
    <div>响应式原理探究</div>
    {{someObject.test}}
    <input v-model="someObject.a" @input="change">
    {{someObject.a}}
    <div id="example">{{message}}</div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'responsive',
    data() {
      return {
        someObject: {
          test: '1234',
        },
        message: '123'
      }
    },
    components: {},
    computed: {},
    mounted() {
      var vm = this;
      vm.message = 'new message' // 更改数据
      console.log('异步加载测试', document.querySelector('#example').textContent === 'new message');
      vm.$nextTick(function () {
        console.log('下一刻异步加载测试', document.querySelector('#example').textContent === 'new message');
      })
//      vm.someObject.a = "2";
//      Object.assign(this.someObject, { a: 1, b: 2 })
      vm.$set(vm.someObject, 'a', 2);
//      vm.someObject = Object.assign({}, vm.someObject, {a: 1, b: 2})    //创建新对象


      var a = {};
      Object.defineProperty(a, "b", {
        value: 123,
        configurable: true,   //是否可以重复设置
        writable: true,   //是否只读，false为只读，true为可读写
        enumerable: true
      })
      console.log('a对象b属性', a.b);
      console.log('是否可循环', Object.keys(a));
//      Object.defineProperty(a, "b", {
//        value: 1234
//      })
      a.b = 1234;
      console.log('a对象b属性', a.b);
      var obj = {};
      var newValue = '3';
      Object.defineProperty(obj, 'test', {
        set: function (value) {
          newValue = value;
        },
        get: function (value) {
          return newValue;
        }
      })
      obj.test = 1;
      console.log('对象set和get', obj.test);
    },
    methods: {
      change(){
        var vm = this;
        console.log('input值', vm.someObject);
      }
    }
  }
</script>
