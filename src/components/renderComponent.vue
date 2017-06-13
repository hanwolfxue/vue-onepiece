<script>
  import Vue from 'vue'
  export default {
    name:'renderComponent',
    data(){
      return {
        msg: 'message'
      }
    },
    render: function (createElement) {
      return createElement('div',
        {
          slot: 'name-of-slot'
        },
//        [this.$slots.default]
        [
          this.$scopedSlots.default({   //自己的作用域插槽
            text: this.msg
          }),
          createElement('child',
            {   //获取子组件的作用域插槽
              nativeOn: {
                click: function () {
                  alert('服你');
                }
              },
              scopedSlots: {
                default: function (props) {
                  return createElement('span', props.text);
                }
              }
            })
        ]
      )
//      Array.apply(null,{length:20}).map(function () {
//        return createElement('p','hi');
//      }))
//      return createElement(
//        'div',
//        {
//          'class': {
//            foo: true
//          },
//          style: {
//            background: 'blue'
//          },
//          attrs: {    //html属性
//            id: 'foo'
//          },
//          props: {    //组件pros值
//            myProp: 'bar123'
//          },
////          domProps: {
////            innerHTML: 'baz'
////          },
//          on: {
//            click: this.clickHandler
//          },
//          nativeOn: {
//            click: this.nativeClickHandler
//          },
//          scopedSlots: {
//            default: props => h('span', props.text)
//          },
//          ref: 'myRef'
//        },
//        [
//          createElement('h1', 'hello world'),
//          'bar'
//        ]
//      )
    },
    methods: {
      clickHandler(){
        alert('哇哈哈')
      },
      nativeClickHandler(){
        alert('咿呀呦');
      }
    }
//    props: {
//      level: {
//        type: Number,
//        required: true
//      }
//    }
//    render: function (createElement) {
//      var header = this.$slots.header;
//      var body = this.$slots.default;
//      var footer = this.$slots.footer;
//      return createElement('div', [
//        createElement('header', header),
//        createElement('main', body),
//        createElement('footer', footer)
//      ])
//    }
  }
  Vue.component('child', {
    template: '<div><slot text="hello world"></slot></div>'
  })
  var getChildrenTextContent = function (children) {    //获取子组件内容
    return children.map(function (node) {
      return node.children
        ? getChildrenTextContent(node.children)
        : node.text
    }).join('')
  }
  Vue.component('anchored-heading', {
    render: function (createElement) {
      // create kebabCase id
      var headingId = getChildrenTextContent(this.$slots.default)
        .toLowerCase()
        .replace(/\W+/g, '-')
        .replace(/(^\-|\-$)/g, '')
      return createElement(
        'h' + this.level,
        [
          createElement('a', {
            attrs: {
              name: headingId,
              href: '#' + headingId
            }
          }, this.$slots.default)
        ]
      )
    },
    props: {
      level: {
        type: Number,
        required: true
      }
    }
  })
  Vue.component('jsNative', {
    data(){
      return {
        items: [{name: '路飞'}, {name: '索隆'}, {name: '香吉士'}, {name: '娜美'}]
      }
    },
    render: function (createElement) {
      if (this.items.length) {
        return createElement('ul', this.items.map(function (item) {
            return createElement('li', item.name)
          }
        ))
      }
      else {
        return createElement('p', 'No items found.')
      }

    }
  })
  Vue.component('modelNative', {
    props: ['value'],
    render: function (createElement) {
      var self = this;
      return createElement('input', {
        domProps: {
          value: self.value
        },
        on: {
          input: function (event) {
            self.value = event.target.value;
            console.log('值是什么', self.value);
            self.$emit('input', event.target.value)
          }
        }
      })
    }
  })

  Vue.component('my-component', {
    functional: true,
    render: function (createElement, context) {
      return createElement(
        'h' + context.props.level,
        [context.slots().default,context.data]
      )
    },
    props: {
      level: {
        type: Number,
        required: true
      }
    },
    mounted(){
    }
  })
</script>
<style scoped>
  .foo {
    color: red;
  }

  .bar {
    color: blue;
  }
</style>
