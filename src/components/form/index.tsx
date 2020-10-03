import React, { useState, Dispatch, SetStateAction, useCallback } from 'react'
import { Form, Input, Button, Checkbox } from 'semantic-ui-react'

import { YoutubeSetting } from '@/pages/index'
import { usePostSettingMutation } from '@/generated/graphql'

type Props = {
  refetch: () => void
  playlistId: string
  startVideo: () => void
  getNowTime: () => Promise<number | undefined>
  setYoutubeSetting: Dispatch<SetStateAction<YoutubeSetting>>
}

export const MainForm: React.FC<Props> = ({
  refetch,
  playlistId,
  startVideo,
  getNowTime,
  setYoutubeSetting,
}) => {
  const [start, setStart] = useState<number | undefined>(undefined)
  const [end, setEnd] = useState<number | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [loop, setLoop] = useState<boolean>(false)
  const [postDisabled, setPostDisabled] = useState<boolean>(false)
  const [postSetting] = usePostSettingMutation()

  const handlePost = useCallback(
    async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault()
      if (postDisabled) {
        return
      }

      const convStart = start ? start : 0
      const convEnd = end ? end : 0
      setPostDisabled(true)
      const { data } = await postSetting({
        variables: {
          playlistId,
          description: title,
          start: convStart,
          end: convEnd,
          loop,
        },
      })
      if (data && data.insert_setting_one) {
        refetch()
        setPostDisabled(false)
      } else {
        console.log('POST unknown state', data)
      }
    },
    [start, end, loop, title, postSetting, playlistId, postDisabled, refetch],
  )

  const playVideo = async () => {
    await setYoutubeSetting({
      onEndSetting: { start, end, isLoop: loop },
      playerVars: { start, end },
    })
    startVideo()
  }

  const setNowTime = async (type: string) => {
    const nowTime = await getNowTime()
    if (type === 'start') {
      setStart(nowTime ? Math.floor(nowTime) : 0)
    } else {
      setEnd(nowTime ? Math.floor(nowTime) : 0)
    }
  }

  return (
    <>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="説明"
            placeholder="説明"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Form.Field
            control={Input}
            label="開始"
            type="number"
            placeholder={0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStart(Number(e.target.value))
            }
          />
          <Form.Field
            control={Input}
            label="終了"
            type="number"
            placeholder={0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnd(Number(e.target.value))
            }
          />
        </Form.Group>
        <Form.Field
          control={Checkbox}
          label="繰り返し"
          onClick={() => setLoop(!loop)}
        />
        <Form.Group inline={true}>
          <Form.Field control={Button} onClick={() => playVideo()}>
            再生
          </Form.Field>
          <Form.Field
            control={Button}
            onClick={(ev: React.FormEvent<HTMLFormElement>) => handlePost(ev)}
          >
            保存
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}
