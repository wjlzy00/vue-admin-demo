<template>
  <a-layout>
    <a-layout-sider :style="siderStyle">
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" :items="menuItems" @click="handleMenuClick">
        <a-menu-item key="1">
          <span>仪表盘</span>
        </a-menu-item>
        <a-menu-item key="2">
          <span>商品管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <span>订单管理</span>
        </a-menu-item>
        <a-menu-item key="4">
          <span>用户管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="headerStyle">Header</a-layout-header>
      <a-layout-content :style="contentStyle"><router-view /> </a-layout-content>
      <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  color: "#000000",
  marginLeft: "200px",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  backgroundColor: "#fff",
  width: "200px",
}
import { ref } from "vue";
import router from "../router";

const selectedKeys = ref([router.path]);

const menuItems = [
  { key: '/dashboard', title: '仪表盘' },
  { key: '/goods', title: '商品管理' },
  { key: '/orders', title: '订单管理' },
  { key: '/users', title: '用户管理' }
].map(item => ({
  key: item.key,
  label: item.title
}))

const handleMenuClick = ({key}) => {
  router.push(key)
}
</script>
