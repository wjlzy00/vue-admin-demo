<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <Header></Header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider :style="siderStyle">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          :items="menuItems"
          @click="handleMenuClick"
        >
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
      <a-layout-content :style="contentStyle"
        ><router-view />
      </a-layout-content>
    </a-layout>
    <a-layout-footer :style="footerStyle">
      <p>
        © 2025 电商后台 Demo ·
        <a href="https://github.com/wjlzy00/vue-admin-demo" target="_blank">
          GitHub
        </a>
      </p>
      <p style="font-size: 12px; color: #999">
        Build with Vite + Vue3 + Ant Design Vue
      </p>
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import Header from "../components/Header.vue";

const headerStyle = {
  textAlign: "center",
  height: "64px",
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#fff",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  width: "100%",
};
const contentStyle = {
  color: "#000000",
  minHeight: "100vh",
  backgroundColor: "#fff",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#333",
  zIndex: 1,
  bottom: 0,
  posttion: "fixed",
};

const siderStyle = {
  overflow: "auto",
  backgroundColor: "#fff",
};
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const selectedKeys = ref([route.path]);

watch(
  () => route.path,
  (newPath) => {
    console.log("当前路由:", newPath);
    selectedKeys.value = [newPath];
  }
);

const menuItems = [
  { key: "/dashboard", title: "仪表盘" },
  { key: "/goods", title: "商品管理" },
  { key: "/orders", title: "订单管理" },
  { key: "/users", title: "用户管理" },
  { key: "/rbac", title: "权限管理" },
].map((item) => ({
  key: item.key,
  label: item.title,
}));

const handleMenuClick = ({ key }) => {
  router.push(key);
};
</script>
