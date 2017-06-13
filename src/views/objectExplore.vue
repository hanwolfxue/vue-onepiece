<template>
  <div>
    <div>对象探究</div>
    <table>
      <tr>
        <td width="200" height="200" style="background: red"></td>
      </tr>
    </table>
    <div style="width: 300px;text-align: center">
      1234556
    </div>
    <div style="width: 300px;background: #34a5f8;">
      <div style="background: red;margin: 0 auto;width: 100px">212323321</div>
    </div>
    <div style="width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;margin: 0 auto">
      <div style="width: 200px;float: left;background: #9ad824;height: 40px"></div>
    </div>
    <div style="display: flex;justify-content: center;width: 200px;background: #9ad824">
      1234
    </div>
    <div style="position: relative;width: 200px;height: 200px;background: #34a5f8">
      <div
        style="position: absolute;left: 50%;transform: translate(-50%,0);background: #9ad824;width: 20%;height: 50px"></div>
    </div>
    <div style="position: relative;width: 200px;height: 200px;background: #34a5f8">
      <div style="position: absolute;left: 50%;margin-left: -25px;background: #9ad824;width: 50px;height: 50px"></div>
    </div>
    <div style="position: relative;width: 200px;height: 200px;background: #9ad824">
      <div style="position: absolute;left: 0;right:0;margin: 0 auto;background: #34a5f8;width: 50px;height: 50px"></div>
    </div>
    <div style="height: 50px" class="blueBack">
      <img src="../assets/timg.jpeg" style="width: 20px">海贼王
    </div>
    <h1>垂直居中</h1>
    <h2>单行文本</h2>
    <div style="height: 44px;line-height: 44px" class="blueBack">我居中了</div>
    <h2>行内块级元素</h2>
    <div style="width: 100px;height: 100px;background: #a49ef0" class="parent">
      <div class="son" style="background: red;width: 20px;height: 20px"></div>
    </div>
    <h2>元素高度不定</h2>
    <div style="display: table;height: 50px" class="blueBack">
      <div style="display: table-cell;vertical-align: middle">
        <span style="background: red;font-size: 25px">高中</span>
      </div>
    </div>
    <h2>新盒子</h2>
    <div style="display: flex;align-items: center;height: 50px;background: #34a5f8">
      新盒子
    </div>
    <div style="display: -webkit-box;height: 50px;background: #9ad824;box-orient:vertical;box-pack:center">
      旧盒子
    </div>
    <div class="relativeBox blueBack" style="height: 50px">
      <div style="top: 50%;transform: translate(-50%,-50%);background: red;height: 30px" class="absoluteBox">transform
      </div>
    </div>
    <div class="relativeBox blueBack" style="height: 50px">
      <div style="top: 50%;margin-top: -15px;background: red;height: 30px" class="absoluteBox">transform</div>
    </div>
    <div class="relativeBox blueBack" style="height: 50px">
      <div class="absoluteBox" style="height: 30px;top: 0;bottom: 0;margin: auto 0;background: red">
        margin
      </div>
    </div>
    <ul>
      <li>one</li>
      <li>two</li>
      <li>three</li>
      <li>one</li>
    </ul>
  </div>
</template>

<script>
  //  require('./assets/buttons.css');
  export default {
    name: 'objectExplore',
    mounted(){
      (function () {
        var name = '';
        Person = function (value) {
          name = value
        }
        Person.prototype.setName = function (value) {
          name = value;
        }
        Person.prototype.getName = function () {
          return name;
        }
      })();
      var person1 = new Person();
      person1.setName('Marry');
      alert(person1.getName());
      var singleton = function () {
        var privateVariable = 10;

        function privateFunction() {
          return false;
        }

        return {
          publicProperty: true,
          publicMethod: function () {
            privateVariable++;
            return privateFunction();
          }
        }
      }
      console.log('单例 is ', singleton.prototype);
      var application = (function () {
        var components = new Array();
        components.push('1');
        return {
          getComponentCount: function () {
            return components.length;
          },
          registerComponent: function (component) {
            if (typeof component == 'object') {
              components.push(component);
            }
          }
        }
      })();
      console.log('dfsdfs', application);
      (function () {
        var a1 = 1;
        alert(a1);
      })()
//      function Person(name) {
//        this.getName = function () {
//          return name;
//        };
//        this.setName = function (value) {
//          name = value;
//        }
//      }
//      var person = new Person('Nicholas');
//      alert(person.getName());
//      person.setName('Greg');
//      alert(person.getName());
//      function outputNumbers(count) {
//        var a = 55;
//
////        (function () {
////          for(var i=0;i<count;i++){
////            alert(i);
////            alert(a);
////          }
////        })();
//        var test = function () {
//          for(var i=0;i<count;i++){
//            alert(i);
//            alert(a);
//          }
//        };
//        test();
//      }
//      outputNumbers(2);
      var lists = document.getElementsByTagName('li');
      console.log('工厂模式');
      function createPerson(name, age, job) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function () {
          alert(this.name);
        }
        return o;
      }

      var person1 = createPerson('Nicholas', 29, 'Software Engineer');
      var person2 = createPerson('Greg', 27, 'Doctor');
      console.log(person1.constructor);

      console.log('构造函数');
      function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.jo1b = job;
        this.sayName = function () {
          alert(this.name);
        }
      }

      var person3 = new Person('Nicholas', 29, 'Software Engineer');
      var person4 = new Person('Greg', 27, 'Doctor');
      console.log(person3.constructor);

      function animal(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = sayName;
      }

      function sayName() {
        alert(this.name);
      }

      function functionName(arg0, arg1, arg2) {

      }

      console.log(functionName.name);
      var condition = false;
      if (condition) {
        var sayHi = function () {
          console.log('上');
        }
      } else {
        var sayHi = function () {
          console.log('下');
        }
      }
      sayHi();

      function factorial(num) {
        if (num <= 1) {
          return 1;
        } else {
          return num * factorial(num - 1);
        }
      }

      var test = '223';

      function a() {
//        var test = '22';
        function b() {
          function c() {
            console.log('test is', test);
          }

          c();
        }

        b();
      }

      a();
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

      var compareNames = createComparisonFunction('name');
      var result = compareNames({name: "Nicholas"}, {name: "Greg"});
      console.log('result is', result);
      compareNames = null;

      function Aves() {

      }
      Aves.prototype.name = "Naveee";
      Aves.prototype.age = 29;
      Aves.prototype.job = 'Software Engineer';
      Aves.prototype.sayName = function () {
        alert(this.name);
      }
      var aves1 = new Aves();
      var obj3 = {
        name:'ddd'
      }
      console.log('aves is',aves1.name);
      console.log('11111',Aves.prototype.isPrototypeOf(aves1));
      console.log('2222',Object.getPrototypeOf(aves1));
      console.log('333333',Object.getPrototypeOf(aves1).name);
    },
    methods: {}
  }
</script>
<style>
  .parent::after, .son {
    display: inline-block;
    vertical-align: middle;
  }

  /*.parent::after{*/
  /*content:'';*/
  /*height:100%;*/
  /*}*/
</style>
