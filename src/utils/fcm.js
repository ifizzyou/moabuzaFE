import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import firebase from 'firebase/compat/app'
import { useEffect } from 'react'
import { setItem } from './sessionStorage'

// importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js')

// importScripts(
//   'https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js',
// )

const config = {
  apiKey: 'AIzaSyCGo8nqq7bA-zv87IqQNOS1y9xUJ2t4m1I',
  authDomain: 'moabuza.firebaseapp.com',
  projectId: 'moabuza',
  storageBucket: 'moabuza.appspot.com',
  messagingSenderId: '702007017171',
  appId: '1:702007017171:web:3584da8cde95f03eedde26',
  measurementId: 'G-3PZP7TQ54Y',
}

firebase.initializeApp(config)

const messaging = getMessaging()

export const fcmToken = getToken(messaging, {
  vapidKey: process.env.REACT_APP_VAPID_KEY,
})
  .then((currentToken) => {
    if (currentToken) {
      setItem('fcmToken', currentToken)
    }
    return currentToken
  })
  .catch((err) => {
    // console.log('An error occurred while retrieving token.', err)
  })

// Notification.requestPermission().then((permission) => {
//   if (permission === 'granted') {
//     console.log('Notification permission granted.')
//   } else {
//     console.log('Unable to get permission to notify.')
//   }
// })

// 포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  // ...
})
