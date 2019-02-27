import * as obj from '@/api/upload'
const upload = {
  state: {
    upload_Token: ''
  },
  mutations: {
    SET_UPLOAD_TOKEN: (state, token) => {
      state.upload_Token = token
    }
  },
  actions: {
    uploadToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.upload_Token) {
          resolve()
        } else {
          obj.uploadToken().then(response => {
            commit('SET_UPLOAD_TOKEN', response.uptoken)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }
      })
    }
  }
}
export default upload