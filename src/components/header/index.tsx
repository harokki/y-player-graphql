import { useRouter } from 'next/router'
import { Input, Header } from 'semantic-ui-react'

import styles from './index.module.css'

export const YplayerHeader: React.FC = () => {
  const router = useRouter()
  return (
    <Header className={styles.header}>
      <div className={styles.left} onClick={() => router.push(`/`)}>
        Y-player
      </div>
      <div className={styles.center}>
        <Input
          className={styles.searchInput}
          type="text"
          action={{ icon: 'search' }}
          placeholder="Search..."
        />
      </div>
    </Header>
  )
}
