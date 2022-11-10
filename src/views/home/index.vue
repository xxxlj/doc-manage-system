<template>
  <div class="home">
    <div class="left">
      <div class="add-folder">
        <div class="title">文件夹列表</div>
        <el-tooltip content="新建文件夹" placement="top" effect="light">
          <svg-icon
            icon-class="folder-add"
            @click.stop="openAddDialog(emptyFolder)"
          ></svg-icon>
        </el-tooltip>
      </div>
      <el-tree
        :data="data"
        @node-click="handleFolderClick"
        node-key="id"
        :accordion="true"
        :default-expanded-keys="defaultExpanded"
        class="folder-tree"
      >
        <template #default="{ node, data }">
          <div class="folder-tree-item">
            <div class="label" :title="node.label">
              <svg-icon icon-class="folder"></svg-icon>
              <span>{{ node.label }}</span>
            </div>
            <div class="operate">
              <el-tooltip content="新建文件夹" placement="top" effect="light">
                <svg-icon
                  icon-class="folder-add"
                  @click.stop="openAddDialog(data)"
                ></svg-icon>
              </el-tooltip>
              <el-tooltip content="删除文件夹" placement="top" effect="light">
                <el-icon @click.stop="openDeleteDialog(data)">
                  <DeleteFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
    <div class="right">
      <div class="search-box">
        <div class="search">
          <div class="search-item">
            <div class="label">文件名</div>
            <div class="item">
              <el-input v-model="file.search.name" clearable />
            </div>
          </div>
          <div class="search-item">
            <div class="label">文件类型</div>
            <div class="item">
              <el-select v-model="file.search.type" placeholder=" " clearable>
                <el-option
                  v-for="item in fileTypeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="search-item">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </div>
        </div>
        <el-button type="primary" class="upload-btn">
          <el-icon><Upload /></el-icon>
          上传文件
        </el-button>
      </div>
      <el-table :data="file.tableData" style="width: 100%">
        <el-table-column prop="name" label="文件名" width="500" />
        <el-table-column prop="type" label="文件类型" width="200" />
        <el-table-column prop="desc" label="文件描述" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small">下载</el-button>
            <el-button link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <confirm-dialog
      v-model:visible="deleteFolder.visible"
      :title="deleteFolder.title"
      :tip="deleteFolder.tip"
      @confirm="handleDelete"
    ></confirm-dialog>
    <add-folder-dialog
      v-model:visible="addFolder.visible"
      :data-obj="addFolder.addItem"
    ></add-folder-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import ConfirmDialog from "@/components/confirmDialog/index.vue";
import AddFolderDialog from "./components/addFolder.vue";
import type { Folder, DeleteFolder, AddFolder, iFile } from "./type";

const data: Folder[] = [
  {
    id: "1",
    label: "文件夹1",
    children: [
      {
        id: "1-1",
        label: "文件夹1-1",
        children: [
          {
            id: "1-1-1",
            label: "文件夹1-1-1",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "文件夹2",
    children: [
      {
        id: "2-1",
        label: "文件夹2-1",
        children: [
          {
            id: "2-1-1",
            label: "文件夹2-1-1",
          },
        ],
      },
      {
        id: "2-2",
        label: "文件夹2-2",
        children: [
          {
            id: "2-2-1",
            label: "文件夹2-2-1",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    label: "文件夹3",
    children: [
      {
        id: "3-1",
        label: "文件夹3-1",
        children: [
          {
            id: "3-1-1",
            label: "文件夹3-1-1",
          },
        ],
      },
      {
        id: "3-2",
        label: "文件夹3-2",
        children: [
          {
            id: "3-2-1",
            label: "文件夹3-2-1",
          },
        ],
      },
    ],
  },
];
const defaultExpanded = ref<string[]>(["2-2"]);
const emptyFolder: Folder = reactive({
  id: "",
  label: "",
});
const deleteFolder: DeleteFolder = reactive({
  visible: false,
  title: "删除文件夹",
  tip: "确定删除该文件夹吗？删除后不可恢复",
  deleteItem: {
    id: "",
    label: "",
  },
});
const addFolder: AddFolder = reactive({
  visible: false,
  addItem: { ...emptyFolder },
});

const file: iFile = reactive({
  search: {
    name: "",
    type: "",
  },
  tableData: [
    { id: "1", name: "文件1.xlxs", type: "excel", desc: "这是一个表格" },
    { id: "2", name: "文件2.ppt", type: "ppt", desc: "这是一个ppt" },
  ],
});
const fileTypeOpt = [
  {
    value: "excel",
    name: "Excel",
  },
  {
    value: "ppt",
    name: "PPT",
  },
  {
    value: "word",
    name: "Word",
  },
];

// 获取文件列表
const getFileList = (data: Folder) => {
  console.log(data);
};
// 点击文件夹
const handleFolderClick = (data: Folder) => {
  if (!data.children || (data.children && !data.children.length)) {
    getFileList(data);
  }
};
// 打开新增文件夹弹窗
const openAddDialog = (data: Folder) => {
  addFolder.visible = true;
  addFolder.addItem = { ...data };
};
// 打开删除确认框
const openDeleteDialog = (data: Folder) => {
  deleteFolder.visible = true;
  deleteFolder.deleteItem = { ...data };
  deleteFolder.tip = `确定删除文件夹【${data.label}】吗？删除后不可恢复`;
};
// 确认删除
const handleDelete = () => {
  console.log(deleteFolder.deleteItem);
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgb(0 21 41 / 8%);
  .left {
    width: 300px;
    min-height: calc(100vh - 70px);
    border-right: 1px solid #eee;
    box-shadow: 0 2px 6px rgb(0 21 41 / 8%);
    :deep(.el-tree) {
      &.folder-tree {
        .el-tree-node__content {
          height: 40px;
          .el-tree-node__label {
            width: calc(100% - 24px);
            padding-right: 6px;
            .folder-tree-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .label {
                display: flex;
                align-items: center;
                .svg-icon {
                  margin-right: 6px;
                }
                > span {
                  color: #333;
                  display: block;
                  max-width: 150px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
              }
              .operate {
                display: none;
                align-items: center;
                font-size: 16px;
                .svg-icon {
                  margin-right: 5px;
                  outline: none;
                }
                .el-icon {
                  color: #8a8a8a;
                }
              }
              &:hover {
                .operate {
                  display: flex;
                }
              }
            }
          }
        }
      }
    }
    .add-folder {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      padding: 0 10px 0 16px;
      border-bottom: 1px solid #e6e9ed;
      .svg-icon {
        cursor: pointer;
        outline: none;
      }
      .title {
        font-weight: 500;
      }
    }
  }
  .right {
    width: calc(100% - 300px);
    box-sizing: border-box;
    padding: 10px 30px 20px;
    .search-box {
      padding: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .search {
        display: flex;
        align-items: center;
        .search-item {
          display: flex;
          align-items: center;
          margin-right: 20px;
          .label {
            color: #78849e;
            margin-right: 10px;
          }
          .item {
            width: 280px;
            .el-select {
              width: 100%;
            }
          }
          .el-button {
            width: 100px;
          }
        }
      }
      .upload-btn {
        .el-icon {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
