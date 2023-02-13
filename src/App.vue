<template>
    <div class="playArea">
        <PlayField />
    </div>
    <div class="sidePanel">
        <SidePanel />
    </div>
</template>

<script>
    import PlayField from '@/components/PlayField.vue'
    import SidePanel from '@/components/SidePanel.vue'
    import SnakeGame from '@/classes/SnakeGame';

    export default {
        name: 'SnakeGame',
        components: {
            PlayField,
            SidePanel
        },
        mounted() {
            SnakeGame.init()
        }

    }
</script>

<style>
    html {
        width: 100%;
        height: 100%;
    }

    body {
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family:monospace;
        color: #ffffff;
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #000000;
        display: flex;
    }

    .playArea {
        flex-grow: 1;
    }

    .sidePanel {
        width: 400px;
    }

    .floatingText {
        position: absolute;
    }
</style>
