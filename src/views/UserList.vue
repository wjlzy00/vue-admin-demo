<template>
  <div class="title">
    <h1>账户列表</h1>
    <a-button type="primary" @click="showDrawer"> 添加用户 </a-button>
    <a-drawer
      title="添加用户"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'top' }"
      @close="onClose"
    >
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="昵称" name="name">
              <a-input
                v-model:value="form.name"
                placeholder="请输入昵称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="头像地址" name="url">
              <a-input
                v-model:value="form.url"
                style="width: 100%"
                placeholder="请输入头像地址"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="手机号码" name="phone">
              <a-input
                v-model:value="form.phone"
                style="width: 100%"
                placeholder="请输入手机号码"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
        </a-row>
      </a-form>
      <template #extra>
        <a-space>
          <a-button @click="onClose">取消</a-button>
          <a-button type="primary" @click="addGoods">添加</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'img'">
        <a-avatar :size="64" :src="record.img">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </template>
      <template v-else-if="column.key === 'state'">
        <a-switch
          v-model:checked="record.state"
          @change="(checked) => handStateChange(checked, record)"
        />
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-button type="primary" ghost>编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" danger ghost>删除</a-button>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const addGoods = async () => {
  const res = await axios.post("/api/goods", form);
  onClose();
};

const columns = [
  {
    title: "头像",
    dataIndex: "img",
    key: "img",
  },
  {
    title: "昵称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "手机号码",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "注册时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "操作",
    key: "action",
  },
];
const data = ref([
  {
    key: "1",
    img: "https://tse4-mm.cn.bing.net/th/id/OIP-C.MSKGuyyfSKmu3rCSJKSUYgAAAA?w=206&h=206&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    name: "张三",
    phone: "138****1234",
    time: "2023-01-01",
    state: true,
  },
  {
    key: "2",
    img: "https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?w=207&h=206&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    name: "李四",
    phone: "139****5678",
    time: "2024-01-01",
    state: false,
  },
  {
    key: "3",
    img: "https://tse4-mm.cn.bing.net/th/id/OIP-C.ppKuxvqGFxydAD9EhA-0nAAAAA?w=216&h=216&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    name: "王五",
    phone: "155****1278",
    time: "2025-01-01",
    state: true,
  },
]);

const form = reactive({
  name: "",
  url: "",
  price: "",
  inventory: "",
  state: null,
});
const rules = {
  name: [
    {
      required: true,
      message: "请输入商品名称/编码",
    },
  ],
  url: [
    {
      required: true,
      message: "请输入图片地址",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入电话号码",
    },
  ],
  time: [
    {
      required: true,
      message: "请输入库存数量",
    },
  ],
  state: [
    {
      required: true,
      message: "请选择状态",
    },
  ],
};
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
  form.name = "";
  form.url = "";
  form.phone = "";
  form.time = "";
  form.state = null;
};
</script>

<style>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 30px;
}

.title h1 {
  font-size: 24px;
  font-weight: 600;
}
</style>
