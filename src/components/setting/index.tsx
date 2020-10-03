import React, { SetStateAction, Dispatch } from 'react'

import { YoutubeSetting } from '@/pages/index'

import styles from './index.module.css'
import { useGetSettingQuery, Setting } from '@/generated/graphql'

type Props = {
  playlistId: string | undefined
  updatePlayList: (index: number, name: string, value: string | boolean) => void
  startVideo: () => void
  setYoutubeSetting: Dispatch<SetStateAction<YoutubeSetting>>
}

export const SettingTable: React.FC<Props> = ({
  playlistId,
  updatePlayList,
  startVideo,
  setYoutubeSetting,
}) => {
  const { loading, error, data } = useGetSettingQuery({
    variables: { playlistId: playlistId as string },
  })
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    updatePlayList(i, name, value)
  }

  const playVideo = async (item: Setting) => {
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

  if (loading) {
    return <p>loading...</p>
  }
  if (error) {
    return <p>{error.toString()}</p>
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
          {data
            ? data.setting.map((item, i) => (
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
