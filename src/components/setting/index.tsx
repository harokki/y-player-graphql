import React from 'react'

import { Item } from '@/pages/index'

type Props = {
  items: Item[]
}

export const Setting: React.FC<Props> = ({ items }) => {
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
                </tr>
              </tbody>
            ))
          : null}
      </table>
    </>
  )
}
