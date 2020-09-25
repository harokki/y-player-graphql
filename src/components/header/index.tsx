import React, { Dispatch, SetStateAction } from 'react'

import styles from './index.module.css'

type Props = {
  setVideoId: Dispatch<SetStateAction<string>>
}

export const YplayerHeader: React.FC<Props> = ({ setVideoId }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>Y-player</div>
      <div className={styles.center}>
        <input
          className={styles.searchInput}
          type="text"
          onChange={(e) => setVideoId(e.target.value)}
        />
      </div>
    </header>
  )
}
