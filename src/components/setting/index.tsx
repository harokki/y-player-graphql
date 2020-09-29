import React, { SetStateAction, Dispatch } from 'react'

import { Item, PlayerVars } from '@/pages/index'

type Props = {
  items: Item[]
  startVideo: (
    start: number | undefined,
    end: number | undefined,
    isLoop: boolean,
  ) => void
  setPlayerVars: Dispatch<SetStateAction<PlayerVars>>
}

export const Setting: React.FC<Props> = ({
  items,
  startVideo,
  setPlayerVars,
}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>説明</th>
            <th>開始</th>
            <th>終了</th>
            <th>繰り返し</th>
          </tr>
        </thead>
        {items
          ? items.map((item, i) => (
              <tbody key={i}>
                <tr>
                  <td>{item.description}</td>
                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td>{item.loop ? 'yes' : 'no'}</td>
                  <td>
                    <button
                      onClick={async () => {
                        await setPlayerVars({
                          start: item.start,
                          end: item.end,
                        })
                        startVideo(item.start, item.end, item.loop)
                      }}
                    >
                      Play!
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          : null}
      </table>
    </>
  )
}
