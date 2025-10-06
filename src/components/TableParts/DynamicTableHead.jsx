import React from 'react'

function DynamicTableHead({table, flexRender}) {
    return (
        <>  
        <thead className="border-b border-slate-200 dark:border-zink-500">
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header =>
                        <th className="   
                                group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500 sorting px-2 py-2.5
                                 text-black bg-slate-200/50 font-semibold font-public text-left dark:text-zink-50 dark:bg-zink-600 dark:group-[.bordered]:border-zink-500 
                                 sorting_asc  "  key={header.id} onClick={header.column.getToggleSortingHandler()}>

                            <div className='flex items-center '>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}

                                <span className='material-symbols-outlined' style={{ cursor: 'pointer', paddingTop: '0px', paddingLeft: '5px' }} >
                                    unfold_more
                                    {
                                        { asc: ' ', desc: '  ', }
                                        [header.column.getIsSorted() ?? null]
                                    }
                                </span>
                            </div>
                        </th>
                    )}
                </tr>
            ))}
        </thead>
        </>
    )
}

export default DynamicTableHead