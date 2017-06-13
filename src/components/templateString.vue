<template>
  <div>
    模板字符串
    <div v-html="template">
    </div>
    <div id="result" class="flex-box" v-html="result">

    </div>
    <div v-html="message">

    </div>
    <!--<div>-->
    <!--{{message}}-->
    <!--</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:'templateString',
    data(){
      return {
        string1: `In Javascript is a line-feed.`,
        template: '',
        message: '',
        sender: '<>',
        test: '<>',
        result: ''
      }
    },
    computed: {
      string2(){
        return `${this.hello()}`
      }
    },
    mounted(){
      var vm = this;
      let data = {
        supplies: [1, 2, 3, 4, 5]
      }
      this.template = `
<ul>
  <% for(var i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
      let a = 5;
      let b = 10;

      function tag(s, value1, value2) {
        return s[0] + value1 + s[1] + value2
      }

      console.log('tag模板', tag`Hello ${a + b} world ${a * b}`);

      var total = 30;
      var msg = passthru`The total is ${total} (${total * 1.05} with tax)`;

      function passthru(literals) {
        var result = '';
        var i = 0;
        console.log('literals is', literals);
        console.log('arguments is', arguments);
        while (i < literals.length) {
          result += literals[i++];    //拼接字符串
          if (i < arguments.length) {   //literals为字符串数组，arguments为所有参数
            result += arguments[i];
          }
        }
        return result;
      }

      console.log('msg is', msg);
      vm.message =
        SaferHTML`<p>${vm.sender} has sent you a message.</p>`;

      function SaferHTML(templateData) {
        var s = templateData[0];
        console.log('arguments is', arguments);
        for (var i = 1; i < arguments.length; i++) {
          var arg = String(arguments[i]);

          // Escape special characters in the substitution.
          s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          // Don't escape special characters in the template.
          s += templateData[i];
        }
        console.log('s is', s);
        return s;
      }

      let name = '经典动漫';
      let value = '全职猎人';
//      vm.result = '<div>' + name + '</div>' + '<div>' + value + '</div>';
      vm.result = `<div>${name}</div><div>${value}</div>`;
//      vm.$http.get('/hmall-sms-service/mobile/send/' + this.user + '?code=' + this.code, {}).then(function (resp) {
//
//      })
//      vm.$http.get(`/hmall-sms-service/mobile/send/${this.user}?code=${this.code}`, {}).then(function (resp) {
//
//      })
      function fn() {
        return "Hello World";
      }
      console.log('fn is',`${fn()}`);   //输出Hello World
    },
    methods: {
      hello(){
        return 'hello world'
      }
    }
  }
</script>
