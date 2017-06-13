<template>
  <div>
    <div>数组</div>
    <span v-for="item in array1">
      {{item}}
    </span>
    <div class="button button-primary button-rounded button-small" @click="reverse()">
      倒序
    </div>
    <div class="button button-primary button-rounded button-small" @click="order()">
      顺序
    </div>
    <h2>产生新数组</h2>
    <span v-for="item in colors1">
      {{item}}
    </span>
    <button class="button button-primary button-rounded button-small" @click="concat()">添加元素</button>
    <span v-for="item in colors2">
      {{item}}
    </span>
    <h3>slice</h3>
    <div>运用1，参数中含有负数</div>
    <span v-for="item in figure">{{item}}</span>
    <button class="button button-primary button-rounded button-small" @click="slice1()">截取</button>
    <button class="button button-primary button-rounded button-small" @click="slice2()">截取2</button>
    <span v-for="item in figure1">{{item}}</span>===<span v-for="item in figure2">{{item}}</span>
    <h2>不产生新数组</h2>
    <h3>最强大的操作数组方法splice</h3>
    <h4>删除</h4>
    <button class="button button-primary button-rounded button-small" @click="splice1()">删除</button>
    <span v-for="item in figure">{{item}}</span>
    <button class="button button-primary button-rounded button-small" @click="splice2()">插入</button>
    <span v-for="item in figure">{{item}}</span>
    <button class="button button-primary button-rounded button-small" @click="splice3()">替换</button>
    <span v-for="item in figure">{{item}}</span>
    <h2>数组的迭代方法</h2>
    <span v-for="item in numbers">{{item}}</span>
    <div>everyResult is : {{everyResult}}</div>
    <div>someResult is : {{someResult}}</div>
    <button class="button button-primary button-rounded button-small" @click="every()">every</button>
    <button class="button button-primary button-rounded button-small" @click="some()">some</button>
    <span v-for="item in numbers1">{{item}}</span>
    <button class="button button-primary button-rounded button-small" @click="filter()">filter</button>
    <button class="button button-primary button-rounded button-small" @click="map()">map</button>
    <button class="button button-primary button-rounded button-small" @click="forEach()">forEach</button>
    <button class="button button-primary button-rounded button-small" @click="reduce()">reduce</button>
  </div>
</template>
<script>
  export  default {
    data(){
      return {
        array1: [1, 7, 3, 10, 5, 6],
        colors1: ['red', 'green', 'blue'],
        colors2: [],
        figure: ['路飞', '娜美', '罗宾', '索隆', '香吉士', '乔巴'],
        figure1: [],
        figure2: [],
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        numbers1: [],
        everyResult: false,
        someResult: false,
      }
    },
    methods: {
      reverse(){
        var vm = this;
        vm.array1.reverse();
      },
      compare(value1, value2){
        if (value1 < value2) {
          return -1;
        } else if (value1 > value2) {
          return 1;
        } else {
          return 0;
        }
      },
      order(){    //顺序数组
        var vm = this;
        vm.array1.sort(vm.compare);
      },
      concat(){
        var vm = this;
        vm.colors2 = vm.colors1.concat('yellow', ['balck', 'brown'])
      },
      slice1(){
        var vm = this;
        vm.figure1 = vm.figure.slice(-3, -1);
      },
      slice2(){
        var vm = this;
        vm.figure2 = vm.figure.slice(3, 5);
      },
      splice1(){
        var vm = this;
        vm.figure.splice(1, 2);
      },
      splice2(){
        var vm = this;
        vm.figure.splice(1, 0, '女帝', '红发');
      },
      splice3(){
        var vm = this;
        vm.figure.splice(1, 2, '雷利', '罗杰')
      },
      every(){
        var vm = this;
        vm.everyResult = vm.numbers.every(function (item, index, array) {
          return (item > 2);
        })
      },
      some(){
        var vm = this;
        vm.someResult = vm.numbers.some(function (item, index, array) {
          return (item > 2);
        })
      },
      filter(){
        var vm = this;
        vm.numbers1 = vm.numbers.filter(function (item, index, array) {
          console.log('光能使者');
          return (item > 2);
        })
      },
      map(){
        var mapResult = this.numbers.map(function (item, index, array) {
          return item * 2;
        })
        console.log('mapResult is', mapResult);
      },
      forEach(){
        var vm = this;
        var a = 0;
        var forEachResult = vm.numbers.forEach(function (item, index, array) {
          a++;
          return item * 2;
        })
//        for (var i = 0; i < vm.numbers.length; i++) {
//          a++;
//          if (vm.numbers[i] === 3) {
//            console.log('a is', a);
//            return false;
//          }
//        }
        console.log('a is', a);
        console.log('forEachResult is', forEachResult);
      },
      reduce(){
        var values = [10, 20, 30, 40, 50];
        var b = 0;
        var sum = values.reduce(function (prev, cur, index, array) {
          b++;
          console.log('prev is', prev);
          console.log('cur is', cur);
          return prev + cur;
        })
        console.log('sum is', sum);
      }
    }
  }
</script>
