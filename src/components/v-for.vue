<template>
  <div>
    <div>循环对象</div>
    <template v-for="(item,key,index) in obj">
      <div>{{key}}:{{index}}:{{item}}</div>
    </template>
    <div>整数迭代 v-for</div>
    <div v-for="item in 10">
      {{item}}
    </div>
    <div>数组迭代 v-for</div>
    <div v-for="item in arr" :key="item.id">
      {{item.name}}
    </div>
    <line-basis>
      模仿栈
    </line-basis>
    <div>
      <template v-for="item in stack">
        <span style="margin-right: 10px">{{item}}</span>
      </template>
    </div>
    <line-basis>
      模仿队列
    </line-basis>
    <div class="flex-box flex-newLine">
      <template v-for="item in queue">
        <div class="textCenter" style="width: 20%">{{item}}</div>
      </template>
    </div>
    <line-basis>
      模仿反队列
    </line-basis>
    <div class="flex-box flex-newLine">
      <template v-for="item in againstQueue">
        <div class="textCenter" style="width: 20%">{{item}}</div>
      </template>
    </div>
    <line-basis>
      删除数组元素之splice方法
    </line-basis>
    <div class="flex-box flex-newLine">
      <template v-for="item in spliceArray">
        <div class="textCenter" style="width: 20%">{{item}}</div>
      </template>
    </div>
    <div><input placeholder="请输入要删除的位置" type="number" style="height: 44px;border: 1px solid #F3F4F5" v-model="arrIndex">
      <a href="javascript:void(0)" class="button button-primary button-rounded button-small"
         @click="spliceArr">删除数组元素</a></div>
    <line-basis>
      filter数组
    </line-basis>
    <div class="flex-box flex-newLine">
      <template v-for="item in filterArray1">
        <div class="textCenter" style="width: 20%">{{item}}</div>
      </template>
    </div>
    <line-basis>
      concat数组
    </line-basis>
    <div class="flex-box flex-newLine">
      <template v-for="item in concatArr">
        <div class="textCenter" style="width: 20%">{{item}}</div>
      </template>
    </div>
    <line-basis>
      对循环的数组使用方法
    </line-basis>
    <div class="flex-box flex-newLine">
      <template v-for="item in even(arrWay)">
        <div class="textCenter" style="width: 20%">{{item}}</div>
      </template>
    </div>
  </div>
</template>
<script>
  import lineBasis from './line-basis.vue'
  export default {
    name: 'v-for',
    components: {
      lineBasis
    },
    data(){
      return {
        obj: {
          firstName: 'Marry',
          secondName: 'Bill',
          thirdName: 'Diana'
        },
        arr: [
          {id: '1', name: 'Green'},
          {id: '2', name: 'Porrty'},
          {id: '3', name: 'Charlie'}
        ],
        stack: [
          1, 2, 3, 4, 5, 6
        ],
        queue: [
          1, 2, 3, 4, 5
        ],
        againstQueue: [
          1, 2, 3, 4, 5
        ],
        spliceArray: [
          '路飞', '索隆', '香吉士', '娜美', '罗宾'
        ],
        filterArrar: [
          '鸣人', '佐助', '卡卡西', '雏田', '小樱'
        ],
        filterArray1: [],
        concatArr: [],
        concatArr1: ['天灾末日', '兽灵行者', '卡哇伊一'],
        concatArr2: ['风行者', '狼人', '守望者'],
        arrWay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        k: 5,
        arrIndex: 0
      }
    },
    mounted: function () {
      var vm = this;

      let i = 7;

      function pushArr() {
        let pushArrTime = setTimeout(function () {
          vm.stack.push(i);   //从后面进入
          i++;
          if (i < 100) {
            pushArr();
          } else {
            clearTimeout(pushArrTime);
          }
        }, 1000);
      }

      function popArr() {
        let popArrTime = setTimeout(function () {
          vm.stack.pop();
          if (i < 100) {
            popArr();
          } else {
            clearTimeout(popArrTime);
          }
        }, 1100)
      }

      pushArr();
      popArr();
      let j = 6;

      function queuePush() {    //先进先出
        let pushArrTime = setTimeout(function () {
          vm.queue.push(j);   //从后面进入
          vm.queue.shift();   //删除第一个
          j++;
          if (j < 100) {
            queuePush();
          } else {
            clearTimeout(pushArrTime);
          }
        }, 1000);
      }

      queuePush();
      vm.againstQueueWay();

      vm.filterArray1 = vm.filterArrar.filter(function (item) {
        return item !== '佐助'
      });
      vm.concatArray();
    },
    methods: {
      againstQueueWay(){
        var vm = this;
        let pushTime = setTimeout(function () {
          vm.againstQueue.unshift(vm.k);   //从后面进入
          vm.againstQueue.pop();   //删除第一个
          vm.k++;
          if (vm.k < 100) {
            vm.againstQueueWay();
          } else {
            clearTimeout(pushTime);
          }
        }, 1000);
      },
      spliceArr(){
        var vm = this;
        vm.spliceArray.splice(vm.arrIndex, 1);
      },
      concatArray(){
        var vm = this;
        vm.concatArr = vm.concatArr1.concat(vm.concatArr2);
      },
      even(arrWay){
        return arrWay.filter(function (arr) {
          return arr % 2 === 0
        })
      }
    }
  }
</script>
