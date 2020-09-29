import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { YoutubeSetting } from '@/pages/index'
import styles from './index.module.css'

type Props = {
  startVideo: () => void
  addPlayList: (
    start: number | undefined,
    end: number | undefined,
    title: string | undefined,
    isLoop: boolean,
  ) => void
  getNowTime: () => Promise<number | undefined>
  setYoutubeSetting: Dispatch<SetStateAction<YoutubeSetting>>
}

export const MainForm: React.FC<Props> = ({
  startVideo,
  addPlayList,
  getNowTime,
  setYoutubeSetting,
}) => {
  const [start, setStart] = useState<number | undefined>(undefined)
  const [end, setEnd] = useState<number | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [isLoop, setIsLoop] = useState<boolean>(false)

  useEffect(() => {
    setYoutubeSetting({
      onEndSetting: { start, end, isLoop },
      playerVars: { start, end },
    })
  }, [start, end, isLoop, setYoutubeSetting])

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
        <input type="button" value="Play!" onClick={() => startVideo()} />
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
