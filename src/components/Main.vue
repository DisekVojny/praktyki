<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {getPair} from '../logic.ts'
import Hint from "./Hint.vue";

const input = ref("");
const qa = ref(getPair())

function check() {
  if (input.value == qa.value[1]) {
    input.value = "";
    qa.value = getPair();
  }
}
</script>

<template>
  <div class="container">
    <div class="info">{{ qa[0] }}</div>
    <div class="buttons">
      <input class="input" type="text" v-model="input" @input="check" placeholder="Message..." autofocus>
      <!-- <button class="hintButton" @click="hint">Hint</button> -->
       <Hint :answer="qa[1]"></Hint>
    </div>
  </div>
</template>