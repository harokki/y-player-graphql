import { Dispatch, SetStateAction } from 'react'

import { PlayListItem } from '@/pages/index'
import styles from './index.module.css'

type Props = {
  playList: PlayListItem
  setVideoId: Dispatch<SetStateAction<string>>
}

export const PlayList: React.FC<Props> = ({ playList, setVideoId }) => {
  const getImg = (videoId: string) => {
    const url = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return <img src={url} width={168} />
  }

  const setVideo = (key: string) => {
    setVideoId(key)
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
