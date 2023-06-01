<template>
  <search-bar />

  <v-card variant="text">
    <v-list density="comfortable">
      <div class="my-5 font-weight-bold text-uppercase text-primary">
        CATEGORIES
      </div>
      
      <v-divider />

      <template v-for="(item, i) in store.categories" :key="i">
        <v-list-item
          :value="item"
          active-color="primary"
          @click="getCategoryItems(i)"
        >
          <template v-slot:append>
            <spam>({{ item.items.length }})</spam>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
        <v-divider variant="inset"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script setup>
import { onMounted } from "vue";
import { useAppStore } from "@/store/app";
import SearchBar from "@/components/home/SearchBar.vue";

const store = useAppStore();

const getCategoryItems = (category) => {
  store.getCategoryItems(category);
};
</script>