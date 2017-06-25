<template>
   <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header" >
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">{{title}}</span>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation" v-if="login">
          <button class="mdl-button mdl-js-button mdl-button--icon" style="margin-left:10px" @click="logout"><i class="material-icons">input</i></button>
        </nav>
        <nav class="mdl-navigation" v-if="!login">
         <button class="mdl-button mdl-js-button mdl-button--icon" @click="loginFacebook">
         <i class="material-icons">pan_tool</i>
         </button>
        </nav>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Menu</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu('Now Playing')"><i class="material-icons">visibility</i> Now Playing</router-link>
        <router-link class="mdl-navigation__link" to="/Upcoming" @click.native="hideMenu('Upcoming')"><i class="material-icons">watch_later</i> Upcoming</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
    <footer class="mdl-mini-footer">
    <div class="mdl-mini-footer__left-section">
      <ul class="mdl-mini-footer__link-list">
        <li><a href="#">Help</a></li>
        <li><a href="#">Privacy & Terms</a></li>
      </ul>
    </div>
  </footer>
  </div>
</template>

<script>
require('material-design-lite')
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyD7Bt-HM46Xhv9BnQmqlYEQwxO9xfZviDw',
  authDomain: 'pwa-hackathon-e8344.firebaseapp.com',
  databaseURL: 'https://pwa-hackathon-e8344.firebaseio.com',
  projectId: 'pwa-hackathon-e8344',
  storageBucket: 'pwa-hackathon-e8344.appspot.com',
  messagingSenderId: '459097720032'
}
firebase.initializeApp(config)
export default {
  name: 'app',
  data () {
    return {
      login: false,
      title: '',
      displayName: '',
      photoURL: '',
      email: ''
    }
  },
  methods: {
    hideMenu: function (Menu) {
      document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
      document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
      this.title = Menu
    },
    loginFacebook: function () {
      var _this = this
      var provider = new firebase.auth.FacebookAuthProvider()
      provider.setCustomParameters({
        'display': 'popup'
      })
      firebase.auth().signInWithPopup(provider).then(function (result) {
        _this.login = true
        var user = result.user
        _this.displayName = user.displayName
      }).catch(function (error) {
        console.log(error.message)
      })
    },
    logout: function () {
      var _this = this
      firebase.auth().signOut().then(function () {
        _this.login = true
        _this.displayName = ''
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted: function () {
    var _this = this
    this.title = 'Home'
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        _this.login = true
        _this.displayName = user.displayName
        _this.email = user.email
        _this.photoURL = user.photoUR
      } else {
        _this.login = false
      }
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.3.0/material.brown-orange.min.css');
  @import url('spin.css');
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #4fc08d;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
}
</style>
