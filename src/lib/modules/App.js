import React, { Component } from 'react'
import styles from './styles/app.css'

import Header from './Header'
import Logo from './Logo'

export default class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <div className={styles.app}>
      <Header />
      <Logo />
    </div>
  }
}