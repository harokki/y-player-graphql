import { Dispatch, SetStateAction } from 'react'

import { PlayListItem, Item } from '@/pages/index'
import styles from './index.module.css'

type Props = {
  playList: PlayListItem
  setVideoId: Dispatch<SetStateAction<string>>
  setStart: Dispatch<SetStateAction<number | undefined>>
  setEnd: Dispatch<SetStateAction<number | undefined>>
  setIsLoop: Dispatch<SetStateAction<boolean>>
}

export const PlayList: React.FC<Props> = ({
  playList,
  setVideoId,
  setStart,
  setEnd,
  setIsLoop,
}) => {
  const getImg = (videoId: string) => {
    const url = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return <img src={url} width={168} />
  }

  const setVideo = (key: string) => {
    setVideoId(key)
    setStart(undefined)
    setEnd(undefined)
    setIsLoop(false)
  }

  return (
    <div className={styles.img}>
      <span>プレイリスト</span>
      {Object.entries(playList).map(([key, value], i) => (
        <div key={i} className={styles.box} onClick={() => setVideo(key)}>
          <div className={styles.boxImg}>{getImg(key)}</div>
          <div className={styles.boxText}>
            <span>test</span>
          </div>
        </div>
      ))}
    </div>
  )
}
