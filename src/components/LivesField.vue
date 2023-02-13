<template>
    <div class="livesField">
        <img v-for="i in maxLives" :key="i" :id="i" :class="i > maxLives - currentLives ? 'full' : 'empty'">
    </div>
</template>

<script>
    export default {
        name: 'LivesField',
        props: {
            maxLives: {
                type: Number,
                required: true
            },
            currentLives: {
                type: Number,
                required: true
            }
        }
    }
</script>


<style>
    .livesField {
        text-align: right;
    }

    .livesField img {
        height: 20px;
        width: 20px;
        padding: 2px;
    }

    .livesField img.full {
        content: url(@/assets/heart.png);
    }

    .livesField img.empty {
        content: url(@/assets/heart_empty.png);
    }
</style>
