<template>
  <div>
    <h1>event事件</h1>
    <input type="button" id="myBtn" value="click me">
    <a>去百度</a>
    <a href="http://www.baidu.com" target="coffee">去百度</a>
    <a href="http://www.bilibili.com/" target="coffee">去b站</a>
    <ol style="list-style-type: none">
      <li>Walla</li>
      <li>Marry</li>
      <li>Bill</li>
      <li>Last
        <ul>
          <li>不知火舞</li>
          <li>草薙京</li>
          <li>八神庵</li>
          <li>戴安娜</li>
        </ul>


        
      </li>
      <li>Why</li>
    </ol>

    <dl>
      <dt>Burma Shave Signs</dt>
      <dd>Road signs common in the u.s. in the 1920</dd>
      <dt>Route 66</dt>
      <dd>Most famous road int usdfsd dsou sd</dd>
    </dl>

    <p>Im so going to wtttt <em>this</em></p>
    <div style="">
      <img src="../assets/mypod1.png">
      <img style="width: 200px;" src="../assets/timg.jpeg"><img style="width: 200px;" src="../assets/timg.jpeg">
    </div>
    <div id="ice">海子
      <a>
        <div>睡在我上铺的兄弟</div>
      </a>
      浪漫
      <time>2015-02-02</time>
      <code>区别</code>
    </div>
    <div style="color: red">
      <p>
        21312<em>海贼王</em>
        <a href="about/directions.html" style="text-decoration: line-through">我的新世界</a>
      </p>
      <p>
      <div style="text-decoration: overline;font-family: Serif;font-weight: bold;font-size: 20px">Black</div>
      <code style="font-family: 'monospace'">
        if(a === b){
        return;
        }
        四皇
      </code>
      <p>四皇</p>
      </p>
      <p style="font-family: 'Comic Sans MS'">comic</p>
      <p style="font-family: Impact">last</p>
      <h1>字体测试</h1>
      <p>
        话不多说,下面开始,nagios具体的介绍,可以搜一下,这篇文章为作者在实际操作中整理出来,写出来的都是负责人的内容~环境准备此文档共用2台服务器的配置,操作系统均为centOS6.7,安装用户都为</p>

    </div>
    <video poster="../assets/pocK.jpg" controls src="../../static/esen.mp4" width="300" height="200"></video>
    <!--<img src="../assets/pocK.jpg" class="imgload">-->
    <div id="example-1">
      <button @click="show = !show">
        Toggle render
      </button>
      <transition name="slide-fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
    <div :class="nameText">{{fullName}}</div>
    <div>{{lastName}}</div>
    <input v-model="firstName">
    <input v-model="fullName">
    <ul>
      <li v-for="item in items">{{item}}</li>
    </ul>
    <time datetime="2012-02-18">2/18/2012</time>
    <mark>mark</mark>
    <progress value="80" max="100"></progress>
    <meter></meter>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'event',
    data() {
      return {
        show: true,
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar',
        nameText:{
          color:true,
          background:true
        },
        items:[
          '海贼王','火影忍者','死神'
        ]
      }
    },
    components: {},
    computed: {
      now: function () {
        let date = new Date();
        return date;
      },

//      fullName: {
//        get: function () {
//          return this.firstName + ' ' + this.lastName;
//        },
//        set: function (newValue) {
//          var names = newValue.split(' ');
//          this.firstName = names[0];
//          this.lastName = names[name.length - 1];
//        }
//      }
    },
    watch: {
//      firstName: function (val) {
//        this.fullName = val + ' ' + this.lastName
//      },
//      lastName: function (val) {
//        this.fullName = this.firstName + ' ' + val
//      }
    },
    mounted() {
      var vm = this;
      setTimeout(function () {
//        document.body.onclick = function (event) {
//          console.log(event.currentTarget === document.body);
//          console.log(this === document.body);
//          console.log(event.target === document.getElementById('myBtn'));
//          console.log(event.eventPhase);
//        }
        document.body.addEventListener('click', function (event) {
          console.log('1', event.eventPhase);
        }, false);
        var btn = document.getElementById('myBtn');
        var handler = function (event) {
          switch (event.type) {
            case 'click':
//              alert('Clicked');
              console.log('2', event.eventPhase);
//              event.stopPropagation();
              break;

            case 'mouseover':
              event.target.style.backgroundColor = 'red';
              event.stopPropagation();
              break;
            case 'mouseout':
              event.target.style.backgroundColor = 'blue';
              event.stopPropagation();
              break;
          }
        }

        btn.onclick = handler;
        btn.onmouseover = handler;
        btn.onmouseout = handler;
      }, 0)
//      var a = document.createElement('a');
//      a.href = '#ice';
//      a.type = 'hidden';
//      document.body.appendChild(a);
//      a.click();
      var EventUtil = {
//        addHandler: function (element, type, handler) {
//          if (element.addEventListener) {
//            element.addEventListener(type, handler, false);
//          } else if (element.attachEvent) {
//            element.attachEvent('on' + type, handler);
//          } else {
//            element['on' + type] = handler;
//          }
//        },
//        removeHandler: function () {
//          if (element.removeEventListener) {
//            element.removeEventListener(type, handler, false);
//          } else if (element.attachEvent) {
//            element.detachEvent('on' + type, handler);
//          } else {
//            element['on' + type] = null;
//          }
//        },
        getEvent: function (event) {
          return event ? event : window.event;
        },
        getTarget: function (event) {
          return event.target || event.srcElement
        },
        preventDefault: function (event) {
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }
        },
        stopPropagation: function (event) {
          if (event.stopPropagation) {
            event.stopPropagation();
          } else {
            event.cancelBubble = true;
          }
        }
      }
//      var image = document.querySelector('.imgload');
//      console.log(image);
//      image.addEventListener('load', function (event) {
//        console.log('图片路径', event.target.src);
//      })
      let watch1 = this.$watch('firstName', function (newVal, oldVal) {
        // 做点什么
        console.log('新值加旧值',newVal,oldVal);
        if(newVal == 'candy'){
          watch1();
        }
      })
//      setTimeout(function () {
//        let arr = ['东方深挖','星际迷航'];
//        vm.items.reverse();
//      },3000)
    },
    methods: {}
  }
</script>
<style>
  p {
    color: red;
  }

  .slide-fade-enter-active {
    transition: all 3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  /*.slide-fade-enter {*/
  /*transform: translateX(10px);*/
  /*opacity: 0;*/
  /*}*/
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .color {
    color: red;
  }
  .background {
    background: blue;
  }
</style>
