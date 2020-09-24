import React from 'react'

import styles from './index.module.css'

export const StartEndForm: React.FC = () => {
  return (
    <form className={styles.form}>
      <label>
        開始：
        <input type="text" name="start" />
      </label>
      <label>
        終了：
        <input type="text" name="end" />
      </label>
      <input type="submit" value="Play!" />
    </form>
  )
}
