import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Message from '../Message'
import Board from '../Board'
import Controls from '../Controls'

import styles from './styles.css'

import { generateShipLocations, parseGuess } from '../../utils/helpers'

class App extends Component {
  state = {
    guess: '',
    hits: [],
    misses: [],
    message: '',
    numGuesses: 0,
    ships: [
      {
        locations: [],
        hits: ['', '', '']
      },
      {
        locations: [],
        hits: ['', '', '']
      },
      {
        locations: [],
        hits: ['', '', '']
      }
    ]
  }

  componentDidMount() {
    const ships = generateShipLocations(this.state.ships)
    this.setState({ ships })
  }

  handleInput = (e) => {
    this.setState({ guess: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { guess, numGuesses } = this.state
    const location = parseGuess(guess)

    if (location) {

    }
  }

  fire = (location) => {

  }

  render() {
    return (
      <div className={styles.board}>
        <Message>{this.state.message}</Message>
        <Board />
        <Controls
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default hot(module)(App);
