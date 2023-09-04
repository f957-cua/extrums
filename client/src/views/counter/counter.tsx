import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrent, postValue } from '../../operations/axios';
import "./index.css";
import Notify from '../../components/notify/notify';

const postCounterValue = async (currentValue: number, token: string, addMessage: Function): Promise<void> => {
    try {        
        const res = await postValue(currentValue, token);
        const { data: { message } } = res;
        addMessage(message);
        console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

interface IList {
    currentValue: number,
    date: string,
    _id: string,
}
    
const CounterView: React.FC = () => {
    const [value, setValue] = useState(0);
    const [message, setMessage] = useState("");
    const [list, setList] = useState<Array<IList>>([]);
    const [visible, setVisible] = useState(false)

    
    const { state: { token } } = useLocation();
    const loginToken = useRef(token);
    
    const initCounter = async (initValue: Function, initList: Function, initMessage: Function) => {
        try {
            const res = await getCurrent(loginToken.current);
            console.log(res)
            const { currentValue, valueList, message } = res;
            initMessage(message);
            initValue(currentValue);
            setList(valueList);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        initCounter(setValue, setList, setMessage);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (value === 0) {
                return
            }
            postCounterValue(value, loginToken.current, setMessage);
            setValue(0);
        }, 3000)

        return () => clearInterval(interval);
    }, [value])

    const handleIncrement = () => setValue(value + 1);
    const handleDecrement = () => setValue(value - 1);

    return (
        <div className="auth_container">
            <h2>Counter</h2>
            <p>{value}</p>
            <div className="counter_container">
                <button onClick={handleIncrement}>+</button>
                <button onClick={handleDecrement}>-</button>
            </div>
            <button onClick={() => setVisible(true)}>load historical results</button>
            <Notify message={message} />
            {visible && (<ul className="container_list">
                {list.map(({currentValue, date, _id}) => (
                    <li key={_id} className="container_item">
                        <p>{currentValue}</p>
                        <p>{date}</p>
                    </li>
                ))}</ul>)
            }
        </div>
    )
}

export default CounterView;