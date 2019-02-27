const state = {
    dalogShow: false,
    courseId:null
}
const mutations = {
    changeDalogShow(state, val) {
        state.dalogShow = val
    },
    getcourseId(state,id){
        state.courseId = id
    }
}
const getters = {
    XcourseId : state => {return state.courseId}
}
const module = {
    state,
    mutations,
    getters
}

export default module