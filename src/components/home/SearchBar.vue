<template>
  <v-divider style="border: dashed 1px black"></v-divider>

  <v-text-field
    label="Search products..."
    background-color="grey darken-3"
    variant="text"
    hide-details
    density="compact"
    class="pa-0 ma-0"
  >
    <template v-slot:append-inner>
      <v-btn
        icon="mdi-magnify"
        color="red-lighten-2"
        class="ma-0"
        rounded="0"
        style="max-width: 50px"
      ></v-btn>
    </template>
  </v-text-field>

  <v-divider style="border: dashed 1px black"></v-divider>
</template>

<script setup>
const items = [
  {
    prependIcon: "mdi-clock-outline",
    title: "recipe with chicken",
  },
  {
    prependIcon: "mdi-clock-outline",
    title: "best hiking trails near me",
  },
  {
    prependIcon: "mdi-clock-outline",
    title: "how to learn a new language",
  },
  {
    prependIcon: "mdi-clock-outline",
    title: "DIY home organization ideas",
  },
  {
    prependIcon: "mdi-clock-outline",
    title: "latest fashion trends",
  },
];
</script>

<style>
</style>