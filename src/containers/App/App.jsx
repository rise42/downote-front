import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Login from '../Login/Login'
import NotificationContainer from '../NotificationContainer/NotificationContainer'

import './App.scss'

class App extends Component {
  render () {
    return (
      <>
        <Route path='/end' component={() => (<h3>Nope</h3>)} />
        <Route path='/' exact component={Login} />

        <NotificationContainer />
      </>
    )
  }
}

export default App
