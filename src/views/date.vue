<template>
  <div>
    <h1>日期</h1>
    <div style="line-height: 2px;font-size: 16px">
      123
    </div>
    <div style="line-height: 2px;font-size: 16px">
      123
    </div>
    <div @click="test">123</div>
    <div id="test">32144</div>
  </div>
</template>
<script>
  export default {
    mounted(){
      var y2k = new Date(Date.UTC(2001, 0));
      console.log('y2k is', y2k);
      var y3k = new Date(2001, 0);
      console.log('y3k is', y3k);

      var allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));
      console.log('allFives is', allFives);

      var yk = new Date();
      console.log('yk is', yk);
      console.log('yk 的毫秒数是', Date.now());
      console.log('getTime is', yk.getTime());
      console.log('+操作符 is', +yk);
      console.log('valueOf is', yk.valueOf());
      console.log('UTC is', yk.toUTCString());

      console.log('toDateString is', yk.toDateString());
      console.log('toTimeString is', yk.toTimeString());
      console.log('toLocaleDateString is', yk.toLocaleDateString());
      console.log('toLocaleTimeString is', yk.toLocaleTimeString());

      console.log('距离utc时间的分钟数', yk.getTimezoneOffset());
      var a = new Date();
      a.setFullYear(2015);
      console.log('设置了年份', a);

      var pattern = /at/i;
      var test1 = 'at12345';
      console.log(pattern.test(test1));

      var pattern2 = /[bc]at/i;
      var test2 = 'bat123';
      console.log(pattern2.test(test2));

      var pattern3 = /.at/gi;
      var test3 = '1at1231123qwe';
      console.log(pattern3.test(test3));

      var pattern4 = /\[bc\]at/i;
      var test4 = '[bc1]at123';
      console.log(pattern4.test(test4));

      var re = null,
        i;
      for (var i = 0; i < 10; i++) {
        re = /cat/g
        console.log('字面量表示法', re.test('catastrophe'));
      }
      for (var i = 0; i < 10; i++) {
        re = new RegExp('cat', "g");
        console.log('构造函数表示法', re.test('catastrophe'));
      }

      var str = "This is an\n antzone good";
      var reg = /an$/m;
      console.log(str.match(reg));

      var text = "cat, bat, sat, fat";
      var new1 = /.at/;

      var matches = new1.exec(text);
      console.log('index is', matches.index);
      console.log('第一个元素is', matches[0]);
      console.log('lastIndex is', matches.lastIndex);

      var text = "this has been a short summer";
      var new2 = /(.)hort/g;

      if (new2.test(text)) {
        console.log('input is ', RegExp.input);
        console.log('input is ', RegExp.leftContext);
        console.log('input is ', RegExp.rightContext);
        console.log('input is ', RegExp.lastMatch);
        console.log('input is ', RegExp.lastParen);
        console.log('input is ', RegExp.multiline);
      }

      function callSomeFunction(someFunction, someArgument) {
        return someFunction(someArgument);
      }

      function add10(num) {
        return num + 10;
      }

      var result1 = callSomeFunction(add10, 10);
      console.log('result1 is', result1);

      function createComparisonFunction(propertyName) {
        return function (object1, object2) {
          var value1 = object1[propertyName];
          var value2 = object2[propertyName];
          if (value1 < value2) {
            return -1;
          } else if (value1 > value2) {
            return 1;
          } else {
            return 0;
          }
        }
      }

      var data = [{name: 'Zachary', age: 28}, {name: 'Nicholas', age: 29}];
      data.sort(createComparisonFunction('name'));
      alert(data[0].name);
      console.log('this is', this);
      window.id = 'bubuzou';
      setTimeout(function () {
        document.getElementById('test').onclick = function () {
          var that = this;
          console.log(this.id);  // 'div'
          var callback = function () {
            console.log(this.id);  // 'bubuzou'
            console.log(that.id);  // 'div'
          };
          callback();
        };
      }, 0)

      function sayName(name) {
        alert(name);
      }

      function sum(num1, num2) {
        return num1 + num2;
      }

      function sayHi() {
        alert('hi')
      }

      alert(sayName.length);
      alert(sum.length);
      alert(sayHi.length);

    },
    methods: {
      test(){
        var that = this;
        console.log(this.id);
      }
    }
  }
</script>
<style>

</style>
