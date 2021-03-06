import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Controls = ({ guess, handleInput, handleSubmit }) => (
  <form className={styles.form}>
    <input
      className={styles.formInput}
      type='text'
      placeholder='A0'
      onChange={handleInput}
      value={guess}
    />
    <button
      className={styles.formInput}
      onClick={handleSubmit}
    >
      Fire
    </button>
  </form>
)

Controls.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Controls
