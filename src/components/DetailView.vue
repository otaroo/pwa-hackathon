<template>
  <div class="mdl-grid" >
    <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet" v-if="load">
      <div class="mdl-card__title"
             :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w533_and_h300_bestv2' + this.movies.backdrop_path + ')' }">
            <h2 class="mdl-card__title-text">{{this.movies.title}}</h2>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet" v-if="load">
      <div class="moive-detail">
          <i class="material-icons" >event</i><span>{{ this.movies.release_date }}</span>
          <i class="material-icons">grade</i><span>{{ this.movies.vote_average }}</span>
          <i class="material-icons">watch_later</i>{{ this.movies.runtime }}</span>
        </div>
        <div class="comment">
          <cite>{{ this.movies.tagline }}</cite>
        </div>
        <div class="comment">
          <span>{{ this.movies.overview }}</span>
        </div>
        <div class="comment">
          <span class="mdl-chip" v-for="g in this.movies.genres" style="margin-right:5px">
              <span class="mdl-chip__text" >{{ g.name }}</span> 
          </span>
        </div>
      </div>
      <div class="spinner" v-if="!load">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movies: [],
      load: false
    }
  },
  mounted () {
    this.$http.get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + '?api_key=8344543a9de667411287240ee824de04&language=en-US')
    .then(res => {
      var _this = this
      var obj = JSON.parse(res.bodyText)
      _this.movies = obj
      _this.load = true
      console.log(obj)
    })
  }
}
</script>
<style scoped>

  .comment {
    padding: 10px;
    color: #555;
  }
  .actions {
    text-align: center;
  }
  .mdl-card__title{
    color: #fff;
    height: 250px;
    background-position: center;
    background-size:cover;
    background-repeat:no-repeat;
  }
  .moive-detail {
    padding: 10px;
    display: -webkit-flex; /* Safari */
    -webkit-align-items: center; /* Safari 7.0+ */
    display: flex;
    align-items: flex-start;
  }
  .moive-detail i {
    flex: 1;
  }
   .moive-detail span{
     flex: 1;
     text-align: left;
   }
  .spinner {
    width: 40px;
    height: 40px;

    position: relative;
    margin: 100px auto;
  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>

