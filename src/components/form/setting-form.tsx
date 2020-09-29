import React, { useState } from 'react'

import { Item } from '@/pages/index'
import styles from './index.module.css'

type Props = {
  items: Item[]
}

export const SettingForm: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items
        ? items.map((item, i) => (
            <div key={i} className={styles.setting}>
              <label>
                <span>説明</span>
                <input type="text" value={item.title} />
              </label>
              <label>
                <span>開始</span>
                <input type="number" value={item.start} />
              </label>
              <label>
                <span>終了</span>
                <input type="number" value={item.end} />
              </label>
              <label>
                <span>繰り返し</span>
                <input type="checkbox" checked={item.loop} />
              </label>
            </div>
          ))
        : null}
    </>
  )
}
