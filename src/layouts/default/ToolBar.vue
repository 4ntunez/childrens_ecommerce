<template>
  <v-toolbar flat color="transparent">
    <v-spacer />
    
    <v-btn
      v-for="item in barContent.items"
      :key="item"
      variant="plain"
      color="blue-darken-4"
      :class="selectedClass"
      @click="toggle"
    >
      {{ item }}
    </v-btn>

    <v-btn icon="mdi-heart-outline"> </v-btn>

    <v-btn icon>
      <v-badge icon content="0" color="red-lighten-2">
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-btn icon="mdi-magnify"> </v-btn>

    <v-spacer />
  </v-toolbar>
</template>

<script setup>
import { reactive } from "vue";

const barContent = {
  items: [
    "Home",
    "Shop Features",
    "Clothes",
    "Pages",
    "Shortcodes",
    "Post Types",
  ],
};
</script>

<style>
.bar-title {
  font-family: Georgia;
}
</style>
