<template>
    <div class="SidePanel">
        <h2 >Snake Game</h2>
        <div class="sideBox">
            <PanelBox v-if="!gameIsRunning">
                <template #header>
                    HIGH SCORES
                </template>
                <HighScores />
            </PanelBox>
            <PanelBox v-if="gameIsRunning">
                <template #header>
                    ROUND TIMER
                </template>
                <NumberField>{{gameState.getTimeElapsed()}}</NumberField>
            </PanelBox>
            <PanelBox v-if="gameIsRunning">
                <template #header>
                    SCORE
                </template>
                <NumberField>{{gameState.getScore()}}</NumberField>
            </PanelBox>
            <PanelBox v-if="gameIsRunning">
                <template #header>
                    SPEED
                </template>
                <NumberField>{{gameState.getSpeed()}}</NumberField>
            </PanelBox>
            <PanelBox v-if="gameIsRunning">
                <template #header>
                    SNAKE LENGTH
                </template>
                <NumberField>{{gameState.getSnake().size}}</NumberField>
            </PanelBox>
            <PanelBox v-if="gameIsRunning">
                <template #header>
                    LIVES
                </template>
                <LivesField :maxLives="gameState.getMaxLives()" :currentLives="gameState.getLives()" />
            </PanelBox>
            <span v-if="hasMessage" class="messageArea">
                <h2>{{gameState.getMessage()}}</h2>
            </span>
            <button v-if="!gameIsRunning" @click="startGame" id="startGameButton">START GAME</button>
        </div>
    </div>

</template>

<script>
    import PanelBox from '@/components/PanelBox.vue'
    import NumberField from '@/components/NumberField.vue'
    import LivesField from '@/components/LivesField.vue'
    import HighScores from '@/components/HighScores.vue'
    import SnakeGame from '@/classes/SnakeGame';
    import { gameState } from '@/classes/GameState';

    export default {
        components: {
            PanelBox,
            NumberField,
            LivesField,
            HighScores
        },
        data() {
            return {
                gameState
            }
        },
        computed: {
            hasMessage() {
                return gameState.hasMessage();
            },
            gameIsRunning() {
                return gameState.hasGameBeenStarted();
            }
        },
        methods: {
            startGame() {
                SnakeGame.newGame();
            },
            startGame2() {
                SnakeGame.startGame();
            }
        }
    }
</script>

<style>
    .SidePanel {
        overflow-y: auto;
    }

    .SidePanel h2{
        text-align:center;
        font-size: 20pt;
    }

    .sideBox {
        margin: 10px;
        padding: 10px;
    }
    #startGameButton{
        border-radius: 10px;
        width: 100%;
        height: 60px;
        color:white;
        background-color: black;
        border: 1px solid white;
    }
    #startGameButton:hover {
        background-color: darkgray;
    }

</style>
