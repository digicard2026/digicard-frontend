// InventoryContext.js
import React, { createContext, useState, useContext } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [DID, setDID] = useState([])
    const handleSelect = (ids) => {
        if (Array.isArray(ids)) {
            // Handle multiple selections
            setSelectedIds(ids);
        } else {
            // Handle single selection
            setSelectedIds((prev) =>
                prev.includes(ids) ? prev.filter((item) => item !== ids) : [...prev, ids]
            );
        }
    };
    const handleOrderDetails = (selectedRows) => {
        // selectedRows.forEach(row => {
        //     const did = row.inventoryInfo.DID;
        //     console.log(did);
        //     setDID(did)
        // });
        const dids = selectedRows.map(row => row.inventoryId.did);
        console.log(dids);
        setDID(dids);
    };

    return (
        <InventoryContext.Provider value={{ selectedIds, handleSelect, DID, handleOrderDetails }}>
            {children}
        </InventoryContext.Provider>
    );
};
