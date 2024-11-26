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
    <div class="inputWrapper">
      <input class="input" type="text" v-model="input" @input="check" placeholder="Message...">
      <button class="hint" @click="hint">Hint</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../vars' as *;
@use 'sass:color';

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: $base;
}

.info {
  font-size: clamp(24px, 5vw, 48px);
  font-weight: 700;
  color: $highlight;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}

.inputWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 700px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
}

.input {
  flex: 1;
  height: 70px;
  width: 400px;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  background-color: $subtext;
  color: #45475a;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 0 15px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  outline: none;

  &:hover {
    background-color: color.adjust($subtext, $lightness: 10%);
    cursor: text;
  }

  &:focus {
    box-shadow: 0px 0px 10px rgba(66, 153, 225, 0.7);
    border-color: rgba(66, 153, 225, 0.7);
    background-color: color.adjust($subtext, $lightness: 5%);
  }
}

.hint {
  flex: 0 0 auto;
  height: 70px;
  width: 120px;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  background-color: $button-bg;
  color: $base;
  border: none;
  border-radius: 8px;
  padding: 0 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: $button-hover;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  }
}

@media (max-width: 768px) {
  .info {
    font-size: clamp(18px, 4vw, 36px);
    margin-bottom: 15px;
  }

  .inputWrapper {
    flex-direction: column;
    gap: 15px;
  }

  .input,
  .hint {
    width: 100%;
    height: 50px;
    font-size: 1rem;
  }
}


</style>
