<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import DialogComponent from '@/components/layout/DialogComponent.vue';
import useVehicleStore from '@/stores/vehicles';
import { VehicleStatus } from '@/types/vehicle';
import debounce from 'debounce';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
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
  { title: 'Fecha de creación', key: 'createdAt', align: 'start' },
  { title: 'Acciones', key: 'actions', align: 'start' },
])
const vehicleStore = useVehicleStore()
const { isLoading, query, vehicles, totalCount } = storeToRefs(vehicleStore)
const isMobile = ref(false)
const dialog = reactive({
  isOpen: false,
  title: '',
  message: ''
})
const media = window.matchMedia('(max-width: 768px)')
media.addEventListener('change', (e) => {
  isMobile.value = e.matches
})

const closeDialog = () => {
  dialog.isOpen = false
  dialog.title = ''
  dialog.message = ''
}

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

const updateVehicleStatus = async (_id: string, status: VehicleStatus) => {
  const [data, error] = await vehicleStore.patchVehicle(_id, { status })

  if (error) {
    dialog.isOpen = true
    dialog.title = 'Error'
    dialog.message = error || 'Ha ocurrido un error al actualizar el status del vehículo'
    return
  } else {
    dialog.isOpen = true
    dialog.title = 'Éxito'
    dialog.message = data?.message || 'El status del vehículo ha sido actualizado correctamente'
  }

  getVehicles({ page: 1, search: '' })
}

const deleteVehicle = async (_id: string) => {
  const [data, error] = await vehicleStore.deleteVehicle(_id)

  if (error) {
    dialog.isOpen = true
    dialog.title = 'Error'
    dialog.message = error || 'Ha ocurrido un error al eliminar el vehículo'
    return
  } else {
    dialog.isOpen = true
    dialog.title = 'Éxito'
    dialog.message = data?.message || 'El vehículo ha sido eliminado correctamente'
  }

  getVehicles({ page: 1, search: '' })
}

</script>

<template>
  <AdminLayout>
    <v-dialog v-model="dialog.isOpen" width="auto">
      <v-card max-width="400" prepend-icon="mdi-alert-circle" :text="dialog.message" :title="dialog.title">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="closeDialog"></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-container>
      <div class="d-flex flex-column flex-sm-row justify-space-between align-center mb-8 ga-3">
        <h1 class="tw-text-3xl d-inline-block">Listado de Vehículos</h1>
        <v-btn variant="flat" prepend-icon="mdi-plus-circle" color="blue" to="/vehicles/create">
          Crear vehículo
        </v-btn>
      </div>
      <v-data-table-server v-model:items-per-page="query.limit" :headers="headers" :items="vehicles"
        :items-per-page-options="[10, 25, 50, 100]" :disable-sort="true" :items-length="totalCount" :loading="isLoading"
        loading-text="Obteniendo información de los vehículos..." items-per-page-text="Vehículos por página"
        no-data-text="No hay vehículos en nuestro sistema." :search="query.search" item-value="_id"
        @update:options="getVehicles" :mobile="isMobile">
        <template v-slot:item.createdAt="{ item }">
          {{ new Date(item.createdAt as string).toLocaleString() }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="text" prepend-icon="mdi-pencil" color="blue-grey"
                    :to="`/vehicles/update/${item._id}`">
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
