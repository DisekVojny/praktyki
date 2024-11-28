<template>
    <div class="navbar">
        <div class="main">
            <div class="slot logo"><img src="/logo.svg"></div>
            <div class="slot"><span class="underline">Typy bukmachersie</span></div>
            <div class="slot"><span class="underline">Bonusy i promocje</span></div>
            <div class="slot"><span class="underline">Ranking bukmacherow</span></div>
            <div class="slot"><span class="underline">Porady</span></div>
            <div class="slot"><span class="underline">Legalni bukmacherzy</span></div>
            <div class="slot icons">
                <img src="/social/fb.svg">
                <img src="/social/yt.svg">
                <img src="/social/tt.svg">
                <img src="/social/ig.svg">
            </div>

        </div>
        <hr>
        <div class="breadcrumb">
            <span class="green">Pewniaczki.pl</span>
            <div class="separator"/>
            <span>Bonusy</span>
        </div>
        <hr>
    </div>
</template>


<style scoped lang="scss">

.navbar{
    width: 80vw;
}
.main{
    width: 80vw;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    .slot{
        width: 10vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icons{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .logo{
        width: 20vw;
    }
}

hr{
    opacity: 0.1;
}

.breadcrumb{
    display: flex;
    flex-direction: row;
    .green{
        color: rgb(0, 136, 64);
    }

    padding: 10px;
}

.separator {
	display: inline-block;
	margin: 0 0.5em;
	width: 0.5rem;
	height: 1.5rem;
	vertical-align: middle;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50% 35%;
	background-image: url("data:image/svg+xml,%3Csvg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.425 6.99943L1.414 0.996094L0 2.40852L4.6 7.00342L0 11.5913L1.414 13.0038L7.425 6.99943Z' fill='%23111111'/%3E%3C/svg%3E%0A");
}

.underline{
    cursor: pointer;
    padding: 5px 0;
    display: inline-block;
    position: relative;

    &::after{
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: rgb(0, 136, 64);
        transition: transform 0.25s ease-out;

        transform-origin: bottom right;
    }

    &:hover{
        &::after{
            transform: scaleX(1);
            transform-origin: bottom left;
        }
    }
}
</style>