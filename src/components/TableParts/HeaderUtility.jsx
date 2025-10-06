import React from 'react'

function HeaderUtility({route, filtering, handleRoutes,setFiltering, onSearch}) {
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setFiltering(value);
        if (onSearch) onSearch(value);
    };
  return (
    <div className="self-center col-span-12 w-full lg:col-span-6 lg:place-self-start">
    <div id="basic_tables_filter " className="dataTables_filter flex  ">
        {/* {route && route.length > 0 ? */}
            {/* <label >
                <p className='px-0.5 pb-3 text-black' >Choose a DID Action</p> 

                <select className="form-input border-slate-200 dark:border-slate-200 focus:outline-none
             focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-1 text-black
              dark:disabed:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 
              dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 
              dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200
              inline-block w-full lg:w-[180px] px-2.5 hover:cursor-pointer "  value={route} onChange={handleRoutes} id="">
                    <option value="">Choose a DID Action</option>
                    {route.map((routerOption, index) => (
                        <option key={index} value={routerOption}>
                            {routerOption}
                        </option>
                    ))}
                </select>
            </label> : 
        } */}
{route  ? null :  <label>
                <input type="search" className="form-input border-slate-200 dark:border-slate-200 focus:outline-none focus:border-blue-500 disabled:bg-slate-300 border rounded-md py-2 dark:disabled:bg-slate-600 disabled:border-slate-600 dark:disabled:border-slate-800 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 inline-block w-full lg:w-[291px] px-2.5 " placeholder=" Search" aria-Search aria-controls="basic_tables" value={filtering}
                    onChange={handleSearchChange}></input>
            </label> }
           
    </div>
</div>
  )
}

export default HeaderUtility