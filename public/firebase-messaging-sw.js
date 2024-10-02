// Import Firebase Messaging using importScripts (CommonJS-style for Service Workers)
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyAqW11qVRcvL7M5MChqcj7YRhaTLS6QXow",
  authDomain: "guru-notification-system.firebaseapp.com",
  projectId: "guru-notification-system",
  storageBucket: "guru-notification-system.appspot.com",
  messagingSenderId: "147169208528",
  appId: "1:147169208528:web:3481143904b0d890e896d5",
  measurementId: "G-YKQZWZBKVZ"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
});
