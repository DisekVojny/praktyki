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
            <div class="desc" v-html="props.details"></div>
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
            <div class="kod">{{ props.kod }}</div>
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

.image{
    height: 200px;
    width: 200px;
    img{
        height: inherit;
        width: inherit;
        object-fit: contain;
    }
}

.details{
    width: 40vw;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 5px;
}

.title{
    height: 40px;
    font-size: 30px;
    text-align: center;
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
        background-color: rgba(113, 253, 136, 0.5);
        border: none;
        border-radius: 5px;
        width: 150px;
        color: green;
        font-weight: 900;
    }
}

ul{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 200px;
    overflow: scroll;

    li{
        list-style-image: url("/icon.png");
    }


}

.list{
    width: 40vw;
}

.right{
    display: flex;
    flex-direction: column;

    justify-content: space-evenly;

    .kod{
        width: 200px;
        height: 50px;
        border-radius: 10px;

        border: 3px green dashed;
        text-align: center;
        font-size: 20px;
        font-weight: 900;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bonus{
        width: 200px;
        height: 50px;
        border-radius: 10px;
        background-color: rgb(48, 212, 75);

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
}
</style>