<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import useVehicleStore from '@/stores/vehicles';
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getVehicles = debounce((options: any) => {
  console.log('options', options)
  const newQuery = {
    ...query.value,
    limit: options.itemsPerPage,
    page: options.page,
    search: query.value.search,
    year: query.value.year,
  }
  vehicleStore.getVehicles(newQuery)
}, 500)
const isMobile = ref(false)
const media = window.matchMedia('(max-width: 768px)')

media.addEventListener('change', (e) => {
  console.log('e', e)
  isMobile.value = e.matches
})

</script>

<template>
  <AdminLayout>
    <v-container>
      <v-data-table-server v-model:items-per-page="query.limit" :headers="headers" :items="vehicles"
        :disable-sort="true" :items-length="totalCount" :loading="isLoading" :search="query.search" item-value="_id"
        @update:options="getVehicles" :mobile="isMobile">
        <template v-slot:item.actions>
          <v-menu>
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
                  <v-btn variant="text" prepend-icon="mdi-delete" color="red-darken-4">
                    Eliminar
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="text" prepend-icon="mdi-delete" color="green">
                    Cambiar Status a 'Disponible'
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="text" prepend-icon="mdi-delete" color="deep-purple">
                    Cambiar Status a 'En mantenimiento'
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="text" prepend-icon="mdi-delete" color="indigo">
                    Cambiar Status a 'En servicio'
                  </v-btn>
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
