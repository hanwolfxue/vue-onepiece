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
    <div v-html="imgText"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'nodeLevel',
    data() {
      return {
        imgText:'<img src="data:image/png;base64,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⋯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" >;'

    }
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
