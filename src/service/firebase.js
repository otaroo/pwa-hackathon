import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBYGF--Qufsgt5VtIkf4uULw-SZui0qEuo',
  authDomain: 'deploy-manager.firebaseapp.com',
  databaseURL: 'https://deploy-manager.firebaseio.com',
  projectId: 'deploy-manager',
  storageBucket: 'deploy-manager.appspot.com',
  messagingSenderId: '806589399130'
}
firebase.initializeApp(config)

export default {
  database: firebase.database()
}
