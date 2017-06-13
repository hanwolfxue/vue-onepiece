<template>
  <div>
    <line-basis>
      事件修饰符
    </line-basis>
    <line-basis>
      阻止事件冒泡
    </line-basis>
    <div @click.self="out" style="width: 100%;height: 80px;background: #34a5f8">
      <div style="background: red;width: 100px;height: 70px" @click="inner">stop</div>
    </div>
    <line-basis>
      提交事件
    </line-basis>
    <form @submit.prevent="submitEvent">
      <input>
      <button type="submit" class="button button-raised button-primary button-pill">
        提交
      </button>
    </form>
    <line-basis>
      capture事件
    </line-basis>
    <div @click.capture="capture" style="height: 100px;width: 100%;background: #34a5f8">
      <div @click="capture1" style="width: 80px;height: 50px;background: red">capture1</div>
    </div>
    <line-basis>
      绑定enter时间
    </line-basis>
    <input @keyup.enter="enterEvent" v-model="enterText">
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <br>
    <span>Checked names: {{ checkedNames }}</span>
    <div id="example-4" class="demo">
      <input type="radio" id="one" value="One" v-model="picked">
      <label for="one">One</label>
      <br>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Two</label>
      <br>
      <span>Picked: {{ picked }}</span>
    </div>
    <input type="checkbox" v-model="toggle" :true-value="'a'" :false-value="'b'">
    {{toggle}}
    <line-basis>
      selected探究
    </line-basis>
    <select v-model="selected">
      <option v-for="option in options" :value="option.value">{{option.name}}</option>
    </select>
    {{selected}}
    <div>
      <input v-model.lazy="msg">
    </div>
    <div>
      <input v-model.trim="age">
    </div>
    <button @click="alertAge">1234</button>
    <span style="background: red">{{age}}</span>
    <currency-input v-model="price"></currency-input>
    <table>
      <limit></limit>
    </table>
    <div v-html="testModel"></div>
  </div>
</template>
<script>
  import lineBasis from './line-basis.vue'
  import currencyInput from './input-test.vue'
  import limit from './limit.vue'
  export default {
    name: 'vEvent',
    components: {
      lineBasis,
      currencyInput,
      limit
    },
    data(){
      return {
        enterText: 'Enter',
        checkedNames: [],
        picked: '',
        toggle: '',
        selected: 1,
        options: [
          {
            name: '轩辕剑', value: 1
          },
          {
            name: '泰阿剑', value: 2
          },
          {
            name: '鲨齿剑', value: 3
          }
        ],
        msg: '',
        age: '20岁',
        price: '12345'
      }
    },
    computed: {
      testModel: function () {
        return `123<ul>
              <li>大王叫我来巡山</li>
              </ul>${1 + 2}`;
      }
    },
    mounted: function () {
      var vm = this;
      var test = addrs =>`{
         <table>
         ${addrs.map(addr=>`
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
`).join('')}
</table>
}`;
      const data = [
        {first: '<Jane>', last: 'Bond'},
        {first: 'Lars', last: '<Croft>'},
      ];
      console.log(test(data))
    },
    methods: {
      out: function () {
        alert('out');
      },
      inner: function () {
        alert('inner')
      },
      submitEvent(){
        console.log('提交')
      },
      capture(){
        alert('capture');
      },
      capture1(){
        alert('capture1');
      },
      enterEvent(){
        alert('enter');
      },
      alertAge(){
        var vm = this;
        alert(vm.age);
      }
    }
  }
</script>
