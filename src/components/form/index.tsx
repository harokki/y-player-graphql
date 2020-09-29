import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { PlayerVars } from '@/pages/index'
import styles from './index.module.css'

type Props = {
  startVideo: (
    start: number | undefined,
    end: number | undefined,
    isLoop: boolean,
  ) => void
  addPlayList: (
    start: number | undefined,
    end: number | undefined,
    title: string | undefined,
    isLoop: boolean,
  ) => void
  getNowTime: () => Promise<number | undefined>
  setPlayerVars: Dispatch<SetStateAction<PlayerVars>>
}

export const StartEndForm: React.FC<Props> = ({
  startVideo,
  addPlayList,
  getNowTime,
  setPlayerVars,
}) => {
  const [start, setStart] = useState<number | undefined>(undefined)
  const [end, setEnd] = useState<number | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [isLoop, setIsLoop] = useState<boolean>(false)

  useEffect(() => {
    setPlayerVars({ start, end })
  }, [start, end, setPlayerVars])

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
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>開始</span>
        <input
          type="text"
          name="start"
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
        <input type="checkbox" name="loop" onClick={() => setIsLoop(!isLoop)} />
      </label>
      <label>
        <input
          type="button"
          value="Play!"
          onClick={() => startVideo(start, end, isLoop)}
        />
      </label>
      <label>
        <input
          type="button"
          value="Save!"
          onClick={() => addPlayList(start, end, title, isLoop)}
        />
      </label>
    </form>
  )
}
