import React from 'react'

import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import tableStyles from '@core/styles/table.module.css'
import type { TableProps } from '@/@core/types'

const Table = <T,>({ data, columns, loading, error, emptyText = 'No data available' }: TableProps<T>) => {
  if (loading) {
    return (
      <Card>
        <div className='flex justify-center items-center p-4'>
          <CircularProgress />
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <div className='flex justify-center items-center p-4'>
          <Typography color='error'>{error}</Typography>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={column.className}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className='!plb-1'>
                      {column.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className='text-center p-4'>
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default Table
