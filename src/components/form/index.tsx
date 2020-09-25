import React, { Dispatch, SetStateAction } from 'react'

import styles from './index.module.css'

type Props = {
  setStart: Dispatch<SetStateAction<number | undefined>>
  setEnd: Dispatch<SetStateAction<number | undefined>>
  startVideo: () => void
  isLoop: boolean
  setIsLoop: Dispatch<SetStateAction<boolean>>
}

export const StartEndForm: React.FC<Props> = ({
  setStart,
  setEnd,
  startVideo,
  isLoop,
  setIsLoop,
}) => {
  return (
    <form className={styles.form}>
      <label>
        開始：
        <input
          type="text"
          name="start"
          onChange={(e) => setStart(parseInt(e.target.value))}
        />
      </label>
      <label>
        終了：
        <input
          type="text"
          name="end"
          onChange={(e) => setEnd(parseInt(e.target.value))}
        />
      </label>
      <label>
        繰り返し：
        <input type="checkbox" name="loop" onClick={() => setIsLoop(!isLoop)} />
      </label>
      <input type="button" value="Play!" onClick={() => startVideo()} />
    </form>
  )
}
