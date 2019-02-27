import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/',
  name: 'Login',
  component: () =>
      import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  hidden: true,
  component: () =>
      import('@/views/404')
}, {
  path: '/dashboard',
  component: Layout,
  redirect: '/example',
  name: 'Dashboard',
  roleType: [],
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () =>
        import('@/views/dashboard/index')
  }]
}, {
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  roleType: [0],
  meta: {
    title: '账号管理',
    icon: 'zizhanghao'
  },
  children: [{
    path: 'tree',
    name: 'Tree',
    component: () =>
        import('@/views/accountmanage/tree'),
    meta: {
      title: '账号列表',
      icon: 'tree'
    }
  }, {
    path: 'apply',
    name: 'Apply',
    component: () =>
        import('@/views/accountmanage/apply'),
    meta: {
      title: '申请列表',
      icon: 'tree'
    }
  }, {
    path: 'addtable',
    name: 'addTable',
    hidden: true,
    component: () =>
        import('@/views/accountmanage/table'),
    meta: {
      title: '添加客户账号',
      icon: 'table'
    }
  }, {
    path: 'detail',
    name: 'Detail',
    hidden: true,
    component: () =>
        import('@/views/accountmanage/detail'),
    meta: {
      title: '客户账号详情',
      icon: 'table'
    }
  }]
}, {
  path: '/content',
  component: Layout,
  name: 'content',
  roleType: [0],
  meta: {
    title: '内容管理',
    icon: 'kechengguanli'
  },
  children: [{
    path: 'oneCatolog',
    name: 'oneCatolog',
    component: () =>
          import('@/views/content/contentClass/oneCatolog'),
    meta: {
      title: '内容分类',
      icon: 'form'
    }
  }, {
    path: 'twoCatolog',
    name: 'twoCatolog',
    hidden: true,
    component: () =>
          import('@/views/content/contentClass/twoCatolog'),
    meta: {
      title: '内容分类',
      icon: 'form'
    }
  },
    // {
    //   path: 'courseAdmin',
    //   name: 'courseAdmin',
    //   component: () =>
    //     import('@/views/content/courseAdmin'),
    //   meta: {
    //     title: '课程管理',
    //     icon: 'form'
    //   },
    //   hidden:true,
    // },
  {
    path: 'review',
    name: 'Review',
    component: () =>
          import('@/views/classes/review'),
    meta: {
      title: '课程管理',
      icon: 'form'
    }
  },
  {
    path: 'columnlist',
    name: 'ColumnList',
    component: () =>
          import('@/views/Column/columnList'),
    meta: {
      title: '专栏管理',
      icon: 'tree'
    }
  }, {
    path: 'columnintroduce',
    name: 'ColumnIntroduce',
    hidden: true,
    component: () => import('@/views/Column/columnIntroduce'),
    meta: {
      title: '专栏介绍',
      icon: 'tree'
    }
  }, {
    path: 'columncontent',
    name: 'Columncontent',
    hidden: true,
    component: () => import('@/views/Column/columnContent'),
    meta: {
      title: '专栏内容',
      icon: 'tree'
    }
  }, {
    path: 'columngraphic',
    name: 'ColumnGraphic',
    hidden: true,
    component: () => import('@/views/Column/columnGraphic'),
    meta: {
      title: '图文信息',
      icon: 'tree'
    }
  }

    // {
    //   path: 'columnAdmin',
    //   name: 'columnAdmin',
    //   component: () =>
    //     import('@/views/content/columnAdmin'),
    //   meta: {
    //     title: '专栏管理',
    //     icon: 'form'
    //   },
    // hidden:true,
  ]
}, {
  path: '/distribution',
  component: Layout,
  name: 'distribution',
  roleType: [0],
  meta: {
    title: '分销中心',
    icon: 'fenxiaozhongxin'
  },
  children: [{ // 分销商品
    path: 'commodityGoods',
    name: 'commodityGoods',
    component: () =>
          import('@/views/distribution/commodityDistribution/index/commodityGoods'),
    meta: {
      title: '分销商品',
      icon: 'form'
    }
  },
  { // 商品审核
    path: 'checkGoods',
    name: 'checkGoods',
    hidden: true,
    component: () =>
          import('@/views/distribution/commodityDistribution/index/checkGoods'),
    meta: {
      title: '分销商品',
      icon: 'form'
    }
  }, { // 违规商品
    path: 'illegalGoods',
    name: 'illegalGoods',
    hidden: true,
    component: () =>
          import('@/views/distribution/commodityDistribution/index/illegalGoods'),
    meta: {
      title: '分销商品',
      icon: 'form'
    }
  }, { // 首页推荐
    path: 'recommendList',
    name: 'recommendList',
    hidden: true,
    component: () =>
          import('@/views/distribution/commodityDistribution/index/recommendList'),
    meta: {
      title: '分销商品',
      icon: 'form'
    }
  }, { // 商品详情
    path: 'commodityDetail',
    name: 'commodityDetail',
    hidden: true,
    component: () =>
          import('@/views/distribution/commodityDistribution/commodityDetail'),
    meta: {
      title: '分销商品',
      icon: 'form'
    }
  }, { // 目录内容
    path: 'contentCatolog',
    name: 'contentCatolog',
    hidden: true,
    component: () =>
          import('@/views/distribution/commodityDistribution/contentCatolog'),
    meta: {
      title: '分销商品',
      icon: 'form'
    }
  }, { // 内容详情
    path: 'contentDetail',
    name: 'contentDetail',
    hidden: true,
    component: () =>
          import('@/views/distribution/commodityDistribution/contentDetail'),
    meta: {
      title: '内容详情',
      icon: 'form'
    }
  }, {
    path: 'pushList',
    name: 'pushList',
    component: () =>
          import('@/views/distribution/push/pushList'),
    meta: {
      title: '推客列表',
      icon: 'form'
    }
  }, {
    path: 'distributionOrder',
    name: 'distributionOrder',
    component: () =>
          import('@/views/distribution/distributionOrder'),
    meta: {
      title: '分销订单',
      icon: 'form'
    }
  }, {
    path: 'merchantSettlement',
    name: 'merchantSettlement',
    component: () =>
          import('@/views/distribution/settlement/merchantSettlement'),
    meta: {
      title: '商户结算',
      icon: 'form'
    }
  }, {
    path: 'merchantSettlementDetails',
    name: 'merchantSettlementDetails',
    hidden: true,
    component: () =>
          import('@/views/distribution/settlement/merchantSettlementDetails'),
    meta: {
      title: '结算记录',
      icon: 'form'
    }
  }, {
    path: 'settlementDetails',
    name: 'settlementDetails',
    hidden: true,
    component: () =>
          import('@/views/distribution/settlement/settlementDetails'),
    meta: {
      title: '结算详情',
      icon: 'form'
    }
  }, {
    path: 'transferApplication',
    name: 'transferApplication',
    hidden: true,
    component: () =>
          import('@/views/distribution/settlement/transferApplication'),
    meta: {
      title: '转账申请',
      icon: 'form'
    }
  }, {
    path: 'transferRecord',
    name: 'transferRecord',
    hidden: true,
    component: () =>
          import('@/views/distribution/settlement/transferRecord'),
    meta: {
      title: '转账记录',
      icon: 'form'
    }
  }, {
    path: 'pushOrder',
    name: 'pushOrder',
    component: () =>
          import('@/views/distribution/push/pushOrder'),
    meta: {
      title: '推客结算',
      icon: 'form'
    }
  }, {
    path: 'pushRecord',
    name: 'pushRecord',
    hidden: true,
    component: () =>
          import('@/views/distribution/push/pushRecord'),
    meta: {
      title: '结算记录',
      icon: 'form'
    }
  }, {
    path: 'pushRecordDetails',
    name: 'pushRecordDetails',
    hidden: true,
    component: () =>
          import('@/views/distribution/push/pushRecordDetails'),
    meta: {
      title: '结算详情',
      icon: 'form'
    }
  }, {
    path: 'configuration',
    name: 'configuration',
    component: () =>
          import('@/views/distribution/configuration/configuration2'),
    meta: {
      title: '公众号配置',
      icon: 'form'
    }
  }, {
    path: 'paySettings',
    name: 'paySettings',
    hidden: true,
    component: () =>
          import('@/views/distribution/configuration/paySettings'),
    meta: {
      title: '支付设置',
      icon: 'form'
    }
  }, {
    path: 'management',
    name: 'management',
    hidden: true,
    component: () =>
          import('@/views/distribution/configuration/management'),
    meta: {
      title: '图文管理',
      icon: 'form'
    }
  }, {
    path: 'graphicEditing',
    name: 'graphicEditing',
    hidden: true,
    component: () =>
          import('@/views/distribution/configuration/graphicEditing'),
    meta: {
      title: '赚钱秘籍',
      icon: 'form'
    }
  }, {
    path: 'editingDetails',
    name: 'editingDetails',
    hidden: true,
    component: () =>
          import('@/views/distribution/configuration/editingDetails'),
    meta: {
      title: '赚钱秘籍',
      icon: 'form'
    }
  }, {
    path: 'qrCode',
    name: 'qrCode',
    hidden: true,
    component: () =>
          import('@/views/distribution/configuration/qrCode'),
    meta: {
      title: '客服二维码',
      icon: 'form'
    }
  }, {
    path: 'indexSwiper',
    name: 'indexSwiper',
    hidden: true,
    component: () =>
          import('@/views/distribution/configuration/indexSwiper'),
    meta: {
      title: '首页轮播图',
      icon: 'form'
    }
  }, {
    path: 'addSwiper',
    name: 'addSwiper',
    hidden: true,
    component: () =>
          import('@/views/distribution/configuration/addSwiper'),
    meta: {
      title: '添加轮播图',
      icon: 'form'
    }
  }, {
    path: 'edtingSwiper',
    name: 'edtingSwiper',
    hidden: true,
    component: () =>
          import('@/views/distribution/configuration/edtingSwiper'),
    meta: {
      title: '编辑轮播图',
      icon: 'form'
    }
  }, {
    path: 'pushListDetails',
    name: 'pushListDetails',
    hidden: true,
    component: () =>
          import('@/views/distribution/push/pushListDetails'),
    meta: {
      title: '推客详情',
      icon: 'form'
    }
  }, {
    path: 'distributionOrderDetails',
    name: 'distributionOrderDetails',
    hidden: true,
    component: () =>
          import('@/views/distribution/distributionOrderDetails'),
    meta: {
      title: '分销订单详情',
      icon: 'form'
    }
  }
  ]
}, {
  path: '/form',
  component: Layout,
  name: 'From',
  roleType: [0],
  hidden: true,
  meta: {
    title: '课程管理',
    icon: 'kechengguanli'
  },
  children: [{
    path: 'classtree',
    name: 'Classtree',
    component: () =>
        import('@/views/classes/classtree'),
    meta: {
      title: '课程分类',
      icon: 'form'
    }
  }, {
    path: 'review',
    name: 'Review',
    component: () =>
        import('@/views/classes/review'),
    meta: {
      title: '课程审核',
      icon: 'form'
    }
  }, {
    path: 'classdetail',
    name: 'Classdetail',
    hidden: true,
    component: () =>
        import('@/views/classes/classdetail'),
    meta: {
      title: '课程详情',
      icon: 'form'
    }
  }]
}, {
  path: '/template',
  component: Layout,
  redirect: '/template/index',
  name: '模版管理',
  roleType: [0],
  meta: {
    title: '模版管理',
    icon: 'xiaochengxu'
  },
  children: [{
    path: 'index',
    name: 'templateIndex',
    component: () =>
        import('@/views/template/index'),
    meta: {
      title: '预览模版',
      icon: 'template'
    }
  }, {
    path: 'addtemplate/:id?',
    name: 'addtemplate',
    component: () =>
        import('@/views/template/addtemplate'),
    meta: {
      title: '添加模版',
      icon: 'template'
    }
  }, {
    path: 'templateinfo/:id',
    name: 'templateinfo',
    hidden: true,
    component: () =>
        import('@/views/template/templateinfo'),
    meta: {
      title: '模板详情',
      icon: 'template'
    }
  }]
}, {
  path: '/usermanage',
  component: Layout,
  redirect: '/usermanage/Celebrity',
  meta: {
    title: '用户管理',
    icon: 'zizhanghao'
  },
  roleType: [10],
  children: [{
    path: 'editcelebrity',
    name: 'Editcelebrity',
    hidden: true,
    component: () =>
        import('@/views/UserManage/editcelebrity'),
    meta: {
      title: '添加大咖',
      icon: 'template'
    }
  }, {
    path: 'showcelebrity',
    name: 'Showcelebrity',
    hidden: true,
    component: () =>
        import('@/views/UserManage/showcelebrity'),
    meta: {
      title: '大咖详情',
      icon: 'template'
    }
  }, {
    path: 'celebrity',
    name: 'Celebrity',
    component: () =>
        import('@/views/UserManage/celebrity'),
    meta: {
      title: '知名大咖',
      icon: 'template'
    }
  }]
}, {
  path: '/megagame',
  component: Layout,
  redirect: '/megagame/game',
  meta: {
    title: '大赛管理',
    icon: 'chuangyedasai'
  },
  roleType: [10],
  children: [{
    path: 'game',
    name: 'Game',
    component: () =>
        import('@/views/Megagame/game'),
    meta: {
      title: '参赛作品',
      icon: 'template'
    }
  }, {
    path: 'statistics',
    name: 'Statistics',
    component: () =>
        import('@/views/Megagame/statistics'),
    meta: {
      title: '投票统计',
      icon: 'template'
    }
  }, {
    path: 'setting',
    name: 'Setting',
    hidden: true,
    component: () =>
        import('@/views/Megagame/setting'),
    meta: {
      title: '投票设置',
      icon: 'template'
    }
  }]
}, {
  path: '/operationmanage',
  component: Layout,
  redirect: '/operationmanage/graphic',
  meta: {
    title: '运营管理',
    icon: 'yunyingguanli'
  },
  roleType: [10],
  children: [{
    path: 'graphic',
    name: 'Graphic',
    component: () =>
        import('@/views/OperationManage/graphic'),
    meta: {
      title: '图文管理',
      icon: 'template'
    }
  }, {
    path: 'editGraphic',
    name: 'EditGraphic',
    hidden: true,
    component: () =>
        import('@/views/OperationManage/editGraphic'),
    meta: {
      title: '添加图文',
      icon: 'template'
    }
  }, {
    path: 'showGraphic',
    name: 'ShowGraphic',
    hidden: true,
    component: () =>
        import('@/views/OperationManage/showGraphic'),
    meta: {
      title: '添加图文',
      icon: 'template'
    }
  }, {
    path: 'channel',
    name: 'Channel',
    component: () =>
        import('@/views/OperationManage/channel'),
    meta: {
      title: '渠道管理',
      icon: 'template'
    }
  }, {
    path: 'editchannel',
    name: 'EditChannel',
    hidden: true,
    component: () =>
        import('@/views/OperationManage/editChannel'),
    meta: {
      title: '添加渠道',
      icon: 'template'
    }
  }]
},
{
  path: '/settingmanage',
  component: Layout,
  redirect: '/settingmanage/slider',
  meta: {
    title: '设置管理',
    icon: 'xiaoxi'
  },
  roleType: [10],
  children: [{
    path: 'slider',
    name: 'Slider',
    component: () =>
        import('@/views/SettingManage/slider'),
    meta: {
      title: '轮播图',
      icon: 'template'
    }
  }, {
    path: 'userinfo',
    name: 'Userinfo',
    hidden: true,
    component: () =>
        import('@/views/SettingManage/userinfo'),
    meta: {
      title: '账户信息',
      icon: 'template'
    }
  }]
}, {
  path: '/flow',
  component: Layout,
  redirect: '/flow/flowaccount',
  meta: {
    title: '流量管理',
    icon: 'xiaoxi'
  },
  roleType: [0],
  children: [{
    path: 'flowaccount',
    name: 'FlowAccount',
    component: () =>
        import('@/views/Flow/flowAccount'),
    meta: {
      title: '流量账户',
      icon: 'template'
    }
  }, {
    path: 'flowrules',
    name: 'FlowRules',
    component: () =>
        import('@/views/Flow/flowRules'),
    meta: {
      title: '流量规则',
      icon: 'template'
    }
  }, {
    path: 'flowdetail',
    name: 'FlowDetail',
    hidden: true,
    component: () =>
        import('@/views/Flow/flowDetail'),
    meta: {
      title: '流量规则',
      icon: 'template'
    }
  }]
}, {
  path: '/column',
  component: Layout,
  redirect: '/column/columnlist',
  hidden: true,
  roleType: [0],
  meta: {
    title: '专栏管理',
    icon: 'banbenguanli'
  },
  children: [{
    path: 'columnlist',
    name: 'ColumnList',
    component: () =>
        import('@/views/Column/columnList'),
    meta: {
      title: '专栏列表',
      icon: 'tree'
    }
  }, {
    path: 'columnintroduce',
    name: 'ColumnIntroduce',
    hidden: true,
    component: () => import('@/views/Column/columnIntroduce'),
    meta: {
      title: '专栏介绍',
      icon: 'tree'
    }
  }, {
    path: 'columncontent',
    name: 'Columncontent',
    hidden: true,
    component: () => import('@/views/Column/columnContent'),
    meta: {
      title: '专栏内容',
      icon: 'tree'
    }
  }, {
    path: 'columngraphic',
    name: 'ColumnGraphic',
    hidden: true,
    component: () => import('@/views/Column/columnGraphic'),
    meta: {
      title: '图文信息',
      icon: 'tree'
    }
  }]
},
{
  path: '/message',
  component: Layout,
  redirect: '/Message/message',
  name: 'Message',
  roleType: [0],
  meta: {
    title: '消息中心',
    icon: 'banbenguanli'
  },
  children: [{
    path: 'messagecenter',
    name: 'messageCenter',
    component: () =>
        import('@/views/Message/message'),
    meta: {
      title: '通知中心',
      icon: 'tree'
    }
  }]
},
{
  path: '/Edition',
  component: Layout,
  redirect: '/Edition/edition',
  name: 'Edition',
  roleType: [0],
  meta: {
    title: '版本管理',
    icon: 'banbenguanli'
  },
  children: [{
    path: 'edition',
    name: 'edition',
    component: () =>
      import('@/views/Edition/edition'),
    meta: {
      title: '版本设置',
      icon: 'tree'
    }
  }, {
    path: 'editionDetail',
    name: 'EditionDetail',
    hidden: true,
    component: () => import('@/views/Edition/editionDetail'),
    meta: {
      title: '查看功能配置',
      icon: 'tree'
    }
  }, {
    path: 'editionSetting',
    name: 'EditionSetting',
    hidden: true,
    component: () =>
      import('@/views/Edition/editionSetting'),
    meta: {
      title: '配置功能',
      icon: 'tree'
    }
  }]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
export default new Router({
  mode: 'history', // 后端支持可开
  base: '/vue-plat',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
