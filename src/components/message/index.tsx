import React, { useState } from 'react'
import { Message } from 'semantic-ui-react'

import styles from './index.module.css'

export const DissmissibleMessage: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false)
  return (
    <Message
      className={styles.dissmissMessage}
      content="保存しました"
      onDismiss={() => {
        setHidden(!hidden)
      }}
      hidden={hidden}
      info={true}
    />
  )
}
