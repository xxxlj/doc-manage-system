<template>
  <el-dialog
    :model-value="props.visible"
    :title="props.title"
    :width="600"
    :show-close="false"
    class="confirm-dialog"
  >
    <div class="tip">
      <div class="tip-icon">
        <el-icon v-if="props.type === 'success'" class="success"
          ><SuccessFilled
        /></el-icon>
        <el-icon v-else-if="props.type === 'error'" class="error">
          <CircleCloseFilled />
        </el-icon>
        <el-icon v-else-if="props.type === 'question'" class="question">
          <QuestionFilled />
        </el-icon>
        <el-icon v-else class="warning"><WarningFilled /></el-icon>
      </div>
      <div class="tip-desc">{{ props.tip }}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button :auto-insert-space="true" @click="handleCancel">
          取消
        </el-button>
        <el-button
          type="primary"
          :auto-insert-space="true"
          @click="handleConfirm"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  tip: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "warning", // warning、success、error、question
  },
});
const emits = defineEmits(["update:visible", "confirm"]);

const handleCancel = () => {
  emits("update:visible", false);
};
const handleConfirm = () => {
  emits("confirm");
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
