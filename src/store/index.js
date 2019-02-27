import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import usertable from './modules/usertable'
import template from './modules/template'
import upload from './modules/upload'
import getters from './getters'
import classes from './modules/classes'
import usermanage from './modules/usermanage'
import operationmanage from './modules/operationmanage'
import settingmanage from './modules/settingmanage'
import megagame from './modules/megagame'
import columns from './modules/columns'
import flows from './modules/flows'
import distribution from '../views/distribution/configuration/store/store'
import messages from './modules/messages'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    template,
    upload,
    usertable,
    classes,
    usermanage,
    operationmanage,
    settingmanage,
    megagame,
    columns,
    flows,
    distribution,
    messages
  },
  getters
})

export default store
