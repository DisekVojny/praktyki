<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps(['answer', 'showModal']);
const emit = defineEmits(['update:showModal']);

const isActive = ref(false);

watch(() => props.showModal, (newValue) => {
  isActive.value = newValue;
});

function closeModal() {
  isActive.value = false;
  emit('update:showModal', false);
}
</script>

<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <button class="hintButton" v-bind="activatorProps">Hint</button>
    </template>

    <template v-slot:default>
      <v-card class="modal">
        <v-card-title>{{ answer }}</v-card-title>
        <v-card-actions>
          <v-btn class="close" text="Close" @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.v-card {
  background-color: #1e1e2e;
  border-radius: 10px !important;
}
</style>
