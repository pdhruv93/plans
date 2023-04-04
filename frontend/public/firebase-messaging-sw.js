/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyD9SSJJIr1Kcm96FxRAeHOORgcKOQhGEyQ',
  authDomain: 'plans-1.firebaseapp.com',
  projectId: 'plans-1',
  storageBucket: 'plans-1.appspot.com',
  messagingSenderId: '759230950123',
  appId: '1:759230950123:web:02c5865e5d9de7537f6cae',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
