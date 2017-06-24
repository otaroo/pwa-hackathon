<template>
    <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>   
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <div v-for="movie in this.movies" class="demo-card-wide mdl-card mdl-shadow--2dp card-modify" @click="moviedatail(movie)">
            <div class="mdl-card__title"
             :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w533_and_h300_bestv2' + movie.backdrop_path + ')' }">
                <h2 class="mdl-card__title-text">{{movie.title}}</h2>
            </div>
            <div class="mdl-card__supporting-text">
             <div class="moive-detail">
             <i class="material-icons" style="flex: 1;">event</i> 
             <p style="flex: 3;text-align: left;">{{movie.release_date}}</p>  
             <i class="material-icons" style="flex: 1;">grade</i> 
             <p style="flex: 3;text-align: left">{{movie.vote_average}} </p>
             </div>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                @click="">
                Detail
                </a>
            </div>
            <div class="mdl-card__menu">
                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i class="material-icons">share</i>
                </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      movies: []
    }
  },
  methods: {
    moviedatail (movie) {
      console.log(movie)
    }
  },
  mounted () {
    this.$http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=8344543a9de667411287240ee824de04&language=en-US&page=1')
    .then(res => {
      var obj = JSON.parse(res.bodyText)
      this.movies = obj.results
    })
  }
}
</script>
<style scoped>
  .card-modify {
    position: relative;
    margin-bottom: 8px;
  }
  .demo-card-wide > .mdl-card__title {
    color: #fff;
    height: 176px;
    background-position: center;
    background-size:cover;
    background-repeat:no-repeat;
  }
  .demo-card-wide.mdl-card {
    width: 100%;
  }
  .demo-card-wide > .mdl-card__menu {
    color: #fff;
  }
  .moive-detail {
    display: -webkit-flex; /* Safari */
    -webkit-align-items: center; /* Safari 7.0+ */
    display: flex;
    align-items: flex-start;
  }
</style>
