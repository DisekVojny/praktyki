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
            <div class="kod" v-if="kod">{{ props.kod }}</div>
            <div class="bonus">Odbierz bonus!</div>
        </div>
    </div>
</template>

<style scoped lang="scss">

// image 200 + details + list + right

.offer{
    width: 80vw;
    height: 200px;

    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

    display: flex;

    padding: 20px;
    margin-bottom: 20px;
}

.details, .list {
    // flex: 1;
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

// .details{
//     // width: calc(40vw - 440px);
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     padding: 5px;
// }

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
        background-color: rgba(113, 253, 136, 0.3);
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

    height: 200px;
    overflow: scroll;
}


ul li {
	padding-left: 0.7rem;
	margin-bottom: 0.6rem;
	list-style-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.57434 10.7114L3.68359 7.7987L5.31547 6.20138L6.57434 7.46984L11.8896 2.11414L13.5215 3.71145L6.57434 10.7114Z' fill='%2300A24C'/%3E%3Cpath d='M6.94531 14V11.745C9.50969 11.745 11.6078 9.63089 11.6078 7.047H13.8924C13.8924 10.8993 10.7686 14 6.94531 14Z' fill='%237BC193'/%3E%3Cpath d='M6.94712 14C3.12387 14 0 10.8523 0 7H2.28462C2.28462 9.58389 4.38275 11.698 6.94712 11.698V14Z' fill='%234EB270'/%3E%3Cpath d='M2.28462 7H0C0 3.14765 3.12387 0 6.94712 0C8.0195 0 9.09187 0.234899 10.071 0.751678L9.04525 2.81879C8.3925 2.48993 7.69312 2.30201 6.94712 2.30201C4.38275 2.30201 2.28462 4.41611 2.28462 7Z' fill='%2300A24C'/%3E%3C/svg%3E");
    font-size: 14px;
    text-align: left;
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