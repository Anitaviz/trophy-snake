import { createApp } from 'vue'
import App from './App.vue'
import Clock from '@/classes/GameClock';
import SoundManager from '@/classes/SoundManager';
import Animator from '@/classes/Animator';

const gameClock = new Clock();
gameClock.init();

const soundManager = new SoundManager();
soundManager.init();

const animator = new Animator();
animator.init();

const app = createApp(App);


app.mount('#app');

