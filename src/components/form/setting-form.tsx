import React from 'react'

import { Item } from '@/pages/index'
import styles from './index.module.css'

type Props = {
  items: Item[]
}

export const SettingForm: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items
        ? items.map((item) => (
            <form className={styles.form}>
              <label>
                <span>説明</span>
                <input type="text" name="description" />
              </label>
              <label>
                <span>開始</span>
                <input type="text" name="start" value={item.start} />
                <input type="button" value="現在時間取得" />
              </label>
              <label>
                <span>終了</span>
                <input type="text" name="end" value={item.end} />
                <input type="button" value="現在時間取得" />
              </label>
              <label>
                <span>繰り返し</span>
                <input type="checkbox" name="loop" defaultChecked={item.loop} />
              </label>
            </form>
          ))
        : null}
    </>
  )
}
