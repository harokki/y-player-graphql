import { useTable, Column } from 'react-table'

import { Item } from '@/pages/index'

const columns: Column<Item>[] = [
  {
    Header: '説明',
    accessor: 'description',
  },
  {
    Header: '開始',
    accessor: 'start',
  },
  {
    Header: '終了',
    accessor: 'end',
  },
  {
    Header: '繰り返し',
    accessor: 'loop',
  },
]

interface Props {
  data: Item[]
}

export const SettingTable: React.FC<Props> = ({ data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Item>({ columns, data })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
