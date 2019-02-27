<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <!-- <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link> -->
      <el-submenu :index="item.name||item.path" :key="item.name" v-if="roles&&(item.roleType.indexOf(roles.saasRoleType)!=-1)">
        <template slot="title">
          <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
          <i v-if="item.meta&&item.meta.icon" class="icon iconfont mr-5" :class="'icon-'+item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <!-- <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon> -->
              <span class="mr-5"></span>
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
    // roles:{
    //   getter(){
    //     console.log(this.$store.getters.roles,99999)
    //   },
    //   setter(){

    //   }
    // }
  },

  created(){
  },

  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  }

}
</script>
<style scoped lang="scss">
  .iconfont {
    color: rgb(191, 203, 217);
    display: inline-block;
    vertical-align: middle;
  }

  .is-opened {
    .el-submenu__title {
      i,
      span {
        color: #00B9B4 !important;
      }
    }
  }

  .circle {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    vertical-align: middle;
    box-sizing: border-box;
    border: 1px solid rgb(191, 203, 217);
  }

  #app .sidebar-container .el-submenu .el-menu-item {
    span {
      color: #999999;
    }
  }

  #app .sidebar-container .el-submenu .el-menu-item.is-active {
    background-color: #F3FBFB !important;
    border-right:2px solid #00B9B4;
    box-sizing:border-box;
    span {
      color: #00B9B4;
    }
    .circle {
      background-color: #ffffff;
    }
  }

  .el-menu--popup .is-active {
    span {
      color: rgba(26, 169, 123, 1) !important;
    }
  }
</style>