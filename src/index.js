import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'

import ScrollToTop from './scrolltotop'
import App from './app'
import mainStore from './store'

import 'bootstrap/dist/css/bootstrap.css'
import './app.scss'
import 'react-select/dist/react-select.css'


const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()

const stores = {
  // Key can be whatever you want
  router: routerStore,
  main: mainStore
  // ...other stores
}

const history = syncHistoryWithStore(browserHistory, routerStore)

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root')
)
