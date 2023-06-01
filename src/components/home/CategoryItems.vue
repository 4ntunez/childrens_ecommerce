<template>
  <center class="my-10 text-h5 font-weight-bold text-uppercase text-primary">
    New arrivals
    <v-img max-width="50" :src="store.getImage('recursos/main/home-8.png')" />
  </center>

  <v-row>
    <v-col cols="3">
      <category-card />

      <best-seller-card />

      <news-letter />
    </v-col>

    <v-col cols="9">
      <v-row>
        <v-col cols="4" v-for="item in store.categoryItems" :key="item.id">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              variant="solo"
              v-bind="props"
              @click.stop="showItemDetails(item)"
            >
              <v-img
                cover
                class="text-right"
                v-if="item.images"
                :src="store.getImage(item.images[0])"
              >
                <v-expand-transition v-if="item.images.length > 1">
                  <div
                    v-if="isHovering"
                    class="d-flex transition-fast-in-fast-out bg-white v-card--reveal"
                    style="height: 100%"
                  >
                    <v-img
                      cover
                      class="align-end text-center"
                      :src="store.getImage(item.images[1])"
                    ></v-img>
                  </div>
                </v-expand-transition>

                <v-expand-transition>
                  <div
                    v-if="isHovering"
                    class="d-flex transition-fast-in-fast-out v-card--reveal"
                    style="height: 35px"
                  >
                    <v-btn
                      v-if="item.stock > 0"
                      block
                      rounded="0"
                      color="red-lighten-2"
                      @click.stop="sendItemToCard"
                    >
                      <template v-slot:append>
                        <v-icon icon="mdi-magnify"></v-icon>
                      </template>

                      <template v-slot:prepend>
                        <v-icon
                          icon="mdi-heart-outline"
                          @click.stop="markFavorite"
                        ></v-icon>
                      </template>

                      Add to cart
                    </v-btn>

                    <v-btn
                      v-else
                      block
                      rounded="0"
                      color="red-lighten-2"
                      prepend-icon="mdi-heart-outline"
                    ></v-btn>
                  </div>
                </v-expand-transition>

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
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted, watchEffect, onUpdated } from "vue";
import { useAppStore } from "@/store/app";
import { useRoute } from "vue-router";
import router from "@/router";

import CategoryCard from "@/components/home/CategoryCard.vue";
import BestSellerCard from "@/components/home/BestSellerCard.vue";
import NewsLetter from "@/components/home/NewsLetter.vue";

const store = useAppStore();

const route = useRoute();

onMounted(() => {
  getItems();
});

const getItems = () => {
  store.categoryItems = [];

  const category = route.query.category;

  if (category) {
    const items = store.categories[category].items;
    store.categoryItems = items;
    return;
  }

  let categoryKeys = Object.keys(store.categories);

  for (let i of Array(2)) {
    categoryKeys.forEach((element) => {
      const item = store.categories[element].items;

      if (item.length) {
        const data = item[Math.floor(Math.random() * item.length)];
        data.title = store.categories[element].title;
        store.categoryItems.push(data);
      }
    });
  }

  store.categoryItems = store.categoryItems.slice(0, 6);
};

const showItemDetails = (item) => {
  router.push({
    name: "ItemDetail",
    params: { id: item.id },
    query: { category: store.selectedCategory },
  });
};

const sendItemToCard = () => {
  alert("Sending to card...");
};

const markFavorite = () => {
  alert("Mark as favorite...");
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  opacity: 1;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>