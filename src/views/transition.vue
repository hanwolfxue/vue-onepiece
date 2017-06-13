<template>
  <div>
    <div>过渡效果</div>
    <!--<transition name="fade">-->
    <!--<p v-if="show">hello world</p>-->
    <!--</transition>-->
    <button @click="show=!show" class="button button-primary button-rounded button-small">Toggle</button>
    <div style="transition: opacity">老板</div>
    <div id="example-2">
      <button class="button button-primary button-rounded button-small"
              @click="show1 = !show1">Toggle show
      </button>
      <transition name="bounce">
        <p v-if="show1">Look at me!</p>
      </transition>
      <!--<transition v-on:before-enter="beforeEnter"-->
      <!--v-on:enter="enter"-->
      <!--v-on:after-enter="afterEnter"-->
      <!--v-on:enter-cancelled="enterCancelled"-->

      <!--v-on:before-leave="beforeLeave"-->
      <!--v-on:leave="leave"-->
      <!--v-on:after-leave="afterLeave"-->
      <!--v-on:leave-cancelled="leaveCancelled">-->
      <!--<p v-if="show4" :css="false">Demo</p>-->
      <!--</transition>-->
      <!--<transition>-->
      <!--<button v-if="docState === 'save'" key="saved">-->
      <!--save-->
      <!--</button>-->
      <!--<button v-if="docState === 'edited'" key="edited">-->
      <!--edited-->
      <!--</button>-->
      <!--<button v-if="docState === 'editing'" key="editing">-->
      <!--editing-->
      <!--</button>-->
      <!--</transition>-->
      <div style="position: relative">
        <transition name="fade" mode="in-out">
          <button v-if="show5" key="on">on</button>
          <button v-else key="off">off</button>
        </transition>
      </div>
      <button class="button button-primary button-rounded button-small" @click="show5=!show5" style="margin-left: 40px">
        过渡模式切换
      </button>
    </div>
    <div id="example-3">
      <button @click="show3 = !show3">
        Toggle render
      </button>
      <transition name="custom-classes-transition"
                  enter-active-class="animated tada"
                  leave-active-class="animated bounceOutRight">
        <p v-if="show3">hello</p>
      </transition>
    </div>
    <div class="devideLine"></div>
    <div id="list-demo" class="demo">
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
      </transition-group>
    </div>
    <div id="flip-list-demo" class="demo">
      <button @click="shuffle">
        Shuffle
      </button>
      <transition-group name="flip-list" tag="ul">
        <li v-for="item in items" :key="item">
          {{item}}
        </li>
      </transition-group>
    </div>
    <div class="devideLine"></div>
    <p class="transform demo_transform1">我是要成为海贼王的男人</p>
    <p class="transform demo_transform2">西索是果农</p>
    <p class="transform demo_transform3">十二生肖</p>
    <p class="transform demo_transform4">揍敌客家族</p>
    <div>动次打次</div>
    <p class="transform demo_transform5">最终幻想蒂法</p>
    <div class="devideLine"></div>
    <p class="transform demo_transform6">攻壳机动队</p>
    <div class="devideLine"></div>
    <div class="threeD">
      <div class="cube">
        <div class="front">1</div>
        <div class="back">2</div>
        <div class="right">3</div>
        <div class="left">4</div>
        <div class="top">5</div>
        <div class="bottom">6</div>
      </div>
      <div class="cube1">
        <div class="redx">redx</div>
        <div class="bluey">bluey</div>
        <div class="brownz">brownz</div>
      </div>
    </div>
    <div class="stage">
      <div class="board"></div>
    </div>
    <div class="wrap">
      <div class="spin">
        <div class="rotate">
          <div style="width: 142px;height: 200px;background: #34a5f8"></div>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="spin">
        <div class="rotate three-d">
          <div style="width: 142px;height: 200px;background: #34a5f8"></div>
        </div>
      </div>
    </div>
    <div class="threeD">
      <div class="wrap1">
        <div class="box"></div>
      </div>
    </div>
  </div>
</template>
<script>
  require('../assets/scss/transition.scss')
  import Vue from 'vue'
  export default {
//    name: 'components',
    data() {
      return {
        msg: 'message',
        show: false,
        show1: true,
        show3: true,
        show4: false,
        show5: false,
        docState: 'saved',
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10
      }
    },
    components: {},
    computed: {
      buttonMessage: function () {
        switch (this.docState) {
          case 'saved':
            return 'Edit'
          case 'edited':
            return 'Save'
          case 'editing':
            return 'Cancel'
        }
      }
    },
    mounted() {
      console.log('哈哈');
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.transformOrigin = 'left'
      },
      changeDocState(){
        var vm = this;
        vm.docState
      },
      randomIndex(){
        return Math.floor(Math.random() * this.items.length)
      },
      add(){
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },
      remove(){
        this.items.splice(this.randomIndex, 1);
      },
      shuffle(){    //位移
        this.items = _.shuffle(this.items)
      }
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity, tranform 1s, 1s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .bounce-enter-active {
    animation: bounce-in .5s
  }

  .bounce-leave-active {
    animation: bounce-out .5s
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0)
    }
    50% {
      transform: scale(1.5)
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1)
    }
    50% {
      transform: scale(1.5)
    }
    100% {
      transform: scale(0)
    }
  }

  .list-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  /*.list-enter-active, .list-leave-active {*/
    /*transition: all 1s;*/
  /*}*/

  /*.list-enter, .list-leave-active {*/
    /*opacity: 0;*/
    /*transform: translateY(50px);*/
  /*}*/
  .list-complete-enter, .list-complete-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }

  .list-move {
    transition: transform 1s
  }

  .flip-list-move {
    transition: transform 1s;
  }
</style>
