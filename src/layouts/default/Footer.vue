<template>
  <v-footer fixed class="my-15 text-center d-flex flex-column">
    <center class="my-5 text-h5 font-weight-black text-uppercase text-primary">
      instagram @kidsrus
      <v-img
        max-width="50"
        :src="store.getImage('recursos/main/home-8.png')"
      />
    </center>

    <div class="d-flex justify-center mb-6">
      <div
        v-for="image in images"
        :key="image"
        class="d-flex child-flex pa-1"
        cols="2"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            variant="solo"
            rounded="0"
            :elevation="isHovering ? 12 : 2"
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
          >
            <v-img
              :src="store.getImage(image)"
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-4"
            ></v-img>
          </v-card>
        </v-hover>
      </div>
    </div>

    <div 
        class="py-12 py-2 bg-indigo text-center w-100" 
    >
      <center>
        <v-img width="100" :src="store.getImage('recursos/main/logo(1).png')" />
      </center>

      <div class="ma-3 d-flex justify-center">
        <v-btn variant="text" v-for="link in links" :key="link">
          {{ link }}
        </v-btn>
      </div>

      <div class="pa-2 justify-center">
        <v-icon class="mx-2" icon="mdi-facebook"></v-icon>
        <v-icon class="mx-2" icon="mdi-instagram"></v-icon>
        <v-icon class="mx-2" icon="mdi-twitter"></v-icon>
      </div>

      <div class="pt-3 justify-center">
        <span class="text-caption font-weight-bold">Privacy Policy</span>
        <span class="text-caption font-weight-thin">
          / We use data encryption to protect your personal information. @{{
            date.getFullYear()
          }}
          All rights reserved</span
        >
      </div>
    </div>

    <div class="pt-1 justify-center font-weight-thin text-caption">
      This website uses cookies to improve your browsing experience and
      personalize the content you see.
      <v-btn size="x-small" color="black" rounded="0" dark>Accept</v-btn>
    </div>
  </v-footer>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();

const date = new Date();

const images = ref([
  "recursos/main/87339849_530805007551424_292323017375800029_nlow.jpg",
  "recursos/main/87413583_2660130777540405_5722961474466513534_nlow.jpg",
  "recursos/main/85069033_185901059177965_6767010623440980864_nlow.jpg",
  "recursos/main/84981049_620107085435507_4260875787090681190_nlow.jpg",
  "recursos/main/85051426_2060664737412512_8458893884651247910_nlow.jpg",
]);

const links = ref(["shop", "sale", "girls", "boys", "lookbook", "contacts"]);
</script>