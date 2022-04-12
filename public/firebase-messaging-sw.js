/* eslint-disable vars-on-top */
/* eslint-disable no-var */

// 포그라운드 메시지 수신

// firebase.initializeApp({ messagingSenderId: 702007017171 })

// 버전 업데이트
const VERSION = 'V22'
const CACHE_NAME = `paper-cache_${VERSION}`
const TEXT_CACHE_NAME = `paper-text_${VERSION}`

// 정적 캐시
const IMMUTABLE_APPSHELL = [
  '/src/assets/icons/arrow/backarr.svg',
  '/src/assets/icons/arrow/rightarr.svg',
  '/src/assets/icons/arrow/right_arrow.svg',
  '/src/assets/icons/arrow/arrow_s.svg',
  '/src/assets/icons/arrow/arrowleftgray.svg',
  '/src/assets/bigbg.png',
  '/src/assets/iphone.png',
]

// 동적 캐시
const MUTABLE_APPSHELL = []

// 정적 캐시와 동적캐시 하나의 배열로 묶기
const CACHE_LIST = IMMUTABLE_APPSHELL.concat(MUTABLE_APPSHELL)

// 특정 형식 파일 정의(폰트, 사진)
const DYNAMIC_PATTERN = /(\.woff$|\.svg$|\.png$)/

// 서비스워커 설치 (처음 1회만 실행)
self.addEventListener('install', (event) => {
  // 캐시 불러오기
  event.waitUntil(
    caches.open('MY_CACHE').then((cache) => {
      return cache.addAll(CACHE_LIST)
    }),
  )
})

self.addEventListener('activate', (event) => {
  // 정의되지 않은 캐시를 삭제해 성능 향상
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key, idx) => {
          if (key !== CACHE_NAME && key !== TEXT_CACHE_NAME) {
            return caches.delete(key)
          }
          return keyList[idx]
        }),
      )
    }),
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // 정적자원 url 포함될시 캐시 후 네트워크
  if (IMMUTABLE_APPSHELL.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      }),
    )
    // 동적자원 url포함시 네트워크 후 캐시
  } else if (MUTABLE_APPSHELL.includes(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((networkResponse) => {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
          .catch(() => {
            return cache.match(event.request)
          })
      }),
    )
    // 업로드 또는 정적자원 업데이트 시 캐시 분류
  } else if (
    url.pathname.startsWith('/upload') ||
    DYNAMIC_PATTERN.test(url.pathname)
  ) {
    const TARGET_CACHE = url.pathname.startsWith('/upload')
      ? TEXT_CACHE_NAME
      : CACHE_NAME
    event.respondWith(
      caches.open(TARGET_CACHE).then((cache) => {
        return cache.match(event.request).then((cacheResponse) => {
          if (cacheResponse) {
            return cacheResponse
          }
          return fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
        })
      }),
    )
  }
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Any other custom service worker logic can go here.
self.addEventListener('push', (event) => {
  const { title } = event.data.json().notification

  const options = {
    body: event.data.json().notification.body,
    icon: 'favicon.ico',
  }

  event.waitUntil(self.registration.showNotification(title, options)) // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.openWindow('https://zzzapp.co.kr'), // 예시로 일단 로컬호스트로 링크 누르면 가지는걸로 해놨다.
  )
})

// Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
// importScripts(
//   'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
// )
