// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FcBinoculars } from 'react-icons/fc';
 
 
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    


} from '@tanstack/react-table'
import { useData } from '../../assets/utils/useData'

import { rankItem } from '@tanstack/match-sorter-utils'


function search(row, columnId, value, addMeta) {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank })
    return itemRank.passed
}

// eslint-disable-next-line react/prop-types
const DebouncedInput = ({ value: keyWord, onChange, ...props }) => {
    const [value, setValue] = useState(keyWord);
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, 500);
        return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (<input {...props} value={value} onChange={e => setValue(e.target.value)} />)
}
export const MainTable = () => {

    // eslint-disable-next-line no-unused-vars
    const [data, setdata] = useState(useData);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSetsorting] = useState([]);

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
            header: 'Acciones',
            cell: info => {
                return (
                    <div>
                        <FcBinoculars className='icons'/>
                    </div>
                )
            }
        },
    ]

const getStateTable = () => {
        const totalRows = table.getFilteredRowModel().rows.length;
        const pageSize = table.getState().pagination.pageSize;
        const pageIndex = table.getState().pagination.pageIndex;
        const rowsPerPage = table.getRowModel().rows.length;
        
        const firstIndex = (pageIndex * pageSize) + 1;
        const lastIndex  = (pageIndex * pageSize) + rowsPerPage; 

    return { 
        totalRows,
        firstIndex,
        lastIndex
    }
}

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: search,
         
        onSortingChange: setSetsorting

    })

    return (
        <div className="divTable">
            <div className="div-input-buscador">
                <DebouncedInput
                    type="text"
                    className='input-buscador'
                    value={globalFilter ?? ''}
                    placeholder='Buscar producto...'
                    onChange={value => setGlobalFilter(String(value))}
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
                                                : <div>
                                                    {
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                    }
                                                </div>
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
                    <p>Registros del {getStateTable().firstIndex}&nbsp;
                        hasta {getStateTable().lastIndex}&nbsp;
                        de {getStateTable().totalRows} </p>
                </div>



            </div>
        </div>
    )
}
