import React, { useState, Dispatch, SetStateAction, useCallback } from 'react'

import { YoutubeSetting } from '@/pages/index'
import { usePostSettingMutation } from '@/generated/graphql'

import styles from './index.module.css'

type Props = {
  refetch: () => void
  playlistId: string
  startVideo: () => void
  getNowTime: () => Promise<number | undefined>
  setYoutubeSetting: Dispatch<SetStateAction<YoutubeSetting>>
}

export const MainForm: React.FC<Props> = ({
  refetch,
  playlistId,
  startVideo,
  getNowTime,
  setYoutubeSetting,
}) => {
  const [start, setStart] = useState<number | undefined>(undefined)
  const [end, setEnd] = useState<number | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [loop, setLoop] = useState<boolean>(false)
  const [postDisabled, setPostDisabled] = useState<boolean>(false)
  const [postSetting] = usePostSettingMutation()

  const handlePost = useCallback(
    async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault()
      if (postDisabled) {
        return
      }

      setPostDisabled(true)
      const { data } = await postSetting({
        variables: {
          playlistId,
          description: title,
          start,
          end,
          loop,
        },
      })
      if (data && data.insert_setting_one) {
        refetch()
        setPostDisabled(false)
      } else {
        console.log('POST unknown state', data)
      }
    },
    [start, end, loop, title, postSetting, playlistId, postDisabled, refetch],
  )

  const playVideo = async () => {
    await setYoutubeSetting({
      onEndSetting: { start, end, isLoop: loop },
      playerVars: { start, end },
    })
    startVideo()
  }

  const setNowTime = async (type: string) => {
    const nowTime = await getNowTime()
    if (type === 'start') {
      setStart(nowTime ? Math.floor(nowTime) : 0)
    } else {
      setEnd(nowTime ? Math.floor(nowTime) : 0)
    }
  }

  return (
    <form className={styles.form} onSubmit={handlePost}>
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
        <input type="text" name="start" defaultValue={start} disabled={true} />
        <input
          type="button"
          value="現在時間取得"
          onClick={() => setNowTime('start')}
        />
      </label>
      <label>
        <span>終了</span>
        <input type="text" name="end" disabled={true} defaultValue={end} />
        <input
          type="button"
          value="現在時間取得"
          onClick={() => setNowTime('end')}
        />
      </label>
      <label>
        <span>繰り返し</span>
        <input type="checkbox" name="loop" onClick={() => setLoop(!loop)} />
      </label>
      <label>
        <input type="button" value="Play!" onClick={() => playVideo()} />
      </label>
      <label>
        <button type="submit">Save!</button>
      </label>
    </form>
  )
}
