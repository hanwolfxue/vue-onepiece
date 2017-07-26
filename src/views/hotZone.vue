<template>
  <div>
    <h1>热区</h1>
    <img src="../assets/bookshelf.png" style="width: 8rem;height: 8rem;margin-left: 0.8rem" alt="新书架"
         usemap="#newbook" class="newbook">
    <map name="newbook" id="newbook">
      <area shape="rect" coords="0,0,200,200" href="http://item.jd.com/10951037.html" target="_blank"
            alt="JavaScript高级程序设计" title="JavaScript高级程序设计。">
      <area shape="rect" coords="200,0,400,200" href="http://item.jd.com/12030814.html" target="_blank"
            alt="你不知道的javascript" title="你不知道的javascript。">
      <area shape="rect" coords="400,0,600,200" href="http://item.jd.com/11911279.html" target="_blank" alt="css揭秘"
            title="css揭秘">
    </map>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'hotZone',
    data() {
      return {}
    },
    components: {},
    computed: {},
    mounted() {
      var newbook = document.getElementsByClassName('newbook')[0],
        everWidth = (newbook.clientWidth / 3).toFixed(2),
        fontSize = document.documentElement.style.fontSize.replace('px', ''),
        timeout = null;//onresize触发次数过多，设置定时器;
      console.log('everWidth', newbook.style.width);
      setTimeout(function () {
        console.log(document.getElementById('newbook').getElementsByTagName('area'));
        adjust();
      }, 0)

      window.onresize = function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          window.location.reload();
        }, 100);//页面大小变化，重新加载页面以刷新MAP
      }
      //获取MAP中元素属性
      function adjust() {
        var map = document.getElementById("newbook");
        var element = map.areas;
        var itemNumber = element.length;
        for (var i = 0; i < itemNumber; i++) {
          var oldCoords = element[i].coords;
          var newcoords = adjustPosition(i, oldCoords);
          element[i].setAttribute("coords", newcoords);
        }
      }

      //调整MAP中坐标
      function adjustPosition(i, position) {
        var each = position.split(',');
        each[0] = i * everWidth;
        each[1] = 0;
        each[2] = (i + 1) * everWidth;
        each[3] = 200;
        //生成新的坐标点
        var newPosition = "";
        for (var j = 0; j < each.length; j++) {
          newPosition += each[j];
          if (j < each.length - 1) {
            newPosition += ",";
          }
        }
        return newPosition;
      }
    },
    methods: {
      toArea1(){
        window.open('http://item.jd.com/10951037.html', '_blank');
      },
      toArea2(){
        window.open('http://item.jd.com/12030814.html', '_blank');
      },
      toArea3(){
        window.open('http://item.jd.com/11911279.html', '_blank');
      }
    }
  }
</script>
<style>

</style>
