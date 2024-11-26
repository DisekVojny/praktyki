<script setup lang="ts">
import { ref } from 'vue'
import {getPair} from '../logic.ts'

const input = ref("");
const qa = ref(getPair())

function check() {
  if (input.value == qa.value[1]) {
    input.value = "";
    qa.value = getPair();
  }
}

function hint(){
  alert(qa.value[1])
}
</script>

<template>
  <div class="container">
    <div class="info">{{ qa[0] }}</div>
    <div class="buttons">
      <input type="text" v-model="input" @input="check" placeholder="Message...">
      <button class="hintButton" @click="hint">Hint</button>
    </div>
  </div>
</template>