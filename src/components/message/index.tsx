import React, { useState } from 'react'
import { Message } from 'semantic-ui-react'

import styles from './index.module.css'

export type Props = {
  content: string
}

export const DissmissibleMessage: React.FC<Props> = ({ content }) => {
  const [hidden, setHidden] = useState<boolean>(false)
  return (
    <Message
      className={styles.dissmissMessage}
      content={content}
      onDismiss={() => {
        setHidden(!hidden)
      }}
      hidden={hidden}
      info={true}
    />
  )
}
