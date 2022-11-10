<template>
  <el-dialog
    :model-value="props.visible"
    :title="'新建文件夹'"
    :width="600"
    :show-close="false"
    class="confirm-dialog"
  >
    <el-form ref="addFolderFormRef" :model="addFolderForm" :rules="rules">
      <el-form-item label="文件夹名" prop="name">
        <el-input v-model="addFolderForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button :auto-insert-space="true" @click="handleCancel">
          取消
        </el-button>
        <el-button
          type="primary"
          :auto-insert-space="true"
          @click="handleConfirm(addFolderFormRef)"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref, watch } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  dataObj: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const emits = defineEmits(["update:visible", "confirm"]);
const addFolderFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入文件夹名", trigger: "blur" }],
});
const addFolderForm = reactive({
  name: "",
});
// 监听弹窗显隐
watch(
  () => props.visible,
  (val) => {
    if (val) {
      addFolderFormRef.value?.resetFields();
    }
  }
);
const handleCancel = () => {
  emits("update:visible", false);
};
const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      console.log(props.dataObj, addFolderForm);
      emits("confirm");
    }
  });
};
</script>
<style lang="less">
.el-dialog.confirm-dialog {
  .el-dialog__title {
    font-weight: 500;
  }
  .el-dialog__body {
    padding: 20px 30px;
    .tip {
      display: flex;
      align-items: baseline;
      .tip-icon {
        font-size: 30px;
        .el-icon {
          &.success {
            color: #67c23a;
          }
          &.error {
            color: #f56c6c;
          }
          &.question {
            color: #909399;
          }
          &.warning {
            color: #e6a23c;
          }
        }
      }
      .tip-desc {
        padding-left: 10px;
        line-height: 30px;
        transform: translateY(-8px);
      }
    }
  }
}
</style>
