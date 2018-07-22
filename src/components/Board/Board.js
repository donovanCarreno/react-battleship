import React, {Component} from 'react'

import styles from './styles.css'

export default class Board extends Component {
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
    const squares = []
    let col = 0

    while (col < 7) {
      squares.push(
      <td
        key={`${row}${col}`}
        id={`${row}${col}`}
        className={styles.tableDetail}
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