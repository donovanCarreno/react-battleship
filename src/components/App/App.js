import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Message from '../Message'
import Board from '../Board'
import Controls from '../Controls'

import styles from './styles.css'

import { generateShipLocations, parseGuess } from '../../utils/helpers'

class App extends Component {
  defaultState = {
    guess: '',
    hits: [],
    misses: [],
    message: '',
    numGuesses: 0,
    shipsSunk: 0,
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

  state = { ...this.defaultState }

  componentDidMount() {
    const ships = generateShipLocations(this.defaultState.ships)
    this.setState({ ships })
  }

  reset = () => {
    const ships = generateShipLocations(this.defaultState.ships)
    this.setState({
      ...this.defaultState,
      ships
    })
  }

  handleInput = e => {
    this.setState({ guess: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { guess, numGuesses, shipsSunk, ships, hits, misses } = this.state

    if (shipsSunk === ships.length) {
      const playAgain = confirm('Game Over. Play Again?')

      if (playAgain) {
        this.reset()
      }

      return
    }

    const location = parseGuess(guess)
    let numShipsSunk = shipsSunk
    let updatedHits = [ ...hits ]
    let updatedMisses = [ ...misses ]
    let message = ''

    if (location) {
      const results = this.fire(location)

      if (results.hit) {
        numShipsSunk = results.isSunk ? numShipsSunk + 1 : numShipsSunk
        updatedHits = updatedHits.concat(location)
        message = results.isSunk ? 'You sank my battleship!' : 'HIT!'
        message = numShipsSunk === ships.length
          ? `You sank all my battleships in ${numGuesses + 1} guesses`
          : message
      } else {
        updatedMisses = updatedMisses.concat(location)
        message = 'You missed'
      }

      return this.setState({
        message,
        hits: updatedHits,
        misses: updatedMisses,
        ships: results.updatedShips,
        shipsSunk: numShipsSunk,
        numGuesses: numGuesses + 1,
        guess: ''
      })
    }

    this.setState({ numGuesses: numGuesses + 1, guess: '' })
  }

  fire = location => {
    const { ships, hits, misses } = this.state
    let hit = false
    let isSunk = false

    const updatedShips = ships.map(ship => {
      const index = ship.locations.indexOf(location)

      if (index >= 0) {
        const hits = [ ...ship.hits ]
        hits[index] = 'hit'
        isSunk = this.isSunk(hits)
        hit = true
        return { ...ship, hits }
      }

      return ship
    })

    return { hit, updatedShips, isSunk }
  }

  isSunk = hits => {    
    return hits.every(hit => hit === 'hit')
  }

  render() {
    const { guess, hits, misses, message } = this.state

    return (
      <div className={styles.board}>
        <Message>{message}</Message>
        <Board
          hits={hits}
          misses={misses}
        />
        <Controls
          guess={guess}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default hot(module)(App);
