import { Dispatch, SetStateAction } from 'react'
import styles from './index.module.css'

type PlayListItem = {
  videoId: string
  title: string
  meta: string
  start: number
  end: number
  loop: boolean
}

type Props = {
  playList: PlayListItem[]
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

  const startVideo = (item: PlayListItem) => {
    setVideoId(item.videoId)
    setStart(item.start)
    setEnd(item.end)
    setIsLoop(item.loop)
  }

  return (
    <div className={styles.img}>
      {playList.map((item, i) => (
        <div key={i} className={styles.box} onClick={() => startVideo(item)}>
          <div className={styles.boxImg}>{getImg(item.videoId)}</div>
          <div className={styles.boxText}>
            <span>{item.title}</span>
            <span>{item.meta}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
