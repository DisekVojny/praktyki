<script lang="ts">
import { ref, onMounted } from 'vue';
import Pewniaczek from './Pewniaczek.vue';

export default {
  components: {
    Pewniaczek
  },
  setup() {
    const data = ref<any[] | null>(null); 

    const getData = async () => {
      try {
        const response = await fetch("https://pewniaczki.pl/wp-json/api/bonus");
        const json = await response.json();
        data.value = json.bonuses; 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
    onMounted(getData);

    
    return {
      data
    };
  }
};
</script>

<template>
  <h1>Pewniaczki</h1>

  <div v-if="data === null"><h1>Loading...</h1></div>

  <div v-else>
    <Pewniaczek v-for="(el, i) in data" :key="i" :title="el.title" :image="el.image" :list="el.list" :kod="el.code" :details="el.details"/>
  </div>
</template>



<style scoped>
</style>
