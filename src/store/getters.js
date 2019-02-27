const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  uptoken: state => state.upload.upload_Token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  show_dialog_login: state => state.user.show_dialog_login,
  message: state => state.user.message
}
export default getters
