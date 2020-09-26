import styles from './index.module.css'

export const PlayList: React.FC = () => {
  return (
    <div className={styles.img}>
      <div>
        <div className={styles.boxImg}>
          <img
            src="https://img.youtube.com/vi/TruaIGcjaEI/mqdefault.jpg"
            width={168}
          />
        </div>
        <div className={styles.boxText}>
          <span>タイトル</span>
          <span>メタデータ</span>
        </div>
      </div>
      <div>
        <div className={styles.boxImg}>
          <img
            src="https://img.youtube.com/vi/TruaIGcjaEI/mqdefault.jpg"
            width={168}
          />
        </div>
        <div className={styles.boxText}>
          <span>タイトル</span>
          <span>メタデータ</span>
        </div>
      </div>
      <div>
        <div className={styles.boxImg}>
          <img
            src="https://img.youtube.com/vi/TruaIGcjaEI/mqdefault.jpg"
            width={168}
          />
        </div>
        <div className={styles.boxText}>
          <span>タイトル</span>
          <span>メタデータ</span>
        </div>
      </div>
    </div>
  )
}
