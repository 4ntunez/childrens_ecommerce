<template>
  <v-container class="pa-1">
    <v-row class="justify-center">
      <v-col cols="12" class="justify-center">
        <v-img
          height="100"
          :src="store.getImage('recursos/main/logo-retina.png')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAppStore } from "@/store/app";

const store = useAppStore()

</script>