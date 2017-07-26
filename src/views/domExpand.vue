<template>
  <div>
    <h1>节点层次</h1>
    <h2>Element类型</h2>
    <div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr" my_special_attribute="hello" my="test"
         style="color: red;font-weight: 700" onclick="alert('依依')">
      大王叫我来巡山
    </div>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <h6>h6</h6>
    <em>em</em>
    <p id="p">foobar</p>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'nodeLevel',
    data() {
      return {}
    },
    components: {},
    computed: {},
    mounted() {
//      var script = document.createElement('script');
//      script.type='text/javascript';
//      script.text = "function sayHi(){alert('hi')}";
//      document.body.appendChild(script);
//      setInterval(function () {
//        document.getElementById('s1').src = 'static/test.js';   //此种方法只会执行一次
//      },1000);
//      setTimeout(function () {    //会覆盖其他代码
//        document.write('<script src="static/test.js">'+'<\/script>');
//      },500)
//      setInterval(function () {   //可以重复执行
//        if(document.getElementById('s1')){
//          document.getElementById('s1').remove();
//        }
//        var script = document.createElement('script');
//        script.src = 'static/test.js';
//        script.id = 's1';
//        document.body.appendChild(script);
//      },1000);
      setTimeout(function () {
        var div = document.getElementById('myDiv');
//        console.log(div.tagName);
//        console.log(div.nodeName);
//        if (div.tagName.toLowerCase() == 'div') {
//          console.warn('123123')
//        }
//        console.log(div.id);
//        console.log(div.className);
//        console.log(div.title);
//        console.log(div.lang);
//        console.log(div.dir);
//        console.log(div.getAttribute('my_special_attribute'));
//        console.log(div.getAttribute('my'));
//
//        console.log('特殊特性----------------------------');
//        console.log(div.style);
//        console.log(div.getAttribute('style'));
//        console.log(div.onclick);
//        console.log(div.getAttribute('onclick'));
//        div.setAttribute('id','someOtherId');
//        div.setAttribute('class','ft');
//        div.setAttribute('title','Some other text');
//        div.setAttribute('lang','fr');
//        div.setAttribute('dir','rtl');
        console.log(document.getElementById('myDiv').attributes.getNamedItem('id').nodeValue);
        console.log(document.getElementById('myDiv').attributes['id'].nodeValue);
        console.log(outputAttributes(div));
        console.log('222', div.firstChild.data);

        var p = document.getElementById('p');
        var textnode = p.firstChild;

        // 将原文本节点分割成为内容分别为foo和bar的两个文本节点
        var replacementNode = textnode.splitText(3);
        console.log('replacem', replacementNode);

        console.log('replacem1', textnode);
        // 创建一个包含了内容为' span contents '的文本节点的span元素
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(' span contents '));

        // 将span元素插入到后一个文本节点('bar')的前面
        p.insertBefore(span, replacementNode);
      }, 0)

      var element = document.createElement('div');
      element.className = 'message';
      var textNode = document.createTextNode('hello world');
      element.appendChild(textNode);

      var anotherTextNode = document.createTextNode('Yippee!');
      element.appendChild(anotherTextNode);

      document.body.appendChild(element);
      console.log(document.getElementsByClassName('message')[0].childNodes);
      console.log('111', element.childNodes.length);

      element.normalize();
      console.log('222', element.childNodes.length);

      function outputAttributes(element) {
        var pairs = [],
          attrName,
          attrValue,
          i,
          len;

        for (i = 0; i < element.attributes.length; i++) {
          attrName = element.attributes[i].nodeName;
          attrValue = element.attributes[i].nodeValue;
          if (element.attributes[i].specified) {
            pairs.push(attrName + "=\"" + attrValue + "\"");
          }
        }
        return pairs.join(" ");
      }

//      function foo(str, a) {
//        setTimeout(str,0);
//        eval( str ); // 欺骗!
//        console.log( a, b );
//      }
//      var b = 2;
//      foo( "var b = 3;", 1 ); // 1, 3

      function convertToArray(nodes) {
        var array = null;
        try {
          array = Array.prototype.slice.call(nodes, 0);     //针对非ie浏览器
        } catch (ex) {
          array = new Array();
          for (var i = 0, len = nodes.length; i < len; i++) {
            array.push(nodes[i]);
          }
        }

        return array;
      }

      let a = [1, 2, {name:3}, 4, 5, 6];
      let sliced = a.slice();
      console.log('源对象', a);
      console.log('现对象', sliced);
      sliced[0] = 33;
      console.log('源对象1', a);
      console.log('现对象1', sliced);
      console.log(document.querySelectorAll('p').length);
      var p = document.createElement('p');
      var pText = document.createTextNode('11111');
      p.appendChild(pText);
      document.body.appendChild(p);
      console.log(document.querySelectorAll('p').length);

//      for(let i = 0;i<document.querySelectorAll('p').length;i++){
//        var p = document.createElement('p');
//        var pText = document.createTextNode('11111');
//        p.appendChild(pText);
//        document.body.appendChild(p);
//      }
    },
    methods: {
      loadScript(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
      },
      loadScriptString(code) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        try {
          script.appendChild(document.createTextNode(code))
        } catch (ex) {
          script.text = code;
        }
      },
      loadStyles(url){
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(link);
      },
      loadStyleString(css){
        var style = document.createElement('style');
        style.type = 'text/css';
        try {
          style.appendChild(document.createTextNode(css));
        } catch (ex) {
          style.stylesheet.cssText = css;
        }
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
      },
      test(){
        console.log('a is', a);
      },
      addTable(){
        var table = document.createElement('table');
        table.border = 1;
        table.width = '100%';

        var tbody = document.createElement('tbody');
        table.appendChild(tbody);

        tbody.insertRow(0);
        tbody.rows[0].insertCell(0);
        tbody.rows[0].cells[0].appendChild(document.createTextNode('Cell 1,1'));
        tbody.rows[0].insertCell(1);
        tbody.rows[0].cells[0].appendChild(document.createTextNode('Cell 2,1'));

        tbody.insertRow(1);
        tbody.rows[1].insertCell(0);
        tbody.rows[1].cells[0].appendChild(document.createTextNode('Cell 1,2'));
        tbody.rows[1].insertCell(1);
        tbody.rows[1].cells[1].appendChild(document.createTextNode('Cell 2,2'));

        document.body.appendChild(table);
      }
    }
  }
</script>
<style>

</style>
