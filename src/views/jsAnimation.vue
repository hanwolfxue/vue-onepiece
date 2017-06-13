<template>
  <div>
    <h1>js动画</h1>
    <input type="button" value="往下" @click="xia(100)">
    <input type="button" value="往上" @click="shang(0)">
    <div style="width: 50px;height: 50px;background: red;" id="webkfaid"></div>
    <div id="test"></div>
  </div>
</template>
<script>
  export default {
    mounted(){
      var vm = this;
      setTimeout(function () {
        var obj = document.getElementById('test');
        obj.style = vm.addSlideStyle(3, 200);
      }, 0)
      var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing edit";
      var positions = new Array();
      var pos = stringValue.indexOf("e");
      while (pos > -1) {
        positions.push(pos);
        pos = stringValue.indexOf("e", pos + 1);
      }
      function htmlEscape(text) {
        return text.replace(/[<>"&]/g, function (match, pos, originalText) {
          console.log(match, pos, originalText);
        });
      }

      console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
      var colorText = "red,blue,green,yellow";
      var colors1 = colorText.split(',');
      console.log('colors1 is', colors1);
      var colors2 = colorText.split(',', 2);
      console.log('colors2 is', colors2);
      var colors3 = colorText.split(/[^\,]+/);
      console.log('colrs3 is', colors3);
      var stringValue = "yellow";
      console.log('1', stringValue.localeCompare("brick"));
      console.log('2', stringValue.localeCompare('yellow'));
      console.log('3', stringValue.localeCompare('Zoo'));
      var book = {
        _year: 2004,
        edition: 1,
        test:'test'
      }
      Object.defineProperty(book,"year",{
        get:function () {
          return this._year;
        },
        set:function (newValue) {
          if(newValue>2014){
            this._year = newValue;
            this.edition += newValue -2004;
          }
        }
      })
      console.log(book);

      var book1 = {};
      Object.defineProperties(book1,{
        _year:{
          value:2004
        },
        edition:{
          value:1
        },
        year:{
          get:function () {
            return this._year;
          },
          set:function (newValue) {
            if(newValue>2004){
              this._year = newValue;
              this.edition += newValue - 2004;
            }
          }
        }
      });
      var descriptor = Object.getOwnPropertyDescriptor(book1,"_year");
      console.log('111111111111',descriptor.value);
      console.log('222222222222',descriptor.configurable);
      console.log('333333333333',typeof descriptor.get);

      var descriptor1 = Object.getOwnPropertyDescriptor(book1,"year");
      console.log('111111111111',descriptor1.value);
      console.log('222222222222',descriptor1.enumerable);
      console.log('333333333333',typeof descriptor1.get);
    },
    methods: {
      xia(sum){
        var obj = document.getElementById('webkfaid');
        obj.style.transition = "-webkit-transform 500ms ease-out";
        obj.style.webkitTransform = `translate3d(0px,${sum}px,20px) scale(1)`;
      },
      shang(sum){
        var obj = document.getElementById('webkfaid');
        obj.style.transition = "-webkit-transform 500ms ease-out";
        obj.style.webkitTransform = `translate3d(0px,${sum}px,0px) scale(1)`;
      },
      addSlideStyle(time, leftWidth){
        time = time || 0;
        leftWidth = leftWidth || 0;
        return `transition:-webkit-transform ${time}s ease-in-out;-webkit-transform:translate3d(${leftWidth}px,0,0);width:50px;height:50px;background:blue;`
      }
    }
  }
</script>
