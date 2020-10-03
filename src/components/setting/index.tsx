import React, { SetStateAction, Dispatch, useState, useEffect } from 'react'

import { YoutubeSetting } from '@/pages/index'

import styles from './index.module.css'
import { Setting, useUpdateSettingMutation } from '@/generated/graphql'

type Props = {
  data: Setting[]
  startVideo: () => void
  setYoutubeSetting: Dispatch<SetStateAction<YoutubeSetting>>
}

export const SettingTable: React.FC<Props> = ({
  data,
  startVideo,
  setYoutubeSetting,
}) => {
  const [setting, setSetting] = useState<Setting[]>(data)
  const [updateSetting] = useUpdateSettingMutation()

  useEffect(() => {
    setSetting(data)
  }, [data])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const copiedSetting = setting.slice()
    copiedSetting[i] = { ...setting[i], [name]: value }
    setSetting(copiedSetting)
  }

  const saveSetting = async (i: number) => {
    const item = setting[i]
    const description = item.description ? item.description : ''
    const { data } = await updateSetting({
      variables: {
        id: item.id,
        description,
        start: item.start,
        end: item.end,
        loop: item.loop,
      },
    })
    if (!data || !data.update_setting_by_pk) {
      console.log('POST unknown state', data)
    }
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
          {setting
            ? setting.map((item, i) => (
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
                    <button
                      onClick={() => {
                        saveSetting(i)
                      }}
                    >
                      Save!
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
