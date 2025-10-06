import React from 'react'

function DynamicTableBody({ table, expanded, columns, flexRender, }) {   
    return (
        <>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <React.Fragment key={row.id}>
                        <tr className="group-[.stripe]:even:bg-slate-50 group-[.stripe]:dark:even:bg-zink-600 transition-all duration-150 ease-linear group-[.hover]:hover:bg-slate-50 dark:group-[.hover]:hover:bg-zink-600 [&amp;.selected]:bg-custom-500 dark:[&amp;.selected]:bg-custom-500 [&amp;.selected]:text-custom-50 dark:[&amp;.selected]:text-custom-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="p-2 group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500 sorting_1">
                                    <p className="font-normal text-black dark:text-white" >{flexRender(cell.column.columnDef.cell, cell.getContext())} </p>
                                </td>
                            ))}
                        </tr>
                        {expanded[row.id] && (
                            <tr >
                                <td colSpan={columns.length + 1}>
                                    <div style={{
                                        padding: '20px',
                                        backgroundColor: '#f9f9f9',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        marginTop: '10px',
                                    }}>
                                        <strong className='text-black  '>Additional Details:</strong>
                                        <ul className='flex p-2 ' >
                                            {Object.entries(row.original).map(([key, value]) => (
                                                key !== 'id ' && key !== 'isinBlockedInCart' && key !== '_id' && key !== 'slno' && key !== 'customer_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== 'isBlockedInCart' && key !== 'blockedBy' && (
                                                    <li className=' pl-5 dark:border-zink-500' key={key}>
                                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                                        <p>{Array.isArray(value) ? value.join(', ') : value}</p>

                                                    </li>
                                                )

                                            ))}
                                        </ul>

                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </>
    )
}

export default DynamicTableBody