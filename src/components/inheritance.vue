<template>
  <div>
    {{string1}}
    {{string2}}
  </div>
</template>
<script>
  export default {
    name: 'inheritance',
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
      function ClassA(color) {
        this.color = color;
      }

      ClassA.prototype.sayColor = function () {
        alert(this.color);
      }
      function ClassB(color, Name) {
        ClassA.call(this, color);
        this.name = Name;
      }

      ClassB.prototype = new ClassA();
      ClassB.prototype.sayName = function () {
        alert(this.name);
      }
      var a = new ClassA('red');
      var b = new ClassB('blue', 'Marry');
      a.sayColor();
      b.sayColor();
      b.sayName();
      console.log('ClassB is',b);
    },
    methods: {
      hello(){
        return 'hello world'
      }
    }
  }
</script>
