<template>
  <div>
    <h1>DOM扩展</h1>
    <h2>Element类型</h2>
    <div class="test">
      <p>大王<span>叫我来讯上</span></p>
      <p>摩托</p>
      <p>猛兽</p>
    </div>
    <div class="bd user disabled">全职猎人</div>
    <button id="myButton">我的按钮</button>
    <div id="myDiv" data-appID="123456" data-myname="Nicholas">变形金刚</div>
    <div class="kid">小孩子</div>
    <ul class="Text">
      <li>大王</li>
      <li>叫我</li>
      <li>来</li>
      <li>巡山</li>
    </ul>
    <q>真的勇士</q>
    <input type="button" value="Click me" onclick="console.log(event)">

    <input type="button" value="Click me" onclick="console.log(value)">

    <form method="post">
      <input type="text" name="username" value="Marry">
      <input type="button" value="Echo Username" onclick="alert(username.value)">
    </form>

    <input type="button" id="myBtn" value="click me">
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'domExpand',
    data() {
      return {}
    },
    components: {},
    computed: {},
    mounted() {
//      console.log(document.querySelector('.test').childElementCount);
//      console.log(document.querySelector('.test').childNodes);
//      console.log(document.querySelector('.test').firstElementChild);
//      console.log(document.querySelector('.test').lastElementChild);
//      console.log(document.querySelector('.test').lastElementChild.previousElementSibling);
//      document.querySelector('.test').nextElementSibling.classList.remove('user');
      document.querySelector('.test').nextElementSibling.classList.add('current');
      console.log(document.querySelector('.test').nextElementSibling.classList);
      setTimeout(function () {
//        var button = document.getElementById('myButton');
//        button.focus();
//        console.log(document.activeElement
//
//
//
//
//
// === button);
        let div = document.getElementById('myDiv');
//        var appId = div.dataset.appId;
//        console.log('appId is', appId);
//        var myName = div.dataset.myname;
//        div.dataset.appId = 23456;
//        div.dataset.myname = 'Michael';
        div.innerHTML = 'hello & welcome, <b>\"reader\"</b>';
        var btn = document.getElementById('myBtn');
        btn.onclick = function (event) {
          console.log(event.type);
        }
        btn.addEventListener('click', function (event) {
          alert(event.type);
        }, false)
      }, 0)
      console.log(document.defaultCharset);
//      for (var i = 1; i <= 5; i++) {
//        (function (i) {
//          setTimeout(function () {
//            console.log(i);
//          },i*1000)
//        })(i)
//      }
//      for(var i=1;i<=5;i++){
//        let j = i;
//        setTimeout(function () {
//          console.log(j);
//        },j*1000);
//      }
      //模块
//      function CoolModule() {
//        var something = 'cool';
//        var another = [1,2,3];
//        function doSomething() {
//          console.log(something);
//        }
//        function doAnother() {
//          console.log(another.join('!'))
//        }
//
//        return {
//          doSomething : doSomething,
//          doAnother:doAnother
//        };
//      }
//      var foo = CoolModule();
//      foo.doSomething();
//      foo.doAnother();
//      var foo = (function CoolModule(id) {
//        function change() {
//          publicAPI.identify = identify2;
//        }
//        function identify1() {
//          console.log(id);
//        }
//        function identify2() {
//          console.log(id.toUpperCase());
//        }
//        var publicAPI = {
//          change:change,
//          identify:identify1
//        };
//        return publicAPI;
//      })('foo module');
//      foo.identify();
//      foo.change();
//      foo.identify();

      var MyModules = (function Manager() {
        var modules = {};

        function define(name, deps, impl) {   //名称，依赖和方法
          for (var i = 0; i < deps.length; i++) {   //依赖数组
            deps[i] = modules[deps[i]];   //依赖数组对象
          }
          console.log('deps is', deps);
          modules[name] = impl.apply(impl, deps);   //模块函数
        }

        function get(name) {
          return modules[name];
        }

        return {
          define: define,
          get: get,
          modules: modules,
        };
      })();
      MyModules.define('bar', [], function () {
        function hello(who) {
          return 'Let me introduce: ' + who;
        }

        return {
          hello: hello
        }
      })
      MyModules.define('foo', ['bar'], function (bar) {
        var hungry = 'hippo';

        function awesome() {
          console.log(bar.hello(hungry).toUpperCase());
        }

        return {
          awesome: awesome
        }
      })
      var bar = MyModules.get('bar');
      var foo = MyModules.get('foo');
      console.log(bar.hello('hippo'));
      console.log(foo);
      var add = function (x) {
        var sum = 1;
        var tmp = function (x) {
          console.log('1');
          sum = sum + x;
          console.log(sum);
          return tmp;
        }
//        tmp.toString = function () {
//          console.log(2);
//          return 3;
//        }
        return tmp;
      }
      console.log('11111', add(1)(2)(3));
      var test1 = (function () {
        var a = 1;

        function test() {
          console.log('测试', a++);
        }

        return test;
      })();
      test1();
      test1();
      //---------------------------------------
      var div1 = document.getElementsByClassName('test')[0];
      setTimeout(function () {
        var div2 = document.getElementById('myDiv');
        div2.insertAdjacentHTML('afterbegin', '<p>Hello world1!</p>');
      }, 0)

      div1.insertAdjacentHTML('afterend', '<p>Hello world!</p>');

      var itemsHtml = '';
      for (var i = 0; i < 10; i++) {
        itemsHtml += "<li>" + i + "</li>"
      }
      div1.innerHTML = itemsHtml;
      console.log(document.querySelector('.test').childElementCount);
      console.log(document.querySelector('.test').children.length);

      function test() {
        return true;
      }

      test();
      console.log('sdfasfasdfsadfasfs');

      console.log(document.querySelector('.Text').innerText);
      document.querySelector('.Text').innerText = 'Hello & welcome, <b>\"reader\"!</b>';

      function createXHR() {
        if (typeof XMLHttpRequest != 'undefined') {
          return new XMLHttpRequest();
        } else if (typeof ActiveXObject != 'undefined') {
          if (typeof arguments.callee.activeXString != 'string') {
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], i, len;
            for (i = 0, len = versions.length; i < len; i++) {
              try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
              } catch (ex) {

              }
            }
          }

          return new ActiveXObject(arguments.callee.activeXString);
        } else {
          throw new Error('No XHR object available.')
        }
      }

      var xhr = createXHR();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
          } else {
            alert('Request was unsuccessful:' + xhr.status)
          }
        }
      };
