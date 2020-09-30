import React, { SetStateAction, Dispatch } from 'react'

import { Item, YoutubeSetting } from '@/pages/index'

import styles from './index.module.css'

type Props = {
  items: Item[]
  startVideo: () => void
  setYoutubeSetting: Dispatch<SetStateAction<YoutubeSetting>>
}

export const Setting: React.FC<Props> = ({
  items,
  startVideo,
  setYoutubeSetting,
}) => {
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
          {items
            ? items.map((item, i) => (
                <tr key={i}>
                  <td>{item.description}</td>
                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td>{item.loop ? 'yes' : 'no'}</td>
                  <td>
                    <button
                      onClick={() => {
                        playVideo(item)
                      }}
                    >
                      Play!
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}
