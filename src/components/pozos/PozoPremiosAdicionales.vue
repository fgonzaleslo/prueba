<template>
    <div class="pozo-premios-adicionales main-svg" id="pozo-premios-adicionales" v-html="svgData">
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'PozoPremiosAdicionales',
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
            let svgObj = document.querySelector('#pozo-premios-adicionales svg');
            let contentSvg = document.querySelector('#pozo-premios-adicionales svg #content');
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