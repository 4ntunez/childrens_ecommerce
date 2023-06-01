<template>
  <v-card variant="text" class="mt-5">
    <div class="my-5 font-weight-bold text-uppercase text-primary">
      BEST SELLER
    </div>

    <v-divider />

    <v-list lines="three" density="compact">
      <template v-for="item in ratings" :key="item.id">
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar size="50" color="grey-lighten-1">
              <v-img :src="store.getImage(item.images[0])" />
            </v-avatar>
          </template>

          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>
            <v-rating
              v-model="item.rating"
              bg-color="orange-lighten-1"
              color="red"
              size="18"
            ></v-rating>
          </v-list-item-subtitle>
          <v-list-item-subtitle> ${{ item.price }} </v-list-item-subtitle>
        </v-list-item>
      </template>
      <v-divider></v-divider>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();

const ratings = ref([]);

const categories = Object.keys(store.categories);

for (let i of categories) {
  ratings.value.push(
    store.categories[i].items.find((x) => [4, 5].includes(x.rating))
  );

  if (ratings.value.length == 4) break;
}
</script>