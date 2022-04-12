/* eslint-disable func-names */
import React, { Component } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import App from './pages/App'
import DeviceDetect from './DeviceDetect'

import reportWebVitals from './reportWebVitals'
import GlobalStyle from './styles/GlobalStyle'

const queryClient = new QueryClient()

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Router>
          <GlobalStyle />
          <DeviceDetect>
            <App />
          </DeviceDetect>
        </Router>
      </CookiesProvider>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById('root'),
)
// serviceWorkerRegistration.register()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
