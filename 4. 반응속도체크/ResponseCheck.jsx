import React, { Component, useState, useRef } from 'react';

// Class Component -> hooks
const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    // 값이 바껴도 화면에는 영향을 미치고 싶지않을 때(re-render 하고 싶지 않을 때)
    const timeOut = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    // let timeout;
    // let startTime;
    // let endTime;

    const onClickScreen = () => {
        if (state === 'waiting') {
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭하세요');
            }, Math.floor(Math.random() * 1000) + 2000);
            startTime.current = new Date();
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
        } else if (state === 'ready') {
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('너무 성급하셨음... 초록색이 되면 클릭해주세요 ㅠㅠ 클릭하면 다시 시작합니다.');
        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current]
            })
        }
    }

    const onReset = () => {
        setResult([]);
    }

    return (
        <>
            <div 
                id='screen' 
                className={state} 
                onClick={onClickScreen}
            >
                {message}
            </div>
                {
                    result.length === 0 
                    ? null 
                    : <><div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div><button onClick={onReset}>리셋</button></>
                }    
        </>
    )
    
}

// Class Component
// class ResponseCheck extends Component {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요.',
//         result: [],
//     }

//     timeout;
//     startTime;
//     endTime;

//     onClickScreen = () => {
//         const { 
//             state, 
//             message, 
//             result 
//         } = this.state;

//         if (state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요.',
//             });
//             this.timeout = setTimeout(() => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭!'
//                 })
//             }, Math.floor(Math.random() * 1000) + 2000);
//             this.startTime = new Date();
//         } else if (state === 'ready') {
//             clearTimeout(this.timeout);
//             this.setState({
//                 state: 'waiting',
//                 message: '너무 성급하셨음...ㅠㅠ 초록색이 된 후에 눌러주세요!'
//             })
//         } else if (state === 'now') {
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 시작하세요.',
//                     result: [...prevState.result, this.endTime - this.startTime],
//                 }
//             })
//         }
//     }

//     onReset = () => {
//         this.setState({
//             result: []
//         })
//     }

//     render() {
//         return (
//             <>
//                 <div 
//                     id='screen' 
//                     className={this.state.state} 
//                     onClick={this.onClickScreen}
//                 >
//                     {this.state.message}
//                 </div>
//                     {
//                         this.state.result.length === 0 
//                         ? null 
//                         : <><div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div><button onClick={this.onReset}>리셋</button></>
//                     }             
//             </>
//         )
//     }
// }

export default ResponseCheck;