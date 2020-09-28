import React, { useState } from 'react'

import { Item } from '@/pages/index'
import styles from './index.module.css'

type Props = {
  item: Item
}

export const SettingForm: React.FC<Props> = ({ item }) => {
  const [disabled, setDisabled] = useState<boolean>(true)

  return (
    <>
      {item && (
        <form className={styles.form}>
          <label>
            <span>説明</span>
            <input type="text" name="description" disabled={disabled} />
          </label>
          <label>
            <span>開始</span>
            <input
              type="text"
              name="start"
              defaultValue={item.start}
              disabled={disabled}
            />
            <input type="button" value="現在時間取得" disabled={disabled} />
          </label>
          <label>
            <span>終了</span>
            <input
              type="text"
              name="end"
              defaultValue={item.end}
              disabled={disabled}
            />
            <input type="button" value="現在時間取得" disabled={disabled} />
          </label>
          <label>
            <span>繰り返し</span>
            <input
              type="checkbox"
              name="loop"
              checked={item.loop}
              disabled={disabled}
            />
          </label>
          <input
            type="button"
            value="Edit!"
            onClick={() => setDisabled(!disabled)}
          />
        </form>
      )}
    </>
  )
}
