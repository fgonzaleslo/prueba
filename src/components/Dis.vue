<template>
	<div class="layout" v-if="display" v-bind:class="[this.display.layout]" :style="`background-image: url(${display.background});`">
		  <div class="layout-content">
			  <div class="layout-content__top">
				  <div class="layout-item slides left">
					  <div class="layout-item__content notice d-flex bg-opacity-25 rounded border-primary border border-dashed">
						  <div class="card-body p-0" >
							  <vueper-slides fade autoplay :arrows="false" :bullets="false" v-if="loadDataComplete" :touchable="false" class="slide-100 slides-order" :pause-on-hover="false" @slide="setCurrentSlide($event, 'left')" @ready="setCurrentSlide($event, 'left')">
								  <!-- SLIDES ALL -->
								  <vueper-slide v-for="(slide, iSlide) in slidesLeft" v-bind:style="{order: slide.order}" :duration="getDurationSlide(slide)" :key="'slides-'+iSlide" :title="(slide.slug === slideLottery)?'lottery':''" v-bind:class="{'p-0': slide.type !== 'QUERY'}">
									  <template #content>
										  <!-- SLIDES NO QUERY -->
										  <!--video-->
										  <div class="vueperslide__content-wrapper no-query" v-if="slide.type !== 'QUERY'">
											  
											  <video :id="'left-video-'+iSlide" class="slide-video w-100 rounded-xl" v-if="getContent(slide, 'video')" :controls="false">
												  <source :src="slide.file" type="video/ogg">
												  <img src="../loteria.png"/>
											  </video>
											  <img v-else-if="getContent(slide, 'image')" :src="slide.file" alt="">
										  </div>
										  <!-- SLIDE POZOS -->
										  <!--<div class="vueperslide__content-wrapper slide-query slide-query__pozos" v-if="slide.slug === slidePozos">
											  <div class="slide-query__pozos-item inca">
												  <div class="slide-query__item">
													  <pozo-de-los-juegos-tesoro-inca :amount="getManeyFormat(apiData.pozos.pozoJuegosTesoroInca.monto)" :image="apiData.pozos.pozoJuegosTesoroInca.file"></pozo-de-los-juegos-tesoro-inca>
												  </div>
											  </div>
											  <div class="slide-query__pozos-item acumulado">
												  <div class="slide-query__item">
													  <pozo-acumulado-tesoro-inca :amount="getManeyFormat(apiData.pozos.pozoAcumuladoTesoroInca.monto)" :image="apiData.pozos.pozoAcumuladoTesoroInca.file"></pozo-acumulado-tesoro-inca>
												  </div>
											  </div>
											  <div class="slide-query__pozos-item adicionales">
												  <div class="slide-query__item">
													  <pozo-premios-adicionales :amount="getManeyFormat(apiData.pozos.pozoPremiosAdicionales.monto)" :image="apiData.pozos.pozoPremiosAdicionales.file"></pozo-premios-adicionales>
												  </div>
											  </div>
											  
										  </div>-->
										  <!-- SLIDE LOTTERY -->
										  <div class="vueperslide__content-wrapper" v-if="slide.slug === slideLottery">
											  <h2 class="text-center mb-5" v-text="display.lottery.name"></h2>
											  <div class="slide-lottery">
												  <div class="slide-lottery__content">
													  <div class="slide-lottery__item border-warning bg-warning-light">
														  <div class="slide-lottery__text text-left text-md">Nombres</div>
														  <div class="slide-lottery__text text-center text-md">Documento</div>
														  <div class="slide-lottery__text text-right text-md">Opciones</div>
													  </div>
													  <dynamic-marquee id="marqueeLottery" :direction="'column'" :reverse="true" :hoverPause="false" :speed="{type: 'duration', number: ((display.lottery.duration?(parseInt(display.lottery.duration) * 1000):3000))}" :repeat="false" :pause="currentSlide.left !== iSlide">
														  <div v-for="(winner, winnerI) in display.lottery.winners" v-bind:key="'lottery-winner+'+winnerI" class="slide-lottery__item">
															  <div class="slide-lottery__text text-left text-md" v-text="winner.name + ' ' + winner.last_name"></div>
															  <div class="slide-lottery__text text-center text-md" v-text="'DNI '+winner.document"></div>
															  <div class="slide-lottery__text text-right text-md" v-text="display.lottery.completed?winner.winner_option:winner.options"></div>
														  </div>
													  </dynamic-marquee>
												  </div>
											  </div>
										  </div>
										  <!-- SLIDE POZO PROMOCION -->
										  <div class="vueperslide__content-wrapper slide-query" v-if="slide.slug === pozoPromocion">
											  <div class="slide-query__item slide-query__item-promotion ">
												  <pozo-promocion :amount="(apiData.pozos.statusPozoPromotion.activo && apiData.pozos.statusPozoPromotion.visible)?getManeyFormat(apiData.pozos.pozoPromocion.monto):'0'" :image="apiData.pozos.pozoPromocion.file"></pozo-promocion>
											  </div>
										  </div>
										  <!-- SLIDE WINNERS -->
										  <!--<div class="vueperslide__content-wrapper d-flex flex-column slide-winners py-10" v-if="slide.slug === slideWinners">
											  <h2 class="fs-1x fw-bolder text-center mb-0 d-flex align-items-center mb-4 mt-15">Nuestros últimos ganadores</h2>
											  <div class="slide-winners__content">
												  <div class="slide-winners__item" v-for="(winner, iW) in apiData.ganadores" v-bind:key="'winner-'+iW">
													  <div class="slide-winners__item-content">
														  <div class="slide-winners__item-content-bg">
															  <h2 class="winner-title" v-text="`${winner.Gan_Nombres} ${winner.Gan_ApellidoP} ${winner.Gan_ApellidoM}`"></h2>
															  <h5 class="winner-text my-1" v-text="`DNI: ${winner.DNI}`"></h5>
															  <h1 class="winner-subtitle" v-text="getManeyFormat(winner.AMOUNT)"></h1>
														  </div>
													  </div>
												  </div>
												  <div class="slide-winners__item" v-for="i in (apiData.ganadores.length % 4)" v-bind:key="'winner-'+(apiData.ganadores.length + i)">
												  </div>
											  </div>
										  </div>-->
										  <!-- SLIDE MAX AWARD -->
										  <div class="vueperslide__content-wrapper slide-query" v-if="slide.slug === slideMaxAward">
											  <div class="slide-query__item slide-query__item-max-award">
												  <max-award :amount="getManeyFormat(apiData.maxAwardWeek.price_final)" :date="getDateFormat(apiData.maxAwardWeek.WIN_Timestamp)" :terminal="'TERMIMAL: '+apiData.maxAwardWeek.Serie" :address="apiData.maxAwardWeek.CITY" :concesionario="'CONCESIONARIO:' + apiData.maxAwardWeek.concesionario" :current="currentSlide.left == iSlide" :image="apiData.pozos.maxAward.file"></max-award>
											  </div>
										  </div>
										  <!-- SLIDE COUNTER -->
										  <div class="vueperslide__content-wrapper slide-query" v-if="slide.slug === 'counter'">
											  <counter :date="apiData.counter.date_end?apiData.counter.date_end:apiData.counter.date_from" :name="apiData.counter.name" :title="slide.title"></counter>
										  </div>
									  </template>
								  </vueper-slide>
							  </vueper-slides>
						  </div>
					  </div>	
				  </div>
				  <div class="layout-item banners right" v-if="this.display.layout == 'vertical'">
					  <div class=" layout-item__content notice d-flex bg-opacity-25 rounded border-primary border border-dashed">
						  <div class="card-body p-0">
							  <vueper-slides  fade autoplay :arrows="false" :bullets="false" :touchable="false" v-if="loadDataComplete" class="slide-100 slides-order" :pause-on-hover="false" @slide="setCurrentSlide($event, 'right')" @ready="setCurrentSlide($event, 'right')">
								  <vueper-slide v-for="(slide, iSlide) in slidesRight" v-bind:style="{order: slide.order}" :duration="getDurationSlide(slide)" :key="'slides-'+iSlide" :title="(slide.slug === slideLottery)?'lottery':''" v-bind:class="{'p-0': slide.type !== 'QUERY'}">
									  <template #content>
										  <!-- SLIDES NO QUERY -->
										  <div class="vueperslide__content-wrapper no-query" v-if="slide.type !== 'QUERY'">
											  <video :id="'right-video-'+iSlide" class="slide-video w-100 rounded-xl" v-if="getContent(slide, 'video')" :controls="false">
												  <source :src="slide.file" type="video/mp4">
											  </video>
											  <img class="w-100 rounded-xl" v-else-if="getContent(slide, 'image')" :src="slide.file" alt="">
										  </div>
										  <!-- SLIDE POZOS -->
										  <!--<div class="vueperslide__content-wrapper slide-query slide-query__pozos" v-if="slide.slug === slidePozos">
											  <div class="slide-query__pozos-item inca">
												  <div class="slide-query__item">
													  <pozo-de-los-juegos-tesoro-inca :amount="getManeyFormat(apiData.pozos.pozoJuegosTesoroInca.monto)" :image="apiData.pozos.pozoJuegosTesoroInca.file"></pozo-de-los-juegos-tesoro-inca>
												  </div>
											  </div>
											  <div class="slide-query__pozos-item acumulado">
												  <div class="slide-query__item">
													  <pozo-acumulado-tesoro-inca :amount="getManeyFormat(apiData.pozos.pozoAcumuladoTesoroInca.monto)" :image="apiData.pozos.pozoAcumuladoTesoroInca.file"></pozo-acumulado-tesoro-inca>
												  </div>
											  </div>
											  <div class="slide-query__pozos-item adicionales">
												  <div class="slide-query__item">
													  <pozo-premios-adicionales :amount="getManeyFormat(apiData.pozos.pozoPremiosAdicionales.monto)" :image="apiData.pozos.pozoPremiosAdicionales.file"></pozo-premios-adicionales>
												  </div>
											  </div>
											  
										  </div>-->
										  <!-- SLIDE LOTTERY -->
										  <div class="vueperslide__content-wrapper" v-if="slide.slug === slideLottery">
											  <h2 class="text-center mb-5" v-text="display.lottery.name"></h2>
											  <div class="slide-lottery">
												  <div class="slide-lottery__content">
													  <div class="slide-lottery__item border-warning bg-warning-light">
														  <div class="slide-lottery__text text-left text-md">Nombres</div>
														  <div class="slide-lottery__text text-center text-md">Documento</div>
														  <div class="slide-lottery__text text-right text-md">Opciones</div>
													  </div>
													  <dynamic-marquee id="marqueeLottery" :direction="'column'" :reverse="true" :hoverPause="false" :speed="{type: 'duration', number: ((display.lottery.duration?(parseInt(display.lottery.duration) * 1000):3000))}" :repeat="false" :pause="currentSlide.right !== iSlide">
														  <div v-for="(winner, winnerI) in display.lottery.winners" v-bind:key="'lottery-winner+'+winnerI" class="slide-lottery__item">
															  <div class="slide-lottery__text text-left text-md" v-text="winner.name + ' ' + winner.last_name"></div>
															  <div class="slide-lottery__text text-center text-md" v-text="'DNI '+winner.document"></div>
															  <div class="slide-lottery__text text-right text-md" v-text="display.lottery.completed?winner.winner_option:winner.options"></div>
														  </div>
													  </dynamic-marquee>
												  </div>
											  </div>
										  </div>
										  <!-- SLIDE POZO PROMOCION -->
										  <div class="vueperslide__content-wrapper slide-query" v-if="slide.slug === pozoPromocion">
											  <div class="slide-query__item slide-query__item-promotion ">
												  <pozo-promocion :amount="(apiData.pozos.statusPozoPromotion.activo && apiData.pozos.statusPozoPromotion.visible)?getManeyFormat(apiData.pozos.pozoPromocion.monto):'0'" :image="apiData.pozos.pozoPromocion.file"></pozo-promocion>
											  </div>
										  </div>
										  <!-- SLIDE WINNERS -->
										  <!--<div class="vueperslide__content-wrapper d-flex flex-column slide-winners py-10" v-if="slide.slug === slideWinners">
											  <h2 class="fs-1x fw-bolder text-center mb-0 d-flex align-items-center mb-4 mt-15">Nuestros últimos ganadores</h2>
											  <div class="slide-winners__content">
												  <div class="slide-winners__item" v-for="(winner, iW) in apiData.ganadores" v-bind:key="'winner-'+iW">
													  <div class="slide-winners__item-content">
														  <div class="slide-winners__item-content-bg">
															  <h2 class="winner-title" v-text="`${winner.Gan_Nombres} ${winner.Gan_ApellidoP} ${winner.Gan_ApellidoM}`"></h2>
															  <h5 class="winner-text my-1" v-text="`DNI: ${winner.DNI}`"></h5>
															  <h1 class="winner-subtitle" v-text="getManeyFormat(winner.AMOUNT)"></h1>
														  </div>
													  </div>
												  </div>
												  <div class="slide-winners__item" v-for="i in (apiData.ganadores.length % 4)" v-bind:key="'winner-'+(apiData.ganadores.length + i)">
												  </div>
											  </div>
										  </div>-->
										  <!-- SLIDE MAX AWARD -->
										  <div class="vueperslide__content-wrapper slide-query" v-if="slide.slug === slideMaxAward">
											  <div class="slide-query__item slide-query__item-max-award">
												  <max-award :amount="getManeyFormat(apiData.maxAwardWeek.price_final)" :date="getDateFormat(apiData.maxAwardWeek.WIN_Timestamp)" :terminal="'TERMIMAL: '+apiData.maxAwardWeek.Serie" :address="apiData.maxAwardWeek.CITY" :concesionario="'CONCESIONARIO:' + apiData.maxAwardWeek.concesionario" :current="currentSlide.right == iSlide" :image="apiData.pozos.maxAward.file"></max-award>
											  </div>
										  </div>
										  <!-- SLIDE COUNTER -->
										  <div class="vueperslide__content-wrapper slide-query" v-if="slide.slug === 'counter'">
											  <counter :date="apiData.counter.date_end?apiData.counter.date_end:apiData.counter.date_from" :name="apiData.counter.name" :title="slide.title"></counter>
										  </div>
									  </template>
								  </vueper-slide>
							  </vueper-slides>
						  </div>
					  </div>	
				  </div>
			  </div>
			  <!--<div class="layout-item messages">
				  <div class=" layout-item__content notice d-flex">
					  <div class="card-body" v-if="display.messages.length > 0">
						  <vueper-slides :pause-on-hover="false" autoplay :duration="durationMessage" class="bg-black text-white rounded no-shadow" :arrows="false" :bullets="false">
							  <vueper-slide v-for="(message, iMessage) in display.messages" :key="'message-'+iMessage" :content="message.message" />
						  </vueper-slides>
					  </div>
				  </div>	
			  </div>-->
		  </div>
		  <!-- PLAYER -->
		  <audio controls id="player" ref="player" class="audioPlay" muted="muted"> 
			  <source type="audio/mpeg">
		  </audio>
		  <!-- END PLAYER -->
		  <button type="button" id="button-max-award" class="button-max-award" data-toggle="modal" data-target="#modal-max-award"></button>
		  <!-- <button type="button" class="btn btn-primary btn-modal-award" data-toggle="modal" data-target="#modal-max-award"></button> -->
		  <!-- MODAL -->
		  <!-- modal-full -->
		  <!-- v-bind:class="{'show animate__fadeInDown': showModal}" -->
		  <div class="modal fade modal-max-award"  tabindex="-1" id="modal-max-award" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered my-auto h-75 mh-75 minh-75">
				  <div class="modal-content w-100 h-100">
					  <div class="modal-body d-flex justify-content-center align-items-center p-0 w-100 h-100">
						  <div class="slide-query w-100 h-100">
							  <div class="slide-query__item maxw-100 maxh-100 no-scale bg-black p-0 h-auto flex-row" v-if="apiData && apiData.maxAwardToday">
								  <video @play="startVideoModal()" @ended="endedVideoModal()" id="videoMaxAward" class="w-100">
									  <source src="/assets/video/video-award.ogg" type="video/ogg" />
								  </video>
								  <div class="d-flex flex-column animate__animated animate__fadeIn" v-if="showModalText">
									  <h1 class="modal-max-award-date" v-text="getDateFormat(apiData.maxAwardToday.WIN_Timestamp)"></h1>
									  <h1 class="modal-max-award-title" v-text="getManeyFormat(apiData.maxAwardToday.price_final)"></h1>
									  <div class="max-award-modal-text">
										  <h1 class="modal-max-award-name" v-text="apiData.maxAwardToday.concesionario"></h1>
										  <h1 class="modal-max-award-address" v-text="apiData.maxAwardToday.CITY"></h1>
										  <h1 class="modal-max-award-term" v-text="'TERMIMAL '+apiData.maxAwardToday.Serie"></h1>
									  </div>
								  </div>
							  </div>
						  </div>
					  </div>
				  </div>
			  </div>
		  </div>
		  <!-- END MODAL -->
  </div>
  </template>
  
  <script>
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import {config} from '../config/config.js';
  import axios from 'axios';
  import moment from 'moment';
  // import party  from 'party-js';
  import { io } from 'socket.io-client';
  import MaxAward from './awards/max-award/MaxAward.vue';
  import PozoAcumuladoTesoroInca from './pozos/PozoAcumuladoTesoroInca.vue';
  import PozoDeLosJuegosTesoroInca from './pozos/PozoDeLosJuegosTesoroInca.vue';
  import PozoPremiosAdicionales from './pozos/PozoPremiosAdicionales.vue';
  import PozoPromocion from './pozos/PozoPromocion.vue';
  import Counter from './counter/Counter.vue';
  import DynamicMarquee from 'vue-dynamic-marquee';
  
  export default {
	name: 'Display',
	components: { 
		  VueperSlides, 
		  VueperSlide, 
		  MaxAward, 
		  PozoAcumuladoTesoroInca,
		  PozoDeLosJuegosTesoroInca,
		  PozoPremiosAdicionales,
		  PozoPromocion,
		  DynamicMarquee,
		  Counter
	  },
	props: [],
	data: () => ({
	  config: config,
	  concessionaryId: null,
	  display: null,
	  apiData: null,
	  durationInit: 3,
	  playerStatus: false,
	  currentSong: null,
	  currentSongIndex: 0,
	  pendingSongs: [],
	  playedSongs: [],
	  // 5 MINUTOS
	  apiInterval: config.APP_API_POZO_INTERVAL?((config.APP_API_POZO_INTERVAL * 60) * 1000): 300000,
	  apiUrl: config.APP_API_POZO_URL,
	  slidePozos: config.APP_SLIDE_POZOS,
	  pozoPromocion: config.APP_POZO_PROMOCION,
	  slideWinners: config.APP_SLIDE_GANADORES,
	  slideMaxAward: config.APP_SLIDE_MAX_AWARD,
	  slideMaxAwardDay: config.APP_SLIDE_MAX_AWARD_DAY,
	  slideLottery: config.APP_SLIDE_LOTTERY,
	  slideCounter: config.APP_SLIDE_COUNTER,
	  slideQueries: [
			  config.APP_SLIDE_POZOS,
			  config.APP_POZO_PROMOCION,
			  config.APP_SLIDE_GANADORES,
			  config.APP_SLIDE_MAX_AWARD,
			  config.APP_SLIDE_LOTTERY,
			  config.APP_SLIDE_COUNTER
	  ],
	  showModal: false,
	  showModalText: false,
	  parameters: {
		  id: null,
		  realtime: false
	  },
	  // SOCKET
	  socket: null,
	  statusFirstModal: false,
	  showTitleAward: false,
	  pauseWinners: true,
	  currentSlide: {
		  left: 0,
		  right: 0
	  },
	  durationMessage: config.APP_DURATION_MESSAGE,
	  idVideoPlayingLeft: null,
	  idVideoPlayingRight: null
	}),
	mounted() {
	  this.getParams();
	  this.getDisplay();
		  this.socket = io(config.APP_API_URL_BASE);
		  this.socket.on('screen', ()=>{
			  this.getDisplay();
		  })
	  // setTimeout(()=>{
	  // 	this.initPlayer();
	  // }, 5000);
	},
	methods: {
	  parse_query_string(query) {
		  var vars = query.split("&");
		  var query_string = {};
		  for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			var key = decodeURIComponent(pair[0]);
			var value = decodeURIComponent(pair[1]);
			// If first entry with this name
			if (typeof query_string[key] === "undefined") {
			  query_string[key] = decodeURIComponent(value);
			  // If second entry with this name
			} else if (typeof query_string[key] === "string") {
			  var arr = [query_string[key], decodeURIComponent(value)];
			  query_string[key] = arr;
			  // If third or later entry with this name
			} else {
			  query_string[key].push(decodeURIComponent(value));
			}
		  }
		  return query_string;
	  },
	  asyncApi(){
		  let time = this.apiInterval;
		  setInterval(()=>{
			  this.getPozos()
		  }, time)
	  },
	  getParams(){
		let query = window.location.search;
		if(query){
		  query = query.substring(1);
		  this.parameters = this.parse_query_string(query);
		}
	  },
	  getDisplay(){
		  this.display = null;
		  axios
		  .get(config.APP_API_URL+'/display?id='+this.parameters.id)
		  .then((response) => {
			  this.display = response.data
			  if(this.display.concessionary.birthday){
				  this.display.messages.push({
					  "id": 0,
					  "message": "🥳🎂🍰🎁🎈🎊 ¡Feliz cumpleaños "+this.display.concessionary.contact_name+"! 🎊🎈🎁🍰🎂🥳",
					  "order": 3
				  })
			  }
  
			  let msg = '';
			  if(this.display.concessionary.message && this.display.concessionary.message != ''){
				  msg = this.display.concessionary.message + ' ';
			  }
			  this.display.messages.unshift({
				  "id": 0,
				  "message":  msg + this.display.concessionary.name,
				  "order": 1
			  });
			  this.getPozos()
			  this.asyncApi()
			  setTimeout(()=>{
				  this.initPlayer();
			  }, 1000)
		  })
		  .catch(() => {
		  })
	  },
	  getPozos(){
		  axios
		  .get(config.APP_API_URL+'/display/api?id='+this.parameters.id)
		  .then((response) => {
			  this.apiData = response.data
			  this.initPozos()
			  if(this.apiData.maxAwardToday){
				  this.showModalAward();
			  }
		  })
		  .catch(() => {
		  })
	  },
	  initPozos(){
		  try{
			  if(this.apiData.pozos.pozoPromocion == ''){
				  this.apiData.pozos.pozoPromocion = {active: false, duration: 3000};
			  }
			  this.apiData.pozos.pozoPromocion.active = false;
			  this.apiData.slidePozos = { active: false, duration: 3000 };
			  this.apiData.slideWinners = { active: false, duration: 3000 };
			  this.apiData.slideMaxAward = { active: false, duration: 3000 };
	  
			  this.display.slides.forEach(slide => {
				  let slideDuration = slide.duration?(parseInt(slide.duration) * 1000):(this.durationInit * 1000);
				  if(slide.slug === this.slidePozos){
					  this.apiData.slidePozos.active = true;
					  this.apiData.slidePozos.duration = slideDuration;
					  this.apiData.slidePozos.order = slide.order;
					  this.apiData.slidePozos.position = slide.position;
				  }
				  else if(slide.slug === this.pozoPromocion){
					  this.apiData.pozos.pozoPromocion.active = true;
					  this.apiData.pozos.pozoPromocion.duration = slideDuration;
					  this.apiData.pozos.pozoPromocion.order = slide.order;
					  this.apiData.pozos.pozoPromocion.position = slide.position;
				  }
				  else if(slide.slug === this.slideWinners){
					  this.apiData.slideWinners.active = true;
					  this.apiData.slideWinners.duration = slideDuration;
					  this.apiData.slideWinners.order = slide.order;
					  this.apiData.slideWinners.position = slide.position;
				  }
				  else if(slide.slug === this.slideMaxAward){
					  this.apiData.slideMaxAward.active = true;
					  this.apiData.slideMaxAward.duration = slideDuration;
					  this.apiData.slideMaxAward.order = slide.order;
					  this.apiData.slideMaxAward.position = slide.position;
				  }
			  })
		  }
		  catch(error){
			  console.log(error);
		  }
	  },
	  getContent(slide, type){
		  let content = null;
		  if(slide.file){
			  let typeFile = slide.file.split('.');
			  let extension = typeFile[typeFile.length -1];
			  if( ['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(extension) && type == 'image' ){
				  content = slide.file;
			  }
			  else if( ['gif', 'mp4', 'ogg', 'ogv', 'flv', 'mpeg'].includes(extension) && type == 'video' ){
				  content = {
					  mp4: slide.file,
					  gif: slide.file,
					  props: { autoplay: true, loop: true, controls: false, muted: true }
				  }
			  }
		  }
		  return content;
	  },
	  getBannerContent(banner, type){
		  let content = null;
		  if(banner.file){
			  let typeFile = banner.file.split('.');
			  let extension = typeFile[typeFile.length -1];
			  if( ['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(extension) && type == 'image' ){
				  content = banner.file;
			  }
			  else if( ['gif', 'mp4'].includes(extension) && type == 'video' ){
				  content = {
					  mp4: banner.file,
					  gif: banner.file,
					  props: { autoplay: true, loop: true, controls: false, muted: true }
				  }
			  }
		  }
		  return content;
	  },
	  getSlideContent(slide, type){
		  let content = null;
		  if(slide.file){
			  let typeFile = slide.file.split('.');
			  let extension = typeFile[typeFile.length -1];
			  if( ['jpg', 'jpeg', 'png', 'webp', 'svg', 'svg+xml'].includes(extension) && type == 'image' ){
				  content = slide.file;
			  }
			  else if( ['gif', 'mp4'].includes(extension) && type == 'video' ){
				  content = {
					  mp4: slide.file,
					  gif: slide.file,
					  props: { autoplay: true, loop: true, controls: false, muted: true }
				  }
			  }
		  }
		  return content;
	  },
	  initPlayer(){
		  if(this.display.songs.length > 0){
			  let audio = document.querySelector('#player');
			  audio.muted = false
			  let audioSource = document.querySelector('#player source');
  
			  this.pendingSongs = [];
			  let songIndex = this.randomSong();
  
			  if(audio && audioSource){
				  audioSource.src = this.display.songs[songIndex].file;
				  audio.load();
				  audio.play();
	  
				  audio.addEventListener('ended', ()=>{
					  this.currentSongIndex = this.randomSong();
					  audioSource.src = this.display.songs[this.currentSongIndex].file;
					  audio.load();
					  audio.play();
				  });
			  }
		  }
	  },
	  nextSong(){
		  this.currentSongIndex++;
		  this.currentSong = this.display.songs[this.currentSongIndex].file
	  },
	  getManeyFormat(value){
		  return new Intl.NumberFormat('es-PE', {style: 'currency',currency: 'PEN', minimumFractionDigits: 2}).format(value);
	  },
	  getDateFormat(value){
		  moment.locale('es');
		  return moment(value).format('DD MMMM - h a')
	  },
	  showModalAward(){
		  if(!this.evaluateStorage()){
			  // this.showModal = true;
			  this.clickButtonAward();
			  setTimeout(()=>{
				  this.playVideo();
			  }, 200);
		  }
  
	  },
	  evaluateStorage(){
		  let result = false;
		  let storageAwards = localStorage.getItem('awards');
		  if(storageAwards){
			  storageAwards = JSON.parse(storageAwards);
			  storageAwards.forEach(award => {
				  if(award.origin == this.apiData.maxAwardToday.origin && award.index == this.apiData.maxAwardToday.DEPOSIT_INDEX){
					  result = true;
				  }
			  });
  
			  if(!result){
				  storageAwards.push({
					  origin: this.apiData.maxAwardToday.origin,
					  index: this.apiData.maxAwardToday.DEPOSIT_INDEX
				  });
			  }
		  }
		  else{
			  storageAwards = [
				  {
					  origin: this.apiData.maxAwardToday.origin,
					  index: this.apiData.maxAwardToday.DEPOSIT_INDEX
				  }
			  ];
		  }
		  localStorage.setItem('awards', JSON.stringify(storageAwards));
		  return result;
	  },
	  startVideoModal(){
		  setTimeout(()=>{
			  let audio = document.querySelector('#player');
			  audio.pause();
			  if(this.idVideoPlayingRight || this.idVideoPlayingLeft){
				  let video = document.getElementById(this.idVideoPlayingRight?this.idVideoPlayingRight:this.idVideoPlayingLeft);
				  video.muted = true;
			  }
			  this.showModalText = true
		  }, 1000);
	  },
	  endedVideoModal(){
		  setTimeout(()=>{
			  this.clickButtonAward();
			  this.showModalText = false;
			  let video = document.getElementById('videoMaxAward')
			  if(video){
				  video.load();
			  }
  
			  if(this.idVideoPlayingRight || this.idVideoPlayingLeft){
				  let videoSlide = document.getElementById(this.idVideoPlayingRight?this.idVideoPlayingRight:this.idVideoPlayingLeft);
				  videoSlide.muted = false;
			  }
			  else{
				  let audio = document.querySelector('#player');
				  audio.play();
			  }
		  }, 3000);
	  },
	  playVideo(){
		  let video = document.getElementById('videoMaxAward')
		  if(video){
			  video.play();
		  }
	  },
	  playSlideLerry(e, position){
		  if(position == this.display.lottery.position){
			  if(e.currentSlide.title == 'lottery'){
				  // document.getElementById("marqueeLottery").start();
				  this.pauseWinners = false;
			  }
			  else{
				  this.pauseWinners = true;
			  }
		  }
	  },
	  setCurrentSlide(e, position){
		  if(e.currentSlide){
			  let audio = document.querySelector('#player');
			  if(position == 'left'){
				  let video = document.getElementById('left-video-'+e.currentSlide.index);
				  if(video){
					  video.pause();
					  video.currentTime = 0;
					  video.load();
					  video.muted = true;
					  if(this.slidesLeft[e.currentSlide.index].flag_video_sound && !this.idVideoPlayingRight && !this.showModalText){
						  audio.pause();
						  video.muted = false;
						  this.idVideoPlayingLeft = 'left-video-'+e.currentSlide.index;
					  }
					  video.play();
				  }
				  else{
					  if(!this.idVideoPlayingRight && !this.showModalText){
						  audio.play();
					  }
					  this.idVideoPlayingLeft = null;
				  }
				  this.currentSlide.left = e.currentSlide.index;
			  }
			  else{
				  let video = document.getElementById('right-video-'+e.currentSlide.index);
				  if(video){
					  video.pause();
					  video.currentTime = 0;
					  video.load();
					  video.muted = true;
					  if(this.slidesRight[e.currentSlide.index].flag_video_sound && !this.idVideoPlayingLeft && !this.showModalText){
						  audio.pause();
						  video.muted = false;
						  this.idVideoPlayingRight = 'right-video-'+e.currentSlide.index;
					  }
					  video.play();
				  }
				  else{
					  if(!this.idVideoPlayingLeft && !this.showModalText){
						  audio.play();
					  }
					  this.idVideoPlayingRight = null;
				  }
				  this.currentSlide.right = e.currentSlide.index;
			  }
		  }
	  },
	  getDurationSlide(slide){
		  let duration = 3000;
		  if(slide.slug === this.slideLottery){
			  if(this.display.lottery && this.display.lottery.duration){
				  duration = parseInt(this.display.lottery.duration) * 1000;
			  }
		  }
		  else{
			  if(slide.duration){
				  duration = slide.duration*1000;
			  }
		  }
		  return duration;
	  },
	  clickButtonAward(){
		  let button = document.getElementById('button-max-award');
		  if(button){
			  button.click();
		  }
	  },
	  randomSong() {
		  if(this.pendingSongs.length == 0){
			  this.pendingSongs = [];
			  this.playedSongs = [];
			  this.display.songs.forEach(song => {
				  this.pendingSongs.push(song.id);
			  });
		  }
  
		  let songIndex = -1;
		  let indexRandom = this.getRandomNumber(0, (this.pendingSongs.length - 1));
		  let songId = this.pendingSongs[indexRandom];
		  this.pendingSongs.splice(indexRandom, 1);
		  this.playedSongs.push(songId);
		  this.display.songs.forEach((song, index) => {
			  if(song.id == songId){
				  songIndex = index;
			  }
		  });
  
		  return songIndex;
	  },
	  getRandomNumber(min, max){
		  return Math.floor(Math.random() * (max - min + 1) + min)
	  },
	  hasAudio(video) {
		  return video.mozHasAudio ||
		  Boolean(video.webkitAudioDecodedByteCount) ||
		  Boolean(video.audioTracks && video.audioTracks.length);
	  }
	},
	computed: {
	  slidesQuery(){
		  let slidesFilter = [];
		  if(this.display){
			  this.display.slides.forEach(slide =>{
				  if(slide.type == 'QUERY'){
					  slidesFilter.push(slide);
				  }
			  })
		  }
		  return slidesFilter;
	  },
	  slidesLeft(){
		  let slidesFilter = [];
		  if(this.display){
			  this.display.slides.forEach(slide =>{
				  if(slide.position == 'left' || this.display.layout == 'horizontal'){
					  if(slide.slug == this.pozoPromocion){
						  // if(this.getManeyFormat(this.apiData.pozos.pozoPromocion.monto) > 0){
							  slidesFilter.push(slide);
						  // }
					  }
					  else if(slide.slug === this.slideMaxAward){
						  if(this.apiData.maxAwardWeek){
							  slidesFilter.push(slide);
						  }
					  }
					  else if(slide.slug === this.slideCounter){
						  if(this.apiData.counter){
							  slidesFilter.push(slide);
						  }
					  }
					  else if(slide.slug === this.slideLottery){
						  if(this.display.lottery){
							  slidesFilter.push(slide);
						  }
					  }
					  else if(slide.slug === this.slideMaxAwardDay){
						  console.log('');
					  }
					  else{
						  slidesFilter.push(slide);
					  }
				  }
			  })
		  }
		  return slidesFilter;
	  },
	  slidesRight(){
		  let slidesFilter = [];
		  if(this.display){
			  this.display.slides.forEach(slide =>{
				  if(slide.position == 'right'){
					  if(slide.slug == this.pozoPromocion){
						  // if(this.getManeyFormat(this.apiData.pozos.pozoPromocion.monto) > 0){
							  slidesFilter.push(slide);
						  // }
					  }
					  else if(slide.slug === this.slideMaxAward){
						  if(this.apiData.maxAwardWeek){
							  slidesFilter.push(slide);
						  }
					  }
					  else if(slide.slug === this.slideCounter){
						  if(this.apiData.counter){
							  slidesFilter.push(slide);
						  }
					  }
					  else if(slide.slug === this.slideLottery){
						  if(this.display.lottery){
							  slidesFilter.push(slide);
						  }
					  }
					  else if(slide.slug === this.slideMaxAwardDay){
						  console.log('');
					  }
					  else{
						  slidesFilter.push(slide);
					  }
				  }
			  })
		  }
		  return slidesFilter;
	  },
	  filterSlides(){
			  let slidesFilter = [];
			  if(this.display){
				  this.display.slides.forEach(slide =>{
					  if(slide.type !== 'QUERY'){
						  slidesFilter.push(slide);
					  }
				  })
			  }
			  return slidesFilter;
		  },
	  loadDataComplete(){
		let result = false;
		if(this.display && this.apiData !== undefined && this.apiData){
		  result = true;
		}
		return result;
	  }
	}
  }
			 
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
	margin: 40px 0 0;
  }
  ul {
	list-style-type: none;
	padding: 0;
  }
  li {
	display: inline-block;
	margin: 0 10px;
  }
  a {
	color: #42b983;
  }
  </style>
  