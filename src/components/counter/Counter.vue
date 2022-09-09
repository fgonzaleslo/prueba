<template>
    <div class="counter-content">
        <div class="w-100" style="font-size: 1.25rem;" v-html="title" v-if="title && title != '' && title != undefined"></div>
        <h2 class="counter-main-title" v-text="name"></h2>
        <div class="counter-list">
            <div class="counter__item">
                <div class="counter">
                    <span class="counter__number"  v-text="counter.days"></span>
                    <span class="counter__back" v-bind:style="{ transform: `translateY(${getProgress(100-counter.days, 100)}%)` }"></span>
                </div>
                <h3 class="counter-title">Días</h3>
            </div>
            <div class="counter__item">
                <div class="counter">
                    <span class="counter__number"  v-text="counter.hours"></span>
                    <span class="counter__back" v-bind:style="{ transform: `translateY(${getProgress(24-counter.hours, 24)}%)` }"></span>
                </div>
                <h3 class="counter-title">Horas</h3>
            </div>
            <div class="counter__item">
                <div class="counter">
                    <span class="counter__number" v-text="counter.minutes"></span>
                    <span class="counter__back" v-bind:style="{ transform: `translateY(${getProgress(60-counter.minutes, 60)}%)` }"></span>
                </div>
                <h3 class="counter-title">Minutos</h3>
            </div>
            <div class="counter__item">
                <div class="counter">
                    <span class="counter__number" v-text="counter.seconds"></span>
                    <span class="counter__back" v-bind:style="{ transform: `translateY(${getProgress(60-counter.seconds, 60)}%)` }"></span>
                </div>
                <h3 class="counter-title">Segundos</h3>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'Counter',
    props: ['date', 'name', 'title'],
    data: () => ({
        counter: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        intervalCount: null
    }),
    created() {
    },
    mounted() {
        this.countdown()
    },
    methods: {
        getRemainingTime(deadline){
            let now = new moment(),
                remainTime = (new Date(deadline) - now + 1000) / 1000,
                remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
                remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
                remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
                remainDays = Math.floor(remainTime / (3600 * 24));

            return {
                remainSeconds,
                remainMinutes,
                remainHours,
                remainDays,
                remainTime
            }
        },
        countdown(){
            this.intervalCount = setInterval( () => {
                let t = this.getRemainingTime(moment(this.date));
                this.counter.days = t.remainDays;
                this.counter.hours = t.remainHours;
                this.counter.minutes = t.remainMinutes;
                this.counter.seconds = t.remainSeconds;
                if(t.remainTime <= 1) {
                    clearInterval(this.intervalCount);
                }

            }, 1000)
        },
        getProgress(value, from){
            return (value / from)  * 100;
        }
    },
    computed: {
    },
    destroyed(){
    },
    watch: {
        'date'() {
            console.log(1)
            clearInterval(this.intervalCount);
            this.countdown();  
        }
    }
}
</script>
