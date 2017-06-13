import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import vFor from '../components/v-for'
import vueEvent from '../components/vueEvent.vue'
import inheritance0 from '../components/inheritance0.vue'
import inheritance from '../components/inheritance.vue'
import templateString from '../components/templateString.vue'
import components from '../components/components.vue'
import About from '../components/about.vue'

Vue.use(Router)

function load(componentName, path) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = path;
    script.async = true;
    script.onload = function () {    //页面加载
      var component = Vue.component(componentName);   //验证组件
      if (component) {
        resolve(component);
      } else {
        reject();
      }
    };
    script.onerror = reject;
    document.body.appendChild(script);    //为index添加上js
  });
}

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/vFor',
      name: 'vFor',
      component: vFor
    },
    {
      path: '/vueEvent',
      name: 'vueEvent',
      component: vueEvent
    },
    {
      path: '/inheritance0',
      name: 'inheritance0',
      component: inheritance0
    },
    {
      path: '/inheritance',
      name: 'inheritance',
      component: inheritance
    },
    {
      path: '/templateString',
      name: 'templateString',
      component: templateString
    },
    {
      path: '/components',
      name: 'components',
      component: components
    },
    {
      path: '/about',
      component: function (resolve) {
        require(['../components/about'], resolve)
      }
    },
    {
      path: '/recursiveComponent',
      component: function (resolve) {
        require(['../views/recursive-component'], resolve)
      }
    },
    {
      path: '/caseAsynComponent',
      component: function (resolve) {
        require(['../views/case-asynComponent'], resolve)
      }
    },
    {
      path: '/responsive',
      component: function (resolve) {
        require(['../views/responsive'], resolve)
      }
    },
    {
      path: '/directive',
      component: function (resolve) {
        require(['../views/directive'], resolve)
      }
    },
    {
      path: '/transition',
      component: function (resolve) {
        require(['../views/transition'], resolve)
      }
    },
    {
      path: '/transformOrigin',
      component: function (resolve) {
        require(['../views/transform-origin'], resolve)
      }
    },
    {
      path: '/perspective',
      component: function (resolve) {
        require(['../views/perspective'], resolve)
      }
    },
    {
      path: '/screenAdaptation',
      component: function (resolve) {
        require(['../views/screenAdaptation'], resolve)
      }
    },
    {
      path: '/array',
      component: function (resolve) {
        require(['../views/array'], resolve)
      }
    },
    {
      path: '/date',
      component: function (resolve) {
        require(['../views/date'], resolve)
      }
    },
    {
      path: '/jsAnimation',
      component: function (resolve) {
        require(['../views/jsAnimation'], resolve)
      }
    },
    {
      path: '/objectExplore',
      component: function (resolve) {
        require(['../views/objectExplore'], resolve)
      }
    }
  ]
})
