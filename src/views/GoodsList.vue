<template>
  <div class="title">
    <h1>商品列表</h1>
    <a-button type="primary" @click="showDrawer">
      添加商品
    </a-button>
    <a-drawer
      title="添加商品"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'top' }"
      @close="onClose"
    >
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="名称/编码" name="name">
              <a-input
                v-model:value="form.name"
                placeholder="请输入商品名称/编码"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="图片地址" name="url">
              <a-input
                v-model:value="form.url"
                style="width: 100%"
                placeholder="请输入图片地址"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="价格" name="price">
              <a-input
                v-model:value="form.price"
                style="width: 100%"
                placeholder="请输入价格"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="库存" name="inventory">
              <a-input
                v-model:value="form.inventory"
                style="width: 100%"
                placeholder="请输入库存数量"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="标签" name="tags">
              <a-select
                v-model:value="form.tags"
                mode="tags"
                placeholder="请选择商品标签"
                :max-tag-count="5"
                allow-clear
                :token-separators="[',']"
              >
                <a-select-option value="phone">手机</a-select-option>
                <a-select-option value="digital">数码</a-select-option>
                <a-select-option value="laptop">笔记本</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" name="state">
              <a-select v-model:value="form.state" placeholder="请选择商品状态">
                <a-select-option value="onSale">在售</a-select-option>
                <a-select-option value="delisting">下架</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
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
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          名称/编码
        </span>
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
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
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

const columns = [
  {
    title: "图片",
    dataIndex: "img",
    key: "img",
  },
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "库存",
    dataIndex: "inventory",
    key: "inventory",
  },
  {
    title: "标签",
    key: "tags",
    dataIndex: "tags",
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
const data = [
  {
    key: "1",
    img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=904&hei=840&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3VGhTSEZFNjlmT2xUUDNBTjljV1BxWVk4UDMvOWNCVUEyZk1VN2FtQlpZWXZvdUZlR0V0VUdJSjBWaDVNVG95Yk15Y0c3T3Y4UWZwZExHUFdTUC9lN28",
    name: "MacBook Pro",
    price: "￥ 7999.00",
    inventory: "9999",
    tags: ["数码", "笔记本"],
    state: "在售",
  },
  {
    key: "2",
    img: "https://www.apple.com.cn/v/iphone/home/cc/images/overview/select/iphone_16pro__erw9alves2qa_xlarge_2x.png",
    name: "iPhone 16 Pro",
    price: "￥ 6999.00",
    inventory: "9999",
    tags: ["数码", "手机"],
    state: "在售",
  },
  {
    key: "3",
    img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=976&hei=916&fmt=jpeg&qlt=90&.v=WTk1dTl5UTBnZXdKN2tua2pFb1hvQ3hmVXd6RnorM2pzUlRIKzNkUEN0U2VDYXovZDMyN1dXU211bjZoVlVUcWJGcXNRQnFCV0w3WVRjTExvdm1ic1dyYTFZWlpPczBocnFKR3FYSlo5L1FXZEdHNUFPR0hYUU12cjI0VlFzM1A",
    name: "AirPods Pro",
    price: "￥ 1999.00",
    inventory: "9999",
    tags: ["数码", "耳机"],
    state: "下架",
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
</style>
