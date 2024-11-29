<script setup lang="ts">
import {  ref, watch } from 'vue';
import { applyChanges, usedWords, words } from '../logic';

const props = defineProps(['fn'])

const isActive = ref(false)

const keys = Object.keys(words)
const selected = ref(Object.keys(usedWords))

watch(isActive, () => {
  if(isActive.value == true) return;  
  applyChanges(selected.value)
  props.fn()
})

</script>

<template>
    <v-dialog max-width="700" v-model="isActive">
        <template v-slot:activator="{ props: activatorProps }">
          <div class="settings" v-bind="activatorProps"><img src="/settings.png" draggable="false"></div>
        </template>
      
        <template v-slot:default="">
          <v-card title="Select words to use">
            <v-card-text>
              <div class="list">
                <v-checkbox v-model="selected" class="m0" v-for="key in keys" :key="key" :label="key" :value="key"/>
              </div>
            </v-card-text>
      
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn class="close" text="Close" @click="isActive = false;">Close</v-btn>

            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>



<style scoped lang="scss">
.settings{
    position: absolute;
    top: 20px;
    right: 20px;

    height: 75px;
    width: 75px;

  img{
    transition: 0.5s ease-in-out;
    user-select: none;
    
    
    &:hover{
      rotate: 360deg;
      transform: scale(1.2);
      filter: brightness(0) saturate(100%) invert(69%) sepia(72%) saturate(622%) hue-rotate(202deg) brightness(100%) contrast(94%);
    }
    
  }
    
}
  
.close{
  border-radius: 10px;
}
  
.v-card {
  background-color: #1e1e2e;
  border-radius: 20px !important;
}

.v-input__details{
  display: none !important;
}
</style>