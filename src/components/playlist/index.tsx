import styles from './index.module.css'

type Props = {
  playList: { videoId: string; title: string; meta: string }[]
}

export const PlayList: React.FC<Props> = ({ playList }) => {
  const getImg = (videoId: string) => {
    const url = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    return <img src={url} width={168} />
  }

  return (
    <div className={styles.img}>
      {playList.map((item) => (
        <div className={styles.box} onClick={() => console.log(item.title)}>
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
