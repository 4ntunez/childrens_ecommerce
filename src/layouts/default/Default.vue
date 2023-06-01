<template>
  <v-app>
    <v-container class="px-5">
      <default-system-bar />

      <default-logo />

      <default-tool-bar />

      <default-view />

      <default-footer />
    </v-container>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useAppStore } from "@/store/app";

import DefaultToolBar from "./ToolBar.vue";
import DefaultView from "./View.vue";
import DefaultSystemBar from "./SystemBar.vue";
import defaultLogo from "./Logo.vue";
import DefaultFooter from "./Footer.vue";

const store = useAppStore();

onMounted(() => {
  store.categories = [];
  store.getCategories();
});
</script>
