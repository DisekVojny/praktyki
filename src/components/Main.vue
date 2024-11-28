<script lang="ts">
import { ref, onMounted } from 'vue';
import Pewniaczek from './Pewniaczek.vue';
import Navbar from './Navbar.vue';

export default {
  components: {
    Pewniaczek,
    Navbar,
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
  <Navbar/>

   <div v-if="data === null" class="loading">
      <v-skeleton-loader color="gray" elevation="24" type="image" height="200px"/>
      <v-skeleton-loader color="gray" elevation="24" type="image" height="200px"/>
      <v-skeleton-loader color="gray" elevation="24" type="image" height="200px"/>
    </div>
     
  <div v-else class="offers">
    <div>
      <Pewniaczek v-for="(el, i) in data" :key="i" :title="el.title" :image="el.image" :list="el.list" :kod="el.code" :details="el.details"/>
    </div>

  </div>
</template>



<style scoped lang="scss">
 .offers{
  width: 80vw;
 }

 .loading *{
  margin-bottom: 30px;
 }
</style>