//      xhr.open('get','http://www.somewhere-else.com/page',true);
//      xhr.send();

//      var xhr = createXHR();
//      xhr.onreadystatechange = function () {
//        if (xhr.readyState == 4) {
//          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//            alert(xhr.responseText);
//          } else {
//            alert('Request was unsuccessful: ' + xhr.status);
//          }
//        }
//      }
//      xhr.open('get', '../example.txt', true);
//      xhr.send(null);

      var request = new XMLHttpRequest();
      console.log('jquery对象', $('.test')[0]);
      $(document).ready(function () {
        $('#search').click(function () {
          $.ajax({
            type: 'Get',
            url: 'service.php?number=' + $("#keyword").val(),
            dataType: 'json',
            success: function (data) {
              if (data.success) {
                $('#searchResult').html(data.msg);
              } else {
                $('#searchResult').html('出现错误：' + data.msg);
              }
            },
            error: function (jqXHR) {
              alert('发生错误：' + jqXHR.status);
            }
          })
        })
      })

      var EventUtil = {
        addHandler: function (element, type, handler) {
          if (element.addEventListener) {
            element.addEventListener('type', handler, false)
          } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
          } else {
            element['on' + type] = handler;
          }
        },
        removeHandler: function (element, type, handler) {
          if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
          } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
          } else {
            element['on' + type] = null;
          }
        }
      }
    },
    methods: {
      element1(){
        var i, len, child = element.firstChild;
        while (child != element.lastChild) {
          if (child.nodeType == 1) {
            processChild(child);
          }
          child = child.nextSibling;
        }
      },
      element2(){
        var i, len, child = element.firstElementChild;
        while (child != element.lastElementChild) {
          processChild(child);
          child = child.nextElementSibling;
        }
      },
      deleteClass(){
        var classNames = document.querySelector('.test').nextElementSibling.className.split(/\s+/);
        var pos = -1,
          i,
          len;
        for (i = 0, len = classNames.length; i < len; i++) {
          if (classNames[i] == 'user') {
            pos = i;
            break;
          }
        }
        classNames.splice(pos, 1);
        document.querySelector('.test').nextElementSibling.className = classNames.join(' ');
      },
      scrollView(){
        document.querySelector('.kid').scrollIntoView(false);
      },
      contains(refNode, otherNode){
        if (typeof refNode.contains == 'function' && (client.engine.webkit || client.engine.webkit >= 52)) {
          return refNode.contains(otherNode)
        } else if (typeof refNode.compareDocumentPosition == 'function') {
          return !!(refNode.compareDocumentPosition(otherNode) & 16)
        } else {
          var node = otherNode.parentNode;
          do {
            if (node === refNode) {
              return true;
            } else {
              node = node.parentNode;
            }
          } while (node !== null);
          return false;
        }
      },
      xdr(){
        var xdr = new XDomainRequest();
        xdr.onload = function () {
          alert(xdr.responseText);
        }
        xdr.open('get', 'http://libs.baidu.com/jquery/1.9.1/jquery.min.js');
        xdr.send();
      }
    }
  }
</script>
<style>

</style>
