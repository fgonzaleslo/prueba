<template>
    <div class="main-svg pozo-acumulado-tesoro-inca" id="pozo-acumulado-tesoro-inca" v-html="svgData">
       
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'PozoAcumuladoTesoroInca',
    props: ['amount', 'image'],
    data: () => ({
        svgData: ''
    }),
    mounted() {
        this.setSvgFile();
    },
    methods: {
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
            let svgObj = document.querySelector('#pozo-acumulado-tesoro-inca svg');
            let contentSvg = document.querySelector('#pozo-acumulado-tesoro-inca svg #content');
            if(svgObj){
                svgObj.classList.add('maxw-100');
                svgObj.classList.add('floating');
            }
            if(contentSvg){
                contentSvg.innerHTML = this.amount;
            }
        }
    },
    computed: {
    },
    watch: {
        amount() {
            this.setSvgFile();
        },
        image() {
            this.setSvgFile();
        }
    }
}
</script>