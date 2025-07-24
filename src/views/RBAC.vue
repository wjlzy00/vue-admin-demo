<template>
  <div class="title">
    <h1>角色管理</h1>
  </div>
  <a-list
    class="demo-loadmore-list"
    :loading="initLoading"
    item-layout="horizontal"
    :data-source="list"
  >
    <template #loadMore>
      <div
        v-if="!initLoading && !loading"
        :style="{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }"
      ></div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a key="list-loadmore-edit">编辑</a>
          <a key="list-loadmore-more">删除</a>
        </template>
        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a>{{ item.name }}</a>
            </template>
          </a-list-item-meta>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
  <div class="title">
    <h1>用户角色绑定</h1>
  </div>
  <a-table :columns="columns" :data-source="role">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.name }}
      </template>
      <template v-else-if="column.key === 'role'">
        {{ record.role }}
      </template>
      <template v-else-if="column.key === 'action'">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            更换角色
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">超级管理员</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">商品专员</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">订单专员</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">用户专员</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { onMounted, ref } from "vue";
const fakeDataUrl = {
  results: [
    {
      name: "超级管理员",
      description: "拥有所有权限",
    },
    {
      name: "商品专员",
      description: "负责商品管理",
    },
    {
      name: "订单专员",
      description: "负责订单管理",
    },
    {
      name: "用户专员",
      description: "负责用户管理",
    },
  ],
};

const columns = [
  {
    title: "用户",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
  },
];

const role = ref([
  {
    name: "张三",
    role: "超级管理员",
  },
  {
    name: "李四",
    role: "商品专员",
  },
]);

const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
onMounted(() => {
  setTimeout(() => {
    initLoading.value = false;
    data.value = fakeDataUrl.results;
    list.value = fakeDataUrl.results;
  }, 1000);
});
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
}
</style>
