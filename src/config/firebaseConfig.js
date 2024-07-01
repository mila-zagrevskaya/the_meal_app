import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDA_nysdGxebsW6JLMK8AHbYG__UhmkADQ',
  authDomain: 'the-meals-9216e.firebaseapp.com',
  databaseURL: 'https://the-meals-9216e.firebaseio.com',
  projectId: 'the-meals-9216e',
  storageBucket: '',
  messagingSenderId: '753798084792',
  appId: '1:753798084792:web:2f116d38c1aef8ccec9c4d',
};

const firebaseConfig = firebase.initializeApp(config);
export default firebaseConfig;
