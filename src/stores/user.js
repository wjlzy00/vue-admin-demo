import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null,
    token: null,
  }),

  getters: {
    isLoggedIn: (state) => {
      return !!state.token;
    },
    username: (state) => {
      return state.userInfo?.username || "未登录";
    }
  },

  actions: {
    login(username, password) {
      if (username === "admin" && password === "123456") {
        this.userInfo = {
          username: username,
          password: password,
        },
        this.token = "fake-jwt-token-123";
      }
    }
  }
});
