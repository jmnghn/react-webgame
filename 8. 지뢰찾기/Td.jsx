import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            };
        default:
            return {
                background: 'white',
            }
    }
}

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
}

const Td = memo(({rowIndex, colIndex}) => {
    const { tableData, dispatch, halted } = useContext(TableContext)

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][colIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row: rowIndex, col: colIndex})
                return;
            case CODE.MINE:
                console.log('여기탄거맞니')
                dispatch({type: CLICK_MINE, row: rowIndex, col: colIndex})
                return;
            default:
                return;
        }
    }, [ tableData[rowIndex][colIndex], halted ]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, col: colIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, col: colIndex })
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, col: colIndex })
                return;
            default:
                return;
        }
    }, [ tableData[rowIndex][colIndex], halted ]);

    return <RealTd 
                onClickTd={onClickTd} 
                onRightClickTd={onRightClickTd} 
                data={tableData[rowIndex][colIndex]} 
            />
    
})

const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
    console.log('rendered RealTd');
    return (
        <>
            <td
                style={getTdStyle(data)}
                onClick={onClickTd}
                onContextMenu={onRightClickTd}
            >{ getTdText(data)}</td>
        </>
    )
})

export default Td;