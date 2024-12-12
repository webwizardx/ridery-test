<script setup lang="ts">
import FormLayout from '@/components/layout/FormLayout.vue';
import useAuthStore from '@/stores/auth';
import useVehicleStore from '@/stores/vehicles';
import { VehicleStatus } from '@/types/vehicle';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useVehicleStore()

const form = reactive({
  brand: 'BRTEST',
  brandRules: [
    (v: string) => !!v || 'La marca es obligatoria',
  ],
  message: '',
  messageType: 'error',
  isLoading: false,
  isValid: false,
  model: 'MOTEST',
  modelRules: [
    (v: string) => !!v || 'El modelo es obligatorio',
  ],
  status: VehicleStatus.AVAILABLE,
  statusRules: [
    (v: VehicleStatus) => !!v || 'El estado es obligatorio',
    (v: VehicleStatus) => v === VehicleStatus.AVAILABLE || v === VehicleStatus.IN_MAINTENANCE || v === VehicleStatus.IN_SERVICE || 'El estado no es válido',
  ],
  year: 1990,
  yearRules: [
    (v: number) => !!v || 'El año es obligatorio',
    (v: number) => v >= 1990 && v <= new Date().getFullYear() || 'El año no es válido. Debe ser mayor o igual a 1990 y menor o igual al año actual',
  ],
})

const resetForm = () => {
  form.brand = '';
  form.model = '';
  form.status = VehicleStatus.AVAILABLE;
  form.year = 1990;
}

const closeAlert = () => {
  form.message = '';
}

const vehicleStatus = Object.values(VehicleStatus)

const createVehicle = async () => {
  if (!form.isValid) return;
  form.isLoading = true;

  const [data, error] = await store.createVehicle(form)

  if (error) {
    form.message = error;
    form.messageType = 'error';
    form.isLoading = false;
    return;
  }

  resetForm();
  form.message = data.message;
  form.messageType = 'success';
  form.isLoading = false;
}

</script>

<template>
  <main>
    <FormLayout>
      <v-alert v-if="form.message" closable class="mb-4" icon="mdi-alert-circle" @click:close="closeAlert"
        title="Mensaje" :text="form.message" variant="tonal" :type="form.messageType"></v-alert>
      <h2 class="tw-text-2xl mb-2">¡Creación de vehículos!</h2>
      <span class="d-inline-block tw-text-gray-500 mb-4">Empieza a registrar los vehículos al sistema</span>
      <v-form v-model="form.isValid" @submit.prevent="createVehicle">
        <v-text-field class="mb-4 tw-max-w-" v-model="form.brand" :rules="form.brandRules" label="Marca" required
          variant="outlined" />
        <v-text-field class="mb-4 tw-max-w-96" v-model="form.model" :rules="form.modelRules" label="Modelo" required
          variant="outlined" />
        <v-select v-model="form.status" label="Status" :items="vehicleStatus" variant="outlined" />
        <v-text-field class="mb-4 tw-max-w-96" v-model.number="form.year" :rules="form.yearRules" label="Modelo"
          required min="1990" max="new Date().getFullYear()" type="number" variant="outlined" />
        <v-btn variant="plain" block class="mb-4">
          <router-link to="/admin">Volver al listado de vehículos</router-link>
        </v-btn>
        <v-btn :loading="form.isLoading" rounded="0" variant="tonal" block type="submit">
          Crear vehículo
        </v-btn>
      </v-form>
    </FormLayout>
  </main>
</template>
