<template>
<div>
  <div class="mdl-grid" v-if="this.load_book">
        <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-phone" v-for="b in dataBooked">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title"
                :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w533_and_h300_bestv2' + b.img + ')' }">
                    <h2 class="mdl-card__title-text">{{b.movie}} </h2>
                </div>
                <div class="mdl-card__supporting-text">
                
                <div class="moive-detail">
          <i class="material-icons">event_seat</i><span>{{b.seat.length}} Seat</span> 
          <i class="material-icons" >event</i><span>{{b.date}}</span> 
        </div>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                     <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="width:100%" @click="gotoBook(b.movieId)" >
                    View
                    </button>
                </div>
            </div>
        </div>
   </div>
   <div class="spinner" v-if="!this.load_book">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
</div>
</template>
<script>
import firebase from 'firebase'
import _ from 'lodash'
const db = firebase.database()
export default {
  data () {
    return {
      dataBooked: [],
      myBooked: [],
      movieBook: [],
      load_book: false
    }
  },
  methods: {
    gotoBook (id) {
      this.$router.push({name: 'Booking', params: {id: id, back: 'Booked'}})
    }
  },
  mounted () {
    var _this = this
    const bookRef = db.ref('/')
    bookRef.on('value', snapshot => {
      var user = firebase.auth().currentUser
      var uid
      if (user) {
        uid = user.uid
      }
      _.forOwn(snapshot.val(), s => {
        _.forOwn(s, m => {
          if (m.user === uid) {
            _this.myBooked.push({
              movie: m.movie,
              seat: m.seat,
              date: m.date,
              img: m.img,
              movieId: m.movieId
            })
          }
        })
        _this.dataBooked.push({
          movie: _this.myBooked[0].movie,
          seat: _this.myBooked.map(s => s.seat),
          date: _this.myBooked[0].date,
          img: _this.myBooked[0].img,
          movieId: _this.myBooked[0].movieId
        })
        _this.myBooked = []
      })
      _this.load_book = true
    })
  }
}
</script>
<style scoped>
.demo-card-wide.mdl-card {
  width: 100%;
}
.demo-card-wide > .mdl-card__title {
  color: #fff;
  height: 100px;
}
.moive-detail {
    padding: 10px;
    display: -webkit-flex; /* Safari */
    -webkit-align-items: center; /* Safari 7.0+ */
    display: flex;
    align-items: center;
  }
  .moive-detail i {
    flex: 1;
  }
   .moive-detail span{
     flex: 1;
     text-align: left;
   }
</style>
