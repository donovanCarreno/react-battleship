import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Message = ({ children }) => (
  <div className={styles.messageArea}>
    {children}
  </div>
)

Message.propTypes = {
  children: PropTypes.any
}

export default Message