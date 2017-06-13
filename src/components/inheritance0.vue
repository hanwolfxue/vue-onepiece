<template>
  <div>
    {{string1}}
    {{string2}}
  </div>
</template>
<script>
  export default {
    name: 'inheritance0',
    data(){
      return {
        string1: `In Javascript is a line-feed.`
      }
    },
    computed: {
      string2(){
        return `${this.hello()}`
      }
    },
    mounted(){
      let str = 'return ' + '`hello ${name}!`';
      let func = new Function('name', str);
      console.log('引用本身', func('Jack'));
      let str1 = '(name)=>`Hello ${name}!`';
      let func1 = eval.call(null, str1);
      console.log('引用本身2', func1('Marry'));
      function ClassA(sColor) {
        this.color = sColor;
        this.sayColor = function () {
          alert(this.color);
        };
      }

      function ClassB(sColor, sName) {
        this.newMethod = ClassA;
        this.newMethod(sColor);
        delete this.newMethod;
        this.name = sName;
        this.sayName = function () {
          alert(this.name);
        };
      }

      var objA = new ClassA("blue");
      var objB = new ClassB("red", "John");
      objA.sayColor();	//输出 "blue"
      objB.sayColor();	//输出 "red"
//      objB.sayName();		//输出 "John"
      function ClassX() {
        this.name = "classx";
        this.sayName = function () {
          alert(this.name)
        }
      }

      function ClassY() {
        this.value = "classy";
        this.sayValue = function () {
          alert(this.value)
        }
      }

      function ClassZ() {
        this.newMethod = ClassX;
        this.newMethod();
        delete this.newMethod;

        this.newMethod = ClassY;
        this.newMethod();
        delete this.newMethod;
      }

      var z = new ClassZ();
      z.sayName();    //输出classx
      z.sayValue();    //输出classy

      function ClassE(scolor) {
        this.color = scolor;
      }

      ClassE.prototype.sayColor = function () {
        alert(this.color);
      }
      function ClassF(scolor, sName) {
        ClassE.call(this, scolor);
        this.name = sName;
      }

      ClassF.prototype = new ClassE();
      ClassF.prototype.sayName = function () {
        alert(this.name);
      }
      var E = new ClassE('brown');
      var F = new ClassF('pik','Marry');
      E.sayColor();
      F.sayColor();
      F.sayName();
    },
    methods: {
      hello(){
        return 'hello world'
      }
    }
  }
</script>
