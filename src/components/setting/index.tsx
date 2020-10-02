import React, { SetStateAction, Dispatch, useState } from 'react'

import { Item, YoutubeSetting } from '@/pages/index'

import styles from './index.module.css'

type Props = {
  getSettings: () => Item[]
  updatePlayList: (index: number, name: string, value: string | boolean) => void
  startVideo: () => void
  setYoutubeSetting: Dispatch<SetStateAction<YoutubeSetting>>
}

export const Setting: React.FC<Props> = ({
  getSettings,
  updatePlayList,
  startVideo,
  setYoutubeSetting,
}) => {
  const items = getSettings()
  const [disables, setDisables] = useState<boolean[]>(
    Array(items.length).fill(true),
  )
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    updatePlayList(i, name, value)
  }

  const playVideo = async (item: Item) => {
    await setYoutubeSetting({
      onEndSetting: {
        start: item.start,
        end: item.end,
        isLoop: item.loop,
      },
      playerVars: { start: item.start, end: item.end },
    })
    startVideo()
  }

  const changeDisabled = (index: number) => {
    const copiedDisables = disables.slice()
    copiedDisables[index] = !disables[index]
    setDisables(copiedDisables)
  }

  return (
    <div className={styles.setting}>
      <table>
        <thead>
          <tr>
            <th>説明</th>
            <th>開始</th>
            <th>終了</th>
            <th>繰り返し</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  name="description"
                  value={item.description ? item.description : ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, i)
                  }
                  disabled={disables[i]}
                />
              </td>
              <td>
                <input
                  name="start"
                  type="number"
                  value={item.start ? item.start : 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, i)
                  }
                  disabled={disables[i]}
                />
              </td>
              <td>
                <input
                  name="end"
                  type="number"
                  value={item.end ? item.end : 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, i)
                  }
                  disabled={disables[i]}
                />
              </td>
              <td>
                <input
                  name="loop"
                  type="checkbox"
                  checked={item.loop}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, i)
                  }
                  disabled={disables[i]}
                />
              </td>
              <td>
                <button
                  onClick={() => {
                    playVideo(item)
                  }}
                >
                  Play!
                </button>
                <button onClick={() => changeDisabled(i)}>
                  {disables[i] ? 'Edit!' : 'Save!'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
