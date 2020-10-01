import React, { SetStateAction, Dispatch } from 'react'

import { Item, PlayListItem, YoutubeSetting } from '@/pages/index'

import styles from './index.module.css'

type Props = {
  videoId: string
  playList: PlayListItem
  setPlayList: Dispatch<SetStateAction<PlayListItem>>
  startVideo: () => void
  setYoutubeSetting: Dispatch<SetStateAction<YoutubeSetting>>
}

export const Setting: React.FC<Props> = ({
  videoId,
  playList,
  setPlayList,
  startVideo,
  setYoutubeSetting,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const copiedItems = playList[videoId].slice()
    copiedItems[i] = { ...copiedItems[i], [name]: value }
    const copiedPlayList = Object.assign({}, playList)
    copiedPlayList[videoId] = copiedItems
    setPlayList(copiedPlayList)
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
          {playList[videoId]
            ? playList[videoId].map((item, i) => (
                <tr key={i}>
                  <td>
                    <input
                      name="description"
                      value={item.description ? item.description : ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, i)
                      }
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
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}
