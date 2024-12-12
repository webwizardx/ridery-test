<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import DialogComponent from '@/components/layout/DialogComponent.vue';
import useVehicleStore from '@/stores/vehicles';
import { VehicleStatus } from '@/types/vehicle';
import debounce from 'debounce';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const headers = ref([
  {
    title: 'ID',
    align: 'start',
    sortable: false,
    key: '_id',
  },
  { title: 'Marca', key: 'brand', align: 'start' },
  { title: 'Modelo', key: 'model', align: 'start' },
  { title: 'Status', key: 'status', align: 'start' },
  { title: 'Año', key: 'year', align: 'start' },
  { title: 'Acciones', key: 'actions', align: 'start' },
])
const vehicleStore = useVehicleStore()
const { isLoading, query, vehicles, totalCount } = storeToRefs(vehicleStore)
const isMobile = ref(false)
const media = window.matchMedia('(max-width: 768px)')
media.addEventListener('change', (e) => {
  isMobile.value = e.matches
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getVehicles = debounce((options: any) => {
  const newQuery = {
    ...query.value,
    limit: options.itemsPerPage || 25,
    page: options.page,
    search: query.value.search,
  }
  vehicleStore.getVehicles(newQuery)
}, 500)

const updateVehicleStatus = (_id: string, status: VehicleStatus) => {
  vehicleStore.patchVehicle(_id, { status })
  getVehicles({ page: 1, search: '' })
}

const deleteVehicle = (_id: string) => {
  vehicleStore.deleteVehicle(_id)
  getVehicles({ page: 1, search: '' })
}

</script>

<template>
  <AdminLayout>
    <v-container>
      <div class="d-flex flex-column flex-sm-row justify-space-between align-center mb-8 ga-3">
        <h1 class="tw-text-3xl d-inline-block">Listado de Vehículos</h1>
        <v-btn variant="flat" prepend-icon="mdi-plus-circle" color="blue" to="/vehicles/create">
          Crear vehículo
        </v-btn>
      </div>
      <v-data-table-server v-model:items-per-page="query.limit" :headers="headers" :items="vehicles"
        :disable-sort="true" :items-length="totalCount" :loading="isLoading"
        loading-text="Obteniendo información de los vehículos..." items-per-page-text="Vehículos por página"
        no-data-text="No hay vehículos en nuestro sistema." :search="query.search" item-value="_id"
        @update:options="getVehicles" :mobile="isMobile">
        <template v-slot:item.actions="{ item }">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="text" prepend-icon="mdi-pencil" color="blue-grey">
                    Editar
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <DialogComponent button-color="red-darken-4" button-text="Eliminar"
                    dialog-text="¿Estás seguro de eliminar este vehículo?" dialog-title="Eliminar vehículo"
                    @onConfirm="deleteVehicle(item._id as string)" />
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <DialogComponent button-color="green" button-text="Cambiar Status a 'Disponible'"
                    dialog-text="¿Estás seguro de actualizar el status del vehículo?"
                    dialog-title="Actualizar status del vehículo"
                    @onConfirm="updateVehicleStatus(item._id as string, VehicleStatus.AVAILABLE)" />
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <DialogComponent button-color="deep-purple" button-text="Cambiar Status a 'En mantenimiento'"
                    dialog-text="¿Estás seguro de actualizar el status del vehículo?"
                    dialog-title="Actualizar status del vehículo"
                    @onConfirm="updateVehicleStatus(item._id as string, VehicleStatus.IN_MAINTENANCE)" />
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <DialogComponent button-color="orange" button-text="Cambiar Status a 'En servicio'"
                    dialog-text="¿Estás seguro de actualizar el status del vehículo?"
                    dialog-title="Actualizar status del vehículo"
                    @onConfirm="updateVehicleStatus(item._id as string, VehicleStatus.IN_SERVICE)" />
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field v-model="query.search" class="ma-2" density="compact"
                placeholder="Buscar por marca, modelo y status" hide-details></v-text-field>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-container>
  </AdminLayout>
</template>
