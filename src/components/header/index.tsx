import { useRouter } from 'next/router'
import { Input } from 'semantic-ui-react'

import styles from './index.module.css'

export const YplayerHeader: React.FC = () => {
  const router = useRouter()
  return (
    <header className={styles.header}>
      <div className={styles.left} onClick={() => router.push(`/`)}>
        Y-player
      </div>
      <div className={styles.center}>
        <Input className={styles.searchInput} type="text" />
      </div>
    </header>
  )
}
