import styles from './index.module.css'

export const YplayerHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>Y-player</div>
      <div className={styles.center}>
        <input className={styles.searchInput} type="text" />
      </div>
    </header>
  )
}
