import { useEffect, useState } from 'react'
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
  updateMyData: (rowIndex: number, columnId: string, value: any) => void
}

interface CellProps {
  value: any
  row: { index: number }
  column: { id: string }
  updateMyData: (rowIndex: number, columnId: string, value: any) => void
}

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}: CellProps) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  if (id !== 'loop') {
    return <input value={value} onChange={onChange} onBlur={onBlur} />
  } else {
    return (
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  }
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

export const SettingTable: React.FC<Props> = ({ data, updateMyData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Item>({
    columns,
    data,
    defaultColumn,
    // 型エラーが起きるのでindex.d.tsに型を追加している
    // https://github.com/tannerlinsley/react-table/issues/2743
    updateMyData,
  })

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
