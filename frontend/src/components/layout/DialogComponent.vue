<script setup lang="ts">
import { ref } from 'vue';

type Props = {
  buttonColor?: string;
  buttonText?: string;
  dialogTitle?: string;
  dialogText?: string;
  onConfirm: () => void;
}

const { buttonColor, buttonText, dialogText, dialogTitle } = defineProps<Props>();
const emit = defineEmits(['onConfirm']);
const isActive = ref(false);

const handleConfirm = () => {
  emit('onConfirm');
  isActive.value = false;
}
</script>

<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn variant="text" prepend-icon="mdi-delete" :color="buttonColor" v-bind="activatorProps">
        {{ buttonText }}
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card :title="dialogTitle">
        <v-card-text>
          {{ dialogText }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
          <v-btn text="Continuar" @click="handleConfirm"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
