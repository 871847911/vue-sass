<template>
  <div>
    <script id="vd_editor" type="text/plain"></script>
  </div>
</template>
<script>
  import imgHead from "@/config/config";
  import { mapGetters } from "vuex";
  export default {
    props: ["container"],
    data() {
      return {
        editor: null,
        value: ''
      };
    },
    computed: {
      ...mapGetters(["roles"])
    },
    watch: {
      container(val) {
        let self = this
        if (!self.value&&self.editor) {
          self.value = val
          self.editor.setContent(val)
        }
      }
    },
    mounted() {
      let self = this
      if(self.$store.state.upload.upload_Token){
        self.showEditor(self.$store.state.upload.upload_Token)
      }else{
        self.$store.dispatch('uploadToken').then(res=>{
          self.showEditor(res.uptoken)
        })
      }
    },
    methods: {
      editerChange(html) {
        this.value = html
        this.$emit("update:container", html);
      },
      showEditor(upload_Token) {
        console.log('upload_Token',upload_Token)
        let self = this;
        this.$nextTick(function () {
          let qiniuConfig = {
            initialFrameWidth: null,
            initialFrameHeight: 320,
            toolbar: [
              "source | undo redo | bold italic  |  forecolor backcolor | removeformat |",
              "insertorderedlist insertunorderedlist | selectall cleardoc paragraph |  fontsize",
              "| justifyleft justifycenter justifyright justifyjustify |",
              "image", "| fullscreen"
            ],
            qiniuImgPrefix: imgHead.imgHostTemp,
            qiniuToken: upload_Token,
            qiniuUploadUrl: "http://upload.qiniup.com",
            qiniuShowedUrl: imgHead.imgHostTemp
          };
          // if (this.editor) {
          UM.delEditor("vd_editor");
          // }
          this.editor = UM.getEditor("vd_editor", qiniuConfig);
          this.editor.addListener("ready", function () {
            // cconsole.log("container", JSON.stringify(this.container));
            self.editor.setContent(self.container||''); // 确保UE加载完成后，放入内容。
          });
          this.editor.ready(function () {
            self.editor.fireEvent("contentChange");
            var $textarea = $("#vd_editor")
              .parent()
              .find("iframe")
              .contents();
            var fn = function () {
              self.editerChange(self.editor.getContent());
            };
            if (document.all) {
              $textarea.get(0).attachEvent("onpropertychange", function (e) {
                fn();
              });
            } else {
              $textarea.on("input", fn);
            }
          });
          this.editor.addListener("selectionchange", function (e) {
            //选择变化
            self.editerChange(self.editor.getContent());
          });
        })
      }
    }
  };
</script>
