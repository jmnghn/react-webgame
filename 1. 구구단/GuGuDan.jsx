const React = require('react');
const { useState, useRef } = require('react');

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        
        if (parseInt(value) === first * second) {
            setResult('정답');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('아닙니다ㅠㅠ');
            setValue('');
            inputRef.current.focus();
        }
    }
    console.log('rendering...');
    return (
        <>
            <div>{first} 곱하기 {second}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} type="number" value={value} />
                {/*
                    javascript 예약어랑 겹처서 다르게 쓰는 애들..
                    class -> className, for -> htmlFor
                */}
                <button>제출!</button>
            </form>
            <div>{result}</div>
        </>
    )
}

module.exports = GuGuDan;