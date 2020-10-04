import React, { SetStateAction, Dispatch, useState, useEffect } from 'react'
import { Button, Table, Input } from 'semantic-ui-react'

import { YoutubeSetting } from '@/pages/index'

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
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>説明</Table.HeaderCell>
          <Table.HeaderCell>開始</Table.HeaderCell>
          <Table.HeaderCell>終了</Table.HeaderCell>
          <Table.HeaderCell>繰返し</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {setting
          ? setting.map((item, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Input
                    name="description"
                    value={item.description ? item.description : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, i)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    name="start"
                    type="number"
                    value={item.start ? item.start : 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, i)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    name="end"
                    type="number"
                    value={item.end ? item.end : 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, i)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    name="loop"
                    type="checkbox"
                    checked={item.loop}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, i)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      playVideo(item)
                    }}
                  >
                    Play!
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      saveSetting(i)
                    }}
                  >
                    Save!
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          : null}
      </Table.Body>
    </Table>
  )
}
