<template>
  <li>
    <span @click="toggle">
      <i v-if="isFolder" class="icon" :class="[open?'folder-open':'folder']"></i>
      <i v-if="!isFolder" class="icon file-text"></i>
      {{model.menuName}}
    </span>
    <ul v-show="open" v-if="isFolder">
      <tree-menu v-for="item in model.children" :model="item" :key="item.id"></tree-menu>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'treeMenu',
    props: ['model'],
    data(){
      return {
        open: false,
        isFolder: true
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length    //存在children,用于关闭递归
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open;
        }
      }
    }
  }
</script>
<style>
  ul {
    list-style: none;
  }

  i.icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }

  .icon.folder {
    background-image: url(../assets/folder.png);
  }

  .icon.folder-open {
    background-image: url(../assets/folder-open.png);
  }

  .icon.file-text {
    background-image: url(../assets/file-text.png);
  }

  .tree-menu li {
    line-height: 1.5;
  }
</style>
