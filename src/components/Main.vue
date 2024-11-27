<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { getPair } from '../logic.ts';
import Hint from './Hint.vue';

const input = ref('');
const qa = ref(getPair());
const showModal = ref(false);

function check() {
  if (input.value === qa.value[1]) {
    input.value = '';
    qa.value = getPair();
  }
}

function handleKeyboardShortcut(event: KeyboardEvent) {
  if (event.ctrlKey && event.code === 'Space') {
    showModal.value = true;
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyboardShortcut);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboardShortcut);
});
</script>

<template>
  <div class="container">
    <div class="info">{{ qa[0] }}</div>
    <div class="buttons">
      <input class="input" type="text" v-model="input" @input="check" placeholder="Message..." autofocus>
      <Hint :answer="qa[1]" v-model:showModal="showModal" />
    </div>
  </div>
</template>
