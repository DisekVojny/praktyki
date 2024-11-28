<script setup lang="ts">
const props = defineProps(["title", "image", "list", "kod", "details"])
</script>

<template>
    <div class="offer">
        <div class="image">
            <img :src="props.image">
        </div>
        <div class="details">
            <div class="title">{{ props.title }}</div>
            <div class="desc">Sprawdź ofertę powitalną w {{props.title}}. Przeczytaj szczegóły każdego bonusu, który oferuje bukmacher.</div>
            <div class="buttons">
                <button>Bonus {{ props.title }}</button>
                <button>dowiedz sie wiecej</button>
            </div>
        </div>
        <div class="list">
            <ul>
                <li v-for="(desc, i) in props.list" :key="i" v-html="desc"></li>
            </ul>
        </div>
        <div class="right">
            <div class="kod" v-if="kod">{{ props.kod }}</div>
            <div class="bonus">Odbierz bonus!</div>
        </div>
    </div>
</template>

<style scoped lang="scss">



.offer{
    width: 80vw;
    height: 200px;

    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

    display: flex;

    padding: 20px;
    margin-bottom: 20px;
}

.details, .list {
    
    display: flex;
    flex-direction: column;
    text-align: center;
}

.details{
    flex: 1.5;
    padding: 10px;
}

.list{
    flex: 1;
    padding: 5px;
    padding-right: 15px;
    justify-content: center;
}

.image{
    height: 150px;
    width: 150px;
    img{
        height: inherit;
        width: inherit;
        object-fit: contain;
    }
}









.title{
    height: 40px;
    font-size: 30px;
    text-align: center;
    font-weight: 600;
}

.desc{
    height: 100px;
    font-size: 16px;
    overflow: scroll;
}
.buttons{
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items:center;

    button{
        height: 40px;
        background-color: rgba(0, 162, 76, 0.15);
        border: none;
        border-radius: 5px;
        width: 200px;
        color: #00A24C;

        &::after{
            content: '';
            width: 1.5em;
            height: 1em;
            vertical-align: middle;
            display: inline-block;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 100% 100%;
            background-image: url("data:image/svg+xml,%3Csvg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.425 6.99943L1.414 0.996094L0 2.40852L4.6 7.00342L0 11.5913L1.414 13.0038L7.425 6.99943Z' fill='%2300A24C'/%3E%3C/svg%3E%0A");
        }
    }
}

ul {
    max-height: 200px;
    list-style: none; 
    overflow-y: scroll; 
    padding-left: 20px; 
}

li {
    text-align: left;
    position: relative; 

    &::before {
        content: ''; 
        display: inline-block;
        position: absolute; 
        left: 0; 
        top: 50%; 
        transform: translateY(-50%); 
        width: 14px; 
        height: 14px; 
        background-repeat: no-repeat;
        background-size: contain; 
        background-position: center;
        background-image: url("/icon.png");
    }

    padding-left: 20px; 
}


.right{
    width: 200px;
    display: flex;
    flex-direction: column;

    justify-content: space-evenly;

    .kod{
        width: 200px;
        height: 50px;
        border-radius: 10px;

        border: 3px green dashed;
        box-sizing: border-box;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bonus{
        width: 200px;
        height: 50px;
        border-radius: 10px;
        background-color: rgb(0, 162, 76);
        

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        color: white;
        &::after {
            content: '';
            width: 1.5em;
            height: 1em;
            vertical-align: middle;
            display: inline-block;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 100% 100%;
            background-image: url("data:image/svg+xml,%3Csvg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.425 6.99943L1.414 0.996094L0 2.40852L4.6 7.00342L0 11.5913L1.414 13.0038L7.425 6.99943Z' fill='%23FFFFFF'/%3E%3C/svg%3E%0A");
        }
    }
}
</style>