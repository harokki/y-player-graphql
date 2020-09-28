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

  const startVideo = (key: string, value: Item[]) => {
    setVideoId(key)
    setStart(value[0].start)
    setEnd(value[0].end)
    setIsLoop(value[0].loop)
  }

  console.log(playList)

  return (
    <div className={styles.img}>
      <span>プレイリスト</span>
      {Object.entries(playList).map(([key, value], i) => (
        <div
          key={i}
          className={styles.box}
          onClick={() => startVideo(key, value)}
        >
          <div className={styles.boxImg}>{getImg(key)}</div>
          <div className={styles.boxText}>
            <span>test</span>
          </div>
        </div>
      ))}
    </div>
  )
}
