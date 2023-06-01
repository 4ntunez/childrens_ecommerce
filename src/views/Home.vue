<template>
  <categories />
  <category-items v-if="store.categories" />
</template>

<script setup>
import Categories from "@/components/home/Categories.vue";
import CategoryItems from "@/components/home/CategoryItems.vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>
