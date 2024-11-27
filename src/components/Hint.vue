<script setup lang="ts">
const props = defineProps(['answer'])</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <button class="hintButton" v-bind="activatorProps">Hint</button>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="modal" :title="props.answer">
        <v-card-actions>
          <v-btn
            class="close"
            text="Close"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped type="scss">
.v-card{
    background-color: #1e1e2e;
    border-radius: 10px !important;
}
</style>