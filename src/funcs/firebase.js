// // firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAqW11qVRcvL7M5MChqcj7YRhaTLS6QXow",
    authDomain: "guru-notification-system.firebaseapp.com",
    projectId: "guru-notification-system",
    storageBucket: "guru-notification-system.appspot.com",
    messagingSenderId: "147169208528",
    appId: "1:147169208528:web:3481143904b0d890e896d5",
    measurementId: "G-YKQZWZBKVZ"
}

const vapidKey = "BGJHzNEaXADFb_yANpDDO3D-XtgznpdHc-TcJ8RqPuGXAkGZwtvNsuHgudxIqXMWj1Dw__umsxFsUkvYjU1nZMY"

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestForToken = async () => {
    const token = await getToken(messaging, {vapidKey})
    return token;
}

const requestForPermission = async () => {
  let permission = await Notification.requestPermission();
  if (permission === 'granted') {
    return true;
  }
  if (permission === 'denied') {
    alert("Please Allow notification.");
    permission = await Notification.requestPermission();
  }
}

export const askForPermission = async () => {
    try {
      const permission = await requestForPermission();
      if (permission) {
        const token = await requestForToken();
        return token;
      }
    }
    catch (error) {
      console.error(error);
    }
}