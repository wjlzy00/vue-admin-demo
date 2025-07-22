<template>
  <div class="title">
    <h1>订单列表</h1>
    <div class="search">
    <a-input v-model:value="value" placeholder="手机号/订单号" />
    <a-divider type="vertical" />
    <a-select
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      @focus="focus"
      @change="handleChange"
    >
      <a-select-option value="All">全部状态</a-select-option>
      <a-select-option value="DaiFuKuan">待付款</a-select-option>
      <a-select-option value="DaiFaHuo">待发货</a-select-option>
      <a-select-option value="YiFaHuo">已发货</a-select-option>
      <a-select-option value="Yiwancheng">已完成</a-select-option>
    </a-select>
    <a-divider type="vertical" />
    <a-button type="primary" @click="showDrawer">查询</a-button>
    </div>
  </div>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'orderNumber'">
        <span> 订单号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'img'">
        <img :src="record.img" alt="" width="50" />
      </template>
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'state'">
        <span>
          <a-tag :color="getStatusColor(record.state)">
            {{ record.state }}
          </a-tag>
        </span>
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

const tagColor = {
  待发货: "orange",
  已发货: "blue",
  已完成: "green",
};

const getStatusColor = (status) => {
  return tagColor[status] || "orange";
};

const value1 = ref('All');
const options1 = ref([
  {
    value: 'All',
    label: '全部状态',
  },
  {
    value: 'DaiFuKuan',
    label: '待付款',
  },
  {
    value: 'DaiFaHuo',
    label: '待发货',
  },
  {
    value: 'YiFaHuo',
    label: '已发货',
  },
  {
    value: 'Yiwancheng',
    label: '已完成',
  },
]);
const columns = [
  {
    name: "Order_number",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "商品",
    dataIndex: "goods",
    key: "goods",
  },
  {
    title: "实付金额",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "收货人",
    key: "consignee",
    dataIndex: "consignee",
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "下单时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "操作",
    key: "action",
  },
];
const data = [
  {
    key: "1",
    orderNumber: "202507220001",
    goods: "iPhone 16 Pro ×1",
    amount: "¥6999.00",
    consignee: "张三",
    state: "已发货",
    time: "2025-07-22 12:00:00",
    action: "编辑",
  },
  {
    key: "2",
    orderNumber: "202507220002",
    goods: "iPhone 16 Pro ×1",
    amount: "¥6999.00",
    consignee: "李四",
    state: "待发货",
    time: "2025-07-22 12:00:00",
    action: "编辑",
  },
  {
    key: "3",
    orderNumber: "202507220003",
    goods: "iPhone 16 Pro ×1",
    amount: "¥6999.00",
    consignee: "王五",
    state: "已完成",
    time: "2025-07-22 12:00:00",
    action: "编辑",
  },
];

const form = reactive({
  name: "",
  url: "",
  price: "",
  inventory: "",
  tags: [],
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
  price: [
    {
      required: true,
      message: "请输入价格",
    },
  ],
  inventory: [
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
  tags: [
    {
      required: true,
      message: "请选择标签",
      type: "array",
      min: 1,
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
  form.price = "";
  form.inventory = "";
  form.tags = [];
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

.search {
  display: flex;
  align-items: center;
}
</style>
