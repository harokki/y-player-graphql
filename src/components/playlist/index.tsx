import styles from './index.module.css'

export const PlayList: React.FC = () => {
  return (
    <div className={styles.img}>
      <div>
        <img
          src="https://img.youtube.com/vi/TruaIGcjaEI/mqdefault.jpg"
          width={168}
        />
        <div className={styles.metaData}>
          <span>タイトル</span>
          <span>メタデータ</span>
        </div>
      </div>
      <div>
        <img
          src="https://img.youtube.com/vi/TruaIGcjaEI/mqdefault.jpg"
          width={168}
        />
        <div className={styles.metaData}>
          <span>タイトル</span>
          <span>メタデータ</span>
        </div>
      </div>
      <div>
        <img
          src="https://img.youtube.com/vi/TruaIGcjaEI/mqdefault.jpg"
          width={168}
        />
        <div className={styles.metaData}>
          <span>タイトル</span>
          <span>メタデータ</span>
        </div>
      </div>
    </div>
  )
}
