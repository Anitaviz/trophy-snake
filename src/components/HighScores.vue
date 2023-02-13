<template>
    <div v-if="scores.length">
    <table id="highScoreBox">
        <tr v-for="(score, index) in scores" :key="index">
            <td class="name">{{score.name}}</td>
            <td class="score">{{score.value}}</td>
        </tr>
    </table>
    </div>
    <div v-else>
        <h2>No scores yet!</h2>
    </div>
</template>

<script>
    import eventBus from 'tiny-emitter/instance';
    import { gameState } from '@/classes/GameState';
    import { MAX_HIGHSCORES } from '@/Constants';
export default {
        data() {
            return {
                scores: []
            }
        },
        mounted() {
            this.scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
            /*
             * FIXME: Highscores should not use the game end event, SnakeGame should call it instead
             * */

            eventBus.on('gameEnd', () => {
                this.scores.push({ name: gameState.getName(), value: gameState.getScore()});

                this.scores.sort((a,b) => {
                    if(a.value == b.value){
                        return 0;
                    }else if(a.value > b.value){
                        return -1;
                    }else{
                        return 1;
                    }
                })

                while (this.scores.length > MAX_HIGHSCORES) {
                    this.scores.pop()
                }

                localStorage.setItem('scores', JSON.stringify(this.scores));
            })
        }
}
</script>


<style>
    #highScoreBox {
        table-layout: fixed;
        width: 100%;
        font-family: monospace;
        font-weight: bold;
        font-size: 15pt;
    }
    .name {
        text-align: left;
        overflow-x: hidden;
        white-space: nowrap;
        width: 60%;
    }
    .score{
        text-align: right;
        width: 40%;
    }
</style>
