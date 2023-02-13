<template>
    <div id="gameFieldWrapper">
        <table id="gameFieldTable">
            <tr class="gameRow">
                <td class="border"></td>
                <td v-for="x in GAME_AREA_WIDTH" :key="x" class="border"></td>
                <td class="border"></td>
            </tr>
            <tr v-for="y in GAME_AREA_HEIGHT" :key="y" :id="'row_'+y" class="gameRow">
                <td class="border"></td>
                <td v-for="x in GAME_AREA_WIDTH" :key="x" :id="'field_'+y+'_'+x" :class="getFieldClass(x,y)"></td>
                <td class="border"></td>
            </tr>
            <tr class="gameRow">
                <td class="border"></td>
                <td v-for="x in GAME_AREA_WIDTH" :key="x" class="border"></td>
                <td class="border"></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { gameState } from '@/classes/GameState';
    import { GAME_AREA_HEIGHT, GAME_AREA_WIDTH } from '@/Constants';
    import Point from '@/classes/Point';

    export default {
        data() {
            return {
                gameState,
                GAME_AREA_HEIGHT,
                GAME_AREA_WIDTH
            }
        },
        methods: {
            getFieldClass(x, y) {
                const location = new Point(x, y);
                if (gameState.getSnake()?.head.compare(location)) {
                    return 'head';
                }
                if (gameState.getSnake()?.isPointOnSnake(location)) {
                    return 'snake';
                }
                if (gameState.getFood()?.compare(location)) {
                    return 'food';
                }
                return '';
            }
        }
    }
</script>

<style>
    #gameFieldWrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .gameRow {
        width: 100%;
        height: 20px;
    }

    .gameRow td {
        width: 20px;
        height: 20px;
    }

    .gameRow td.snake {
        background-color: white;
    }

    .gameRow td.border {
        background-color: blue;
    }

    .gameRow td.food {
        background-color: red;
    }

    .gameRow td.head {
        background-color: green;
    }
</style>
