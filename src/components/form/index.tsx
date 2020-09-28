import React, { Dispatch, SetStateAction } from 'react'

import styles from './index.module.css'

type Props = {
  start: number | undefined
  setStart: Dispatch<SetStateAction<number | undefined>>
  end: number | undefined
  setEnd: Dispatch<SetStateAction<number | undefined>>
  startVideo: () => void
  isLoop: boolean
  setIsLoop: Dispatch<SetStateAction<boolean>>
  addPlayList: () => void
  getNowTime: () => Promise<number | undefined>
}

export const StartEndForm: React.FC<Props> = ({
  start,
  setStart,
  end,
  setEnd,
  startVideo,
  isLoop,
  setIsLoop,
  addPlayList,
  getNowTime,
}) => {
  const setNowTime = async (type: string) => {
    const nowTime = await getNowTime()
    if (type === 'start') {
      setStart(nowTime)
    } else {
      setEnd(nowTime)
    }
  }

  return (
    <form className={styles.form}>
      <label>
        <span>説明</span>
        <input
          type="text"
          name="description"
          onChange={(e) => setStart(parseInt(e.target.value))}
        />
      </label>
      <label>
        <span>開始</span>
        <input
          type="text"
          name="start"
          value={start}
          onChange={(e) => setStart(parseInt(e.target.value))}
        />
        <input
          type="button"
          value="現在時間取得"
          onClick={() => setNowTime('start')}
        />
      </label>
      <label>
        <span>終了</span>
        <input
          type="text"
          name="end"
          value={end}
          onChange={(e) => setEnd(parseInt(e.target.value))}
        />
        <input
          type="button"
          value="現在時間取得"
          onClick={() => setNowTime('end')}
        />
      </label>
      <label>
        <span>繰り返し</span>
        <input
          type="checkbox"
          name="loop"
          checked={isLoop}
          onClick={() => setIsLoop(!isLoop)}
        />
      </label>
      <label>
        <input type="button" value="Play!" onClick={() => startVideo()} />
      </label>
      <label>
        <input type="button" value="Save!" onClick={() => addPlayList()} />
      </label>
    </form>
  )
}
