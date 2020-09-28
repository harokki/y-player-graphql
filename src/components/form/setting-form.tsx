import React, { ChangeEvent, useState } from 'react'

import { Item } from '@/pages/index'
import styles from './index.module.css'

type Props = {
  items: Item[]
}

interface HTMLElementEvent<T extends HTMLElement> extends ChangeEvent {
  target: T
}

export const SettingForm: React.FC<Props> = ({ items }) => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [values, setValues] = useState({
    start: undefined,
    end: undefined,
    loop: false,
  })

  const handleInputChange = (e: HTMLElementEvent<HTMLInputElement>) => {
    const target = e.target
    if (target) {
      const value = target.type === 'checkbox' ? !target.checked : target.value
      const name = target.name
      setValues({ ...values, [name]: value })
    }
  }

  return (
    <>
      {items
        ? items.map((item, i) => (
            <form key={i} className={styles.form}>
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
                  onChange={(e) => handleInputChange(e)}
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
                  onChange={(e) => handleInputChange(e)}
                  disabled={disabled}
                />
                <input type="button" value="現在時間取得" disabled={disabled} />
              </label>
              <label>
                <span>繰り返し</span>
                <input
                  type="checkbox"
                  name="loop"
                  defaultChecked={item.loop}
                  onChange={(e) => handleInputChange(e)}
                  disabled={disabled}
                />
              </label>
              <input
                type="button"
                value="Edit!"
                onClick={() => setDisabled(!disabled)}
              />
            </form>
          ))
        : null}
    </>
  )
}
