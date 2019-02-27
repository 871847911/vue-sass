var qiniu = require('qiniu-js')

function setKey(file) {
  if (!file) return false

  const fileTime = new Date()

  function Appendzero(obj) {
    if (obj < 10) {
      return '0' + '' + obj
    } else {
      return obj
    }
  }
  const newTime =
    fileTime.getFullYear() +
    Appendzero(fileTime.getMonth() + 1) +
    Appendzero(fileTime.getDate())
  const key = 'temp/' + file.type + '/' + newTime + '/' + fileTime.getTime() + file.lastModified + '.' + file.type.split('/')[1]
  return key
}
var uploader = (uptoken, file, filePath, callBack) => {
  const key = setKey(file)
  var config = {
    useCdnDomain: true,
    region: qiniu.region.z0
  }
  var putExtra = {
    fname: '',
    params: {

    },
    mimeType: ['image/png', 'image/jpeg'] || null
  }
  var observable = qiniu.upload(file, key, uptoken, putExtra, config)
  var observer = {
    next(res) {
      console.log('next=>', res)
    },
    error(err) {
      console.log('失败', err)
      callBack(err, {
        success: false
      })
    },
    complete(res) {
      console.log('complete=>', res)
      callBack(res, {
        success: true
      })
    }
  }
  var subscription = observable.subscribe(observer)
  var getUrl = qiniu.getUploadUrl(config)
  // subscription.unsubscribe() // 上传取消
}
export default uploader
