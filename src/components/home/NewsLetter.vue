<template>
  <v-card color="red-lighten-2">
    <v-card-title class="text-h4 text-wrap text-center">
      Join Our Newsletter
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            placeholder="Your Email Address*"
            hide-datails
            variant="text"
            density="compact"
            style="border: dashed 2px; max-height: 45px"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn block rounded="0" class="text-red-lighten-2" style="min-height: 45px">subscribe</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
</script>

<style>
</style>