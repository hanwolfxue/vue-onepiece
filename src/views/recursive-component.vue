<template>
  <div>
    <h1>欢迎来到递归菜单</h1>
    <ul v-for="menuItem in theModel">
      <my-tree :model="menuItem"></my-tree>
    </ul>
  </div>
</template>
<script>
  import myTree from '../components/treeMenu.vue'
  export default {
    name:'recursiveComponent',
    components: {
      myTree
    },
    data(){
      return {
        theModel: [
          {
            'id': '1',
            'menuName': '基础管理',
            'menuCode': '10',
            'children': [
              {
                'menuName': '用户管理',
                'menuCode': '11'
              },
              {
                'menuName': '角色管理',
                'menuCode': '12',
                'children': [
                  {
                    'menuName': '管理员',
                    'menuCode': '121'
                  },
                  {
                    'menuName': 'CEO',
                    'menuCode': '122'
                  },
                  {
                    'menuName': 'CFO',
                    'menuCode': '123'
                  },
                  {
                    'menuName': 'COO',
                    'menuCode': '124'
                  },
                  {
                    'menuName': '普通人',
                    'menuCode': '124'
                  }
                ]
              },
              {
                'menuName': '权限管理',
                'menuCode': '13'
              }
            ]
          },
          {
            'id': '2',
            'menuName': '商品管理',
            'menuCode': ''
          },
          {
            'id': '3',
            'menuName': '订单管理',
            'menuCode': '30',
            'children': [
              {
                'menuName': '订单列表',
                'menuCode': '31'
              },
              {
                'menuName': '退货列表',
                'menuCode': '32',
                'children': []
              }
            ]
          },
          {
            'id': '4',
            'menuName': '商家管理',
            'menuCode': '',
            'children': []
          }
        ]
      }
    }
  }
</script>
