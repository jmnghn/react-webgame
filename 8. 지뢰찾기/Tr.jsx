import React, { useContext, memo } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);

    return (
        <>
            <tr>
                {
                    tableData[0] && Array(tableData[0].length).fill().map((td, i) => {
                        return <Td key={i} rowIndex={rowIndex} colIndex={i} />
                    })
                }
            </tr>
        </>
    )
    
})

export default Tr;