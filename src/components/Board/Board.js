import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class Board extends Component {
  static propTypes = {
    hits: PropTypes.array,
    misses: PropTypes.array
  }
  
  renderRows = () => {
    const rows = []
    let row = 0

    while (row < 7) {
      const squares = this.renderSquares(row)
      rows.push(<tr key={row}>{squares}</tr>)
      row++
    }

    return rows
  }

  renderSquares = (row) => {
    const { hits, misses } = this.props
    const squares = []
    let col = 0

    while (col < 7) {
      const rowCol = `${row}${col}`
      let hitMissStyle = ''
      
      if (hits.indexOf(rowCol) >= 0) {
        hitMissStyle = styles.hit
      } else if (misses.indexOf(rowCol) >= 0) {
        hitMissStyle = styles.miss
      }

      squares.push(
      <td
        key={rowCol}
        className={`${styles.tableDetail} ${hitMissStyle}`}
      >
      </td>
    )
      col++
    }

    return squares
  }

  render() {
    return (
      <table className={styles.table}>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }
}
