<template>
  <div v-if="store.categoryItems.length">
    <center class="my-5 text-h5 font-weight-bold text-uppercase text-primary">
      Related Products
      <v-img
        max-width="50"
        :src="store.getImage('recursos/main/home-8.png')"
      />
    </center>

    <v-row>
      <v-col
        cols="3"
        v-for="item in store.categoryItems.slice(0, 4)"
        :key="item.id"
      >
        <v-card variant="solo" v-bind="props" @click.stop="updateItem(item)">
          <v-img
            cover
            class="text-right"
            v-if="item.images"
            :src="store.getImage(item.images[0])"
          >
            <v-btn
              v-if="item.stock == 0"
              class="ma-2"
              elevation="0"
              size="x-small"
              rounded
            >
              Out of stock
            </v-btn>
          </v-img>

          <v-card-subtitle
            class="text-center text-caption font-weight-bold text-red-lighten-1"
          >
            <center>
              {{ item.title ? item.title : store.selectedCategoryTitle }}
            </center>
          </v-card-subtitle>

          <v-card-subtitle
            class="text-center text-subtitle text-primary"
            v-if="item.name"
          >
            <center>{{ item.name }}</center>
          </v-card-subtitle>

          <v-card-subtitle
            class="text-center text-subtitle font-weight-black text-primary"
          >
            <center v-if="item.price && item.stock > 0">
              ${{ item.price }}
            </center>
          </v-card-subtitle>

          <v-card-subtitle
            class="text-primary text-center text-subtitle-2 font-weight-bold"
          >
            <v-rating
              v-model="item.rating"
              bg-color="orange-lighten-1"
              color="red"
              size="18"
            ></v-rating>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();

const emits = defineEmits(["updateItem"]);

const updateItem = (item) => {
  emits("updateItem", item);
};
</script>

<style>
</style>