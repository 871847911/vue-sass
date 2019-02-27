<template>
  <div class="app-container flow-rules">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="计费规则" name="1">
        <el-form :model="calcForm" ref="calcForm" :rules="rules" label-width="170px" label-position="left" class="flow-form">
          <strong>流量计费</strong>
          <el-form-item label="每月每G储存空间计费：" prop="spaceAmount">
            <el-input v-model="calcForm.spaceAmount"></el-input>
            <span class="tag-span">元</span>
            <span class="mind-span">每月扣除免费储存空间量后，剩余部分需要计费</span>
          </el-form-item>
          <el-form-item label="每月每G外网流量计费：" prop="flowAmount">
            <el-input v-model="calcForm.flowAmount"></el-input>
            <span class="tag-span">元</span>
            <span class="mind-span">每月扣除免费外网流量后，剩余部分需要计费</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('calcForm')">保存设置</el-button>
            <span class="mind-span">流量计费保存后，下月生效</span>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="其他规则" name="2">
        <el-form :model="otherForm" ref="otherForm" :rules="rules" label-width="120px" label-position="left" class="flow-form">
          <strong>充值设置</strong>
          <el-form-item label="最低充值金额：" prop="floorAmount">
            <el-input v-model="otherForm.floorAmount"></el-input>
            <span class="tag-span">元</span>
          </el-form-item>
          <strong>流量预警</strong>
          <el-form-item label="账户余额阈值：" prop="waringAmount">
            <el-input v-model="otherForm.waringAmount"></el-input>
            <span class="tag-span">元</span>
            <span class="mind-span">当流量账户余额的金额少于设定值时，会进行预警</span>
          </el-form-item>
          <strong>欠费处理</strong>
          <el-form-item label="不允许添加内容：" prop="handleArrears" class="handleArrears">
            <el-switch
              v-model="otherForm.handleArrears"
              active-color="#00B4B9"
              inactive-color="#909399">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('otherForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      const reg = /^([1-9]\d*|0)(\.\d{1,2})?$/;
      const tipMap = new Map([
        ["spaceAmount", "每月每G储存空间计费值"],
        ["flowAmount", "每月每G外网流量计费值"],
        ["floorAmount", "最低充值金额"],
        ["waringAmount", "账户余额阈值"]
      ]);

      if(reg.test(value)){
        if(rule.field === 'floorAmount'){
          if(Number(value) < 100){
            return callback(new Error('每次充值不得小于100元'))
          }
        }else{
          return callback();
        }
        return callback();
      }else{
        return callback(new Error(`请正确输入${tipMap.get(rule.field)}`));
      }
    };
    return {
      activeNames: ["1", "2"],
      calcForm: {
        spaceAmount: 0,
        flowAmount: 0
      },
      otherForm: {
        floorAmount: 0,
        waringAmount: 0,
        handleArrears: false
      },
      rules: {
        spaceAmount: [{ validator: validatePass, trigger: "blur" }],
        flowAmount: [{ validator: validatePass, trigger: "blur" }],
        floorAmount: [{ validator: validatePass, trigger: "blur" }],
        waringAmount: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("getRule", {}).then(res => {
        if (res.success) {
          let {
            spaceAmount,
            flowAmount,
            floorAmount,
            waringAmount,
            updateFlowAmount,
            updateSpaceAmount,
            handleArrears
          } = res.data;

          this.calcForm = {
            ...this.calcForm,
            spaceAmount: updateSpaceAmount,
            flowAmount: updateFlowAmount
          };
          this.otherForm = {
            ...this.otherForm,
            floorAmount,
            waringAmount,
            handleArrears: handleArrears === 1 ? false : true
          };
        } else {
          this.$message.error(res.message);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleUpdate(formName);
        } else {
          return false;
        }
      });
    },
    handleUpdate(val) {
      let formData;

      if (val === "calcForm") {
        formData = { ...this.calcForm };
      } else {
        const handleArrears = this.otherForm.handleArrears === false ? 1 : 2;

        formData = { ...this.otherForm, handleArrears };
      }

      this.$store.dispatch("updateRule", formData).then(res => {
        if (res.success) {
          this.$message.success("设置成功！");
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.flow-rules {
  .handleArrears{
    label{
      width:125px !important;
    }
  }
  label {
    font-weight: normal;
  }
  strong {
    display: block;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .el-collapse-item__header {
    border-bottom: 1px solid #ebeef5;
  }
  .el-collapse-item__wrap {
    border-bottom: 0;
  }
  .el-collapse-item__content {
    padding-top: 25px;
  }
  .el-form-item {
    padding-left: 20px;
  }
}
</style>
<style lang="scss" scoped>
.el-collapse {
  border-top: 0;
}
.flow-rules {
  margin: 20px;
  background-color: #ffffff;

  .flow-form {
    .el-input {
      margin-right: 0;
      width: 270px;
      vertical-align: top;
    }
    .tag-span,
    .mind-span {
      margin-left: 10px;
    }
    .mind-span {
      color: #9b9b9b;
    }
  }
}
</style>