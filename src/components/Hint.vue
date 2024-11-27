<script setup lang="ts">
import { ref, onMounted, onUnmounted, Ref } from 'vue';

const props = defineProps({
  answer: String,
});

const isActive = ref(false);
let timeoutId: number | null = null;  
let isOpening = ref(false);  


function handleKeyboardShortcut(event: KeyboardEvent) {
  if (event.ctrlKey && event.code === 'Space') {
    
    if (isOpening.value) return;

    
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    
    timeoutId = setTimeout(() => {
      isActive.value = true;  
    }, 100);  
  }
}


function closeModal() {
  isActive.value = false;
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyboardShortcut);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboardShortcut);
});


const handleModalBeforeEnter = () => {
  isOpening.value = true;  
};

const handleModalAfterEnter = () => {
  isOpening.value = false;  
};
</script>

<template>
  <v-dialog
    v-model="isActive"
    max-width="500"
    @before-enter="handleModalBeforeEnter"
    @after-enter="handleModalAfterEnter"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <button class="hintButton" v-bind="activatorProps">Hint</button>
    </template>

    <template v-slot:default>
      <v-card class="modal">
        <v-card-title>{{ props.answer }}</v-card-title>
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