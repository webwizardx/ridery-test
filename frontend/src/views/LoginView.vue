<script setup lang="ts">
import FormLayout from '@/components/layout/FormLayout.vue';
import useAuthStore from '@/stores/auth';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useAuthStore()

const form = reactive({
  email: '',
  emailRules: [
    (v: string) => !!v || 'El correo electrónico es obligatorio',
    (v: string) => /.+@.+\..+/.test(v) || 'El campo correo electrónico debe ser un correo electrónico válido',
  ],
  errorMessage: '',
  isLoading: false,
  isValid: false,
  password: '',
  passwordRules: [
    (v: string) => !!v || 'La contraseña es obligatoria',
  ],
})

const login = async () => {
  if (!form.isValid) return;
  form.isLoading = true;

  const [isAuthenticated, error] = await store.login(form)

  if (!isAuthenticated) {
    form.errorMessage = error;
    form.isLoading = false;
    return;
  }

  router.push({ name: 'admin' });
  form.isLoading = false;
}

</script>

<template>
  <main>
    <FormLayout>
      <v-alert v-if="form.errorMessage" closable class="mb-4" icon="mdi-alert-circle" title="Error al iniciar sesión"
        :text="form.errorMessage" variant="tonal" type="error"></v-alert>
      <h2 class="tw-text-2xl mb-2">¡Bienvenido!</h2>
      <span class="d-inline-block tw-text-gray-500 mb-4">Inicia sesión en tu cuenta y administra tus viajes</span>
      <v-form v-model="form.isValid" @submit.prevent="login">
        <v-text-field class="mb-4 tw-max-w-" v-model="form.email" :rules="form.emailRules" label="Correo electrónico"
          required variant="outlined" />
        <v-text-field class="mb-4 tw-max-w-96" v-model="form.password" :rules="form.passwordRules" label="Contraseña"
          required variant="outlined" />
        <v-btn variant="plain" block class="mb-4">
          <router-link to="/signup">¿No tienes una cuenta? Regístrate</router-link>
        </v-btn>
        <v-btn :loading="form.isLoading" rounded="0" variant="tonal" block type="submit">
          Iniciar sesión
        </v-btn>
      </v-form>
    </FormLayout>
  </main>
</template>
