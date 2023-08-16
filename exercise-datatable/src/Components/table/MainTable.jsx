// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// import { FaBeer } from 'react-icons/fa';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel


} from '@tanstack/react-table'
import { useData } from '../../assets/utils/useData'

import { rankItem } from '@tanstack/match-sorter-utils'

export const MainTable = () => {

    // eslint-disable-next-line no-unused-vars
    const [data, setdata] = useState(useData);
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = [
        {
            accessorKey: 'id',
        },
        {
            accessorKey: 'categoria',
        },
        {
            accessorKey: 'nombre',
        },
        {
            accessorKey: 'marca',
        },
        {
            accessorKey: 'detalles',
        },
        {
            accessorKey: 'precio',
        },
        {
            accessorKey: 'cantidad',
        },
        {
            accessorKey: 'Accion',
        },
    ]

    function search(row, columnId, value, addMeta) {
        
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: search
    })

    return (
        <div className="divTable">
            <div className="div-input-buscador">
                <input 
                type="text" 
                className='input-buscador'
                placeholder='Buscar...'
                onChange={e => setGlobalFilter(e.target.value)}
                />
            </div>
            <table className='table'>
                <thead>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='table-tr'>
                                {
                                    headerGroup.headers.map(header => (
                                        <th key={header.id} className='table-th'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className='tbody-tr'>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className='tbody-td'>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="container-flechas">
                <div className="flechas-div">

                    <button
                        className='flechas-btn'
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >{'<<'}</button>
                    <button
                        className='flechas-btn'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}

                    >{'<'}</button>

                    {
                        table.getPageOptions().map((value, key) => (
                            <button
                                key={key}
                                onClick={() => table.setPageIndex(value)}
                                className='flechas-btn'>{value + 1}</button>
                        ))
                    }
                    <button
                        className='flechas-btn'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >{'>'}</button>
                    <button
                        className='flechas-btn'
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >{'>>'}</button>
                </div>

                <div className="flechas-info">
                    <p>Registros del {Number(table.getRowModel().rows[0].id) + 1}&nbsp;
                    hasta {Number(table.getRowModel().rows[table.getRowModel().rows.length - 1].id) + 1}&nbsp;
                    de {data.length} </p>
                </div>



            </div>
        </div>
    )
}
