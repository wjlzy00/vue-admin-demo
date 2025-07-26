import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref(null);
  const isLoggedIn = ref(false);
  const token = ref("");
});
