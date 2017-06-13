<template>
  <div>
    <div>指令</div>
    <input v-focus>
    <div v-demo="{ color: 'white', text: 'hello!' }"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'directive',
    data() {
      return {
        message: 'message1'
      }
    },
    components: {},
    computed: {},
    mounted() {
        console.log('执行');
      let cachedScript = {};
      function loadScript(src, callback, component, nocache) {
        let script = cachedScript[src];
        console.log('script is',script);
        if (nocache && script) {
          script.parentNode.removeChild(script);
          script = null;
        }
        if (script) {
          callback && callback();
          return new Promise((resolve) => resolve());
        } else {
          script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          return new Promise((resolve, reject) => {
            script.addEventListener('load', function () {
              cachedScript[src] = script;
              callback && callback();
              resolve();
//            if (!isUnMounted(component)) {
//              callback && callback();
//              resolve();
//            }
            }, false);
            script.addEventListener('error', function () {
              script.parentNode.removeChild(script);
              reject();
            });
          })
        }
      }
      loadScript('//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9552');
    },
    methods: {},
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        },
      },
      demo: {
        bind: function (el, binding, vnode) {    //指令第一次绑定到元素上，只执行一次
          var s = JSON.stringify;
          el.innerHTML =
            `name: ${s(binding.name)}<br>
value: ${s(binding.value)}<br>
expression: ${s(binding.expression)}<br>
argument: ${s(binding.arg)}<br>
modifiers: ${s(binding.modifiers)}<br>
vnode keys: ${Object.keys(vnode).join(', ')}<br>`

        },
        inserted: function () {    //插入元素时

        },
        update(){    //被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新

        },
        componentUpdate(){    //被绑定元素所在模板完成一次更新周期时调用

        },
        unbind(){   //只调用一次， 指令与元素解绑时调用

        }
      }
    }
  }
</script>
