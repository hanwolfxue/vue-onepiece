<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
      <div v-for="item in items" style="margin: 5px 0;">
        <a style="color: white" href="javascript:void(0);" class="button button-block button-rounded button-primary button-large" @click="pushPage(item)">{{item.name}}</a>
      </div>

    <div style="width: 900px;background: blue;height: 10px">123</div>
    <div class="scrollTopTest" style="width: 100px;height: 100px;background: brown" @click="scrollTopTest"></div>
    <keep-alive>
      <router-link :to="{ name: 'components'}">跳到组件</router-link>
    </keep-alive>
    <router-link to="/about">/about</router-link>
    <div class="port">12345</div>
    <ul class="cloneUl">
      <li>item 1</li><li>item 2</li><li>item 3</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        items: [{
          name: 'v-for',
          path: 'vFor'
        },
          {
            name: 'vue的事件处理器',
            path: 'vueEvent'
          },
          {
            name: '原型继承',
            path: 'inheritance0'
          },
          {
            name: '继承',
            path: 'inheritance'
          },
          {
            name: '模板字符串',
            path: 'templateString'
          },
          {
            name: '组件',
            path: 'components'
          },
          {
            name: '递归菜单',
            path: 'recursiveComponent'
          },
          {
            name: '异步组件',
            path: 'caseAsynComponent'
          },
          {
            name: '响应式原理',
            path: 'responsive'
          },
          {
            name: '指令',
            path: 'directive'
          },
          {
            name: '过渡效果',
            path: 'transition'
          },
          {
            name: '变形原点',
            path: 'transformOrigin'
          },
          {
            name: '视距',
            path: 'perspective'
          },
          {
            name: '屏幕适配',
            path: 'screenAdaptation'
          },
          {
            name: '数组',
            path: 'array'
          },
          {
            name: '日期',
            path: 'date'
          },
          {
            name: 'js动画',
            path: 'jsAnimation'
          },
          {
            name: '对象探究',
            path: 'objectExplore'
          },
          {
            name: '热区',
            path: 'hotZone'
          },
          {
            name: '节点层次',
            path: 'nodeLevel'
          },
          {
            name: 'dom扩展',
            path: 'domExpand'
          },
          {
            name: 'event',
            path: 'event'
          }
        ]
      }
    },
    mounted: function () {
      var vm = this;
      var html = document.documentElement;
      console.log(html === document.childNodes[1]);
      console.log(html === document.lastChild);
    },
    methods: {
      pushPage(item) {
        var vm = this;
        console.log('path is', this.$router);
        this.$router.push(item.path);
      },
      scrollTopTest(){
        console.log('scrollTop', document.querySelector('#app').scrollTop);
        console.log('scrollTop', document.querySelector('#app').scrollTop);
//        console.log('scrollTop',document.documentElement.scrollTop);
        console.log('pageYOffset', window.pageYOffset);

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .hello {
    text-align: center;
    /*overflow: scroll;*/
  }

  @media only screen and (max-width: 375px) {
    .port {
      font-weight: 200;
    }
  }

  @media only screen and (min-width: 376px) and (max-width: 414px) {
    .port {
      font-weight: 900;
    }
  }

</style>
