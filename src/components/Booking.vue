<template>
 <div>
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet" v-if="this.load_book">
      <div class="mdl-card__title"
             :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w533_and_h300_bestv2' + this.movies.backdrop_path + ')' }">
            <h2 class="mdl-card__title-text" style="color:#fff">{{this.movies.title}}</h2>
      </div>
    </div>
    <div class="mdl-grid" v-if="this.load_book">
        <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-phone" v-for="(s,i) in 12">
            <button :class="setClasee('A'+(i+1))" style="width:100%" :disabled="disabled('A'+(i+1))" @click="selectSeat('A'+(i+1))">
           <i class="material-icons" v-if="!mySeat('A'+(i+1))">event_seat</i><i class="material-icons" v-if="mySeat('A'+(i+1))">done</i> A{{i+1}}
            </button>
        </div>
    </div>
    <div class="mdl-grid" v-if="this.load_book">
        <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-phone" >
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" style="width:100%" :disabled="disabledBook()" @click="dialogShow()">
            Book 
            </button>
        </div>
        <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-phone" >
            <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="width:100%" @click="back()" >
            Back
            </button>
        </div>
    </div>
    <dialog class="mdl-dialog">
        <h4 class="mdl-dialog__title">Are you sure?</h4>
        <div class="mdl-dialog__content">
        <p style="font-size:20px">
          {{this.movies.title}} <span style="color:red">{{this.seatSelect.length}} Seat </span>
        </p>
        </div>
        <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button" @click="seatBook()">Confirm</button>
        <button type="button" class="mdl-button close" @click="dialogClose()">Close</button>
        </div>
    </dialog>
    <div class="spinner" v-if="!this.load_book">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
    <div id="demo-toast-example" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
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
      seatSelect: [],
      booking: [],
      movies: [],
      load_book: false
    }
  },
  methods: {
    selectSeat (id) {
      var _this = this
      var user = firebase.auth().currentUser
      if (user) {
        const ids = _this.seatSelect.map(s => s.seat)
        const idx = ids.indexOf(id)
        if (idx === -1) {
          _this.seatSelect.push({
            seat: id,
            user: user.uid,
            movie: _this.movies.title,
            img: _this.movies.backdrop_path,
            date: _this.movies.release_date,
            movieId: _this.movies.id
          })
        } else {
          _this.seatSelect.splice(idx, 1)
        }
      } else {
      }
    },
    disabled (id) {
      const ids = this.booking.map(s => s.seat)
      const idx = ids.indexOf(id)
      if (idx === -1) {
        return false
      } else {
        return true
      }
    },
    disabledBook () {
      const count = this.seatSelect.map(s => s.seat)
      if (count.length > 0) {
        return false
      } else {
        return true
      }
    },
    mySeat (id) {
      var user = firebase.auth().currentUser
      const userBook = this.booking.map(s => s.user)
      const userSeat = this.booking.map(s => s.seat)
      const uid = userBook.indexOf(user.uid)
      const useat = userSeat.indexOf(id)
      if (uid !== -1 && useat !== -1) {
        return true
      } else {
        return false
      }
    },
    setClasee (id) {
      const ids = this.seatSelect.map(s => s.seat)
      const idx = ids.indexOf(id)
      return [
        'mdl-button',
        'mdl-js-button',
        'mdl-button--raised',
        {
          'mdl-button--accent': idx !== -1
        }
      ]
    },
    dialogShow () {
      var dialog = document.querySelector('dialog')
      dialog.showModal()
    },
    dialogClose () {
      var dialog = document.querySelector('dialog')
      dialog.close()
    },
    seatBook () {
      var dialog = document.querySelector('dialog')
      var _this = this
      const movieRef = db.ref('/').child(this.$route.params.id)
      _this.seatSelect.forEach((seat) => {
        movieRef.push(seat)
      })
      dialog.close()
      _this.seatSelect = []
    },
    back () {
      this.$router.push({name: this.$route.params.back})
    }
  },
  mounted () {
    var _this = this
    this.$http.get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + '?api_key=8344543a9de667411287240ee824de04&language=en-US')
    .then(res => {
      var obj = JSON.parse(res.bodyText)
      _this.movies = obj
      _this.load_book = true
    })
    const movieRef = db.ref('/').child(this.$route.params.id)
    movieRef.on('value', snapshot => {
      const seats = snapshot.val()
      _.forOwn(seats, s => {
        _this.booking.push(s)
      })
      _this.load_book = true
    })
  }
}
</script>
<style scoped>
</style>
