<script setup lang="ts">
</script>

<template>
  <main>
    <v-container class="h-screen pa-0" :fluid="true">
      <v-row no-gutters class="h-100">
        <v-col
          class="h-100 d-none d-lg-block tw-bg-[url('https://corporativo.ridery.app/img/white-background.9f7142de.jpg')] tw-bg-cover tw-bg-center"
          cols="12" lg="8">
          <div class="d-flex h-100 tw-w-[600px] ma-auto">
            <v-img aspect-ratio="16/9" src="https://corporativo.ridery.app/img/dark-logo.f7235ac8.svg"></v-img>
          </div>
        </v-col>
        <v-col class="h-100 d-flex flex-column align-center pa-8" cols="12" md="12" lg="4">
          <v-sheet class="ma-auto bg-transparent w-100 tw-max-w-96">
            <div class="d-flex d-lg-none tw-w-[280px] ma-auto mb-12 bg-transparent">
              <v-img aspect-ratio="16/9" src="https://corporativo.ridery.app/img/dark-logo.f7235ac8.svg"></v-img>
            </div>
            <slot></slot>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
