<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import { reactive } from 'vue';

const store = useAuthStore()

const form = reactive({
  email: '',
  emailRules: [
    (v: string) => !!v || 'El correo electrónico es obligatorio',
    (v: string) => /.+@.+\..+/.test(v) || 'El campo correo electrónico debe ser un correo electrónico válido',
  ],
  password: '',
  passwordRules: [
    (v: string) => !!v || 'La contraseña es obligatoria',
  ],
  isLoading: false,
  isValid: false
})

const login = async () => {
  if (!form.isValid) return;
  form.isLoading = true;

  await store.login(form)

  form.isLoading = false;
}

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
            <div class="d-flex d-lg-none tw-w-[400px] mb-12 bg-transparent">
              <v-img aspect-ratio="16/9" src="https://corporativo.ridery.app/img/dark-logo.f7235ac8.svg"></v-img>
            </div>
            <h2 class="tw-text-2xl mb-2">¡Bienvenido!</h2>
            <span class="d-inline-block tw-text-gray-500 mb-4">Inicia sesión en tu cuenta y administra tus viajes</span>
            <v-form v-model="form.isValid" @submit.prevent="login">
              <v-text-field class="mb-4 tw-max-w-" v-model="form.email" :rules="form.emailRules"
                label="Correo electrónico" required variant="outlined" />
              <v-text-field class="mb-4 tw-max-w-96" v-model="form.password" :rules="form.passwordRules"
                label="Contraseña" required variant="outlined" />
              <v-btn :loading="form.isLoading" rounded="0" variant="tonal" block type="submit">
                Iniciar sesión
              </v-btn>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
