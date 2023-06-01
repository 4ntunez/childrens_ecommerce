<template>
  <v-container class="pa-1">
    <v-row>
      <v-col cols="12" md="8">
        <v-img class="align-end" :src="store.getImage('recursos/main/slider-1.jpg')" cober>
          <div class="ml-5 mb-10">
            <v-card-title class="text-h6 text-white d-flex flex-column">
              <p class="text-h3 font-weight-bold mt-4 text-uppercase">
                jumpsuits
              </p>

              <p class="text-subtitle-2 text-white">
                Comfortable clothes for your little babies.
              </p>

              <v-btn color="white" class="text-primary" width="110" rounded="0">
                discover
              </v-btn>
            </v-card-title>
          </div>
        </v-img>
      </v-col>

      <v-col cols="12" md="4">
        <v-img :src="store.getImage('recursos/main/girls-power.jpg')" cober />

        <v-card-title
          class="pa-0 ma-0 text-center text-h5 font-weight-bold text-uppercase text-primary"
        >
          Girls Power
        </v-card-title>

        <v-card-subtitle class="text-center font-weight-bold text-disabled">
          For a colorfull summer
        </v-card-subtitle>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <template v-for="(item, i) in store.categories" :key="i">
                <v-col cols="3" v-if="item.imageTitle">
                  <v-card
                    class="mx-auto pa-2"
                    max-width="600"
                    variant="solo"
                    v-bind="props"
                    style="cursor: pointer"
                    @click="getCategoryItems(i)"
                  >
                    <v-img :src="store.getImage(item.image)" />

                    <v-card-subtitle class="pt-5 text-center">
                      <span
                        class="text-center text-caption font-weight-bold text-primary"
                        style="font-family: 'Comic Sans MS', sans-serif"
                      >
                        {{ item.imageTitle }}
                      </span>
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useAppStore } from "@/store/app";

const selection = ref();
const store = useAppStore();

const getCategoryItems = (category) => {
  store.getCategoryItems(category);
};
</script>
