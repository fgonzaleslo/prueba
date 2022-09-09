<template>
    <div class="max-award main-svg" id="max-award">
        <div class="w-100 h-100 d-flex align-items-center justify-content-center" v-html="svgData">

        </div>
        <button class="btn-party"></button>
    </div>
</template>

<script>
import axios from 'axios';
import party  from 'party-js';
// import ConfettiGenerator from "confetti-js";
export default {
    name: 'MaxAward',
    props: ['amount', 'date', 'terminal', 'address', 'concesionario', 'current', 'image'],
    data: () => ({
        btnParty: null,
        intervalParty: null,
        svgData: ''
    }),
    created() {
    },
    mounted() {
        this.setSvgFile();
        this.clearParty();
        this.startParty();
    },
    methods: {
        startParty(){
            this.btnParty = document.querySelector('.btn-party');
            this.intervalParty = setInterval(()=>{
                if(this.btnParty){
                    if(party){
                        party.confetti(this.btnParty, {
                            count: party.variation.range(50, 70),
                            spread: 30
                        });
                    }
                }
            }, 1000)
        },
        clearParty(){
            if(party){
                party.confetti(this.btnParty).clearParticles();
            }
            this.btnParty = null;
            if(this.intervalParty){
                clearInterval(this.intervalParty);
            }
            this.intervalParty = null;
        },
        getPosition(){
            let long = 27.3;
            let size = (this.address + ' ' + this.terminal).length;
            let width = size * long;
            let left = 1490 - ((size / 2) * long);
            let position = `M${left} 2345 l${width} 0`;
            return position;
        },
        setSvgFile(){
            axios
            .get(this.image)
            .then((response) => {
                this.svgData = response.data;
                setTimeout(()=>{
                    this.setValue();
                }, 100)
            });
        },
        setValue(){
            let svgObj = document.querySelector('#max-award svg');
            let contentAmount = document.querySelector('#max-award svg #amount');
            let contentDate = document.querySelector('#max-award svg #date');
            let contentSite = document.querySelector('#max-award svg #site');
            let contentConcessionary = document.querySelector('#max-award svg #concessionary');
            if(svgObj){
                svgObj.classList.add('maxw-100');
                svgObj.classList.add('floating');
            }
            if(contentAmount) contentAmount.innerHTML = this.amount; 
            if(contentDate) contentDate.innerHTML = this.date; 
            if(contentSite) contentSite.innerHTML = this.address + ' ' + this.terminal; 
            if(contentConcessionary) contentConcessionary.innerHTML = this.concesionario; 
        }
    },
    computed: {
    },
    destroyed(){
        this.clearParty();
    },
    watch: {
        'current'(newValue) {
            if(newValue){
                this.startParty();
            }
            else{
                this.clearParty();
            }
        },
        amount() {
            this.setSvgFile();
        },
        image() {
            this.setSvgFile();
        }
    }
}
</script>