import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
}

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
    halted: true,
});

const plantMine = (row, col, mine) => {
    // console.log(row, col, mine);
    const candidate = Array(row*col).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * col - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    // console.log('shuffle', shuffle);

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < col; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / col);
        const hor = shuffle[k] % col;
        data[ver][hor] = CODE.MINE;
    }

    // console.log(data);
    return data;
}

const initialState = {
    tableData: [],
    data: {
        row: 0,
        col: 0,
        mine: 0,
    },
    timer: 0,
    result: 0,
    halted: true,
    openedCount: 0,

};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: 
            return {
                ...state,
                data: {
                    row: action.row, 
                    col: action.col, 
                    mine: action.mine,
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.col, action.mine),
                halted: false,
                timer: 0,
            }
        case OPEN_CELL: {
            // console.log('OPEN_CELL');
            const tableData = [...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;
            const checkAround = (row, col) => {
                if (row < 0 || row >= tableData.length || col < 0 || col >= tableData[0].length) {
                    return;
                } // 상하좌우 없는칸은 안 열림
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][col])) {
                    return;
                } // 닫힌 칸만 열기
                if (checked.includes(row + '/' + col)) {
                    return;
                } else {
                    checked.push(row + '/' + col);
                } // 한 번 연칸은 무시하기
                // 주변 지뢰 개수
                let around = [
                    tableData[row][col - 1], tableData[row][col + 1],
                ];
                if ( tableData[row - 1]) {
                    around = around.concat(
                        tableData[row - 1][col - 1],
                        tableData[row - 1][col],
                        tableData[row - 1][col + 1],
                    )
                }
                if ( tableData[row + 1]) {
                    around = around.concat(
                        tableData[row + 1][col - 1],
                        tableData[row + 1][col],
                        tableData[row + 1][col + 1],
                    )
                }
                const count = around.filter(function (v) { 
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v) 
                }).length;
                // tableData[row][col] = count;
                // / 주변 지뢰 개수
                if ( count === 0 ) {
                    if ( row > -1 ) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row - 1, col - 1]);
                            near.push([row - 1, col]);
                            near.push([row - 1, col + 1]);
                        }
                        near.push([row, col - 1]);
                        near.push([row, col + 1]);
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, col - 1]);
                            near.push([row + 1, col]);
                            near.push([row + 1, col + 1]);
                        }
                        // console.log(near)
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]);
                            }
                        })
                    }
                }
                if (tableData[row][col] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount += 1;
                }
                tableData[row][col] = count;
            }
            checkAround(action.row, action.col);
            let halted = false;
            let result = '';
            if (state.data.row * state.data.col - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer} 초 만에 승리하셨습니다!`;
            }
            
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            }
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if ( tableData[action.row][action.col] === CODE.MINE ) {
                tableData[action.row][action.col] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.col] = CODE.FLAG;
            }
            
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if ( tableData[action.row][action.col] === CODE.FLAG_MINE ) {
                tableData[action.row][action.col] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.col] = CODE.QUESTION;
            }
            
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if ( tableData[action.row][action.col] === CODE.QUESTION_MINE ) {
                tableData[action.row][action.col] = CODE.MINE;
            } else {
                tableData[action.row][action.col] = CODE.NORMAL;
            }
            
            return {
                ...state,
                tableData,
            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;
    const value = useMemo(() => ({ tableData, halted: halted, dispatch}), [tableData, halted]);

    useEffect(() => {
        if ( halted === false ) {
            const timer = setInterval(() => {
                dispatch({type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted === true]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{ timer }</div>
            <Table/>
            <div>{ result }</div>
        </TableContext.Provider>
    )
    
}

export default MineSearch;