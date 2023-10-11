import { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket'

const fruit = () => {
    const fruit = [ 'apple' , 'banana' , 'lemon', 'orange', 'straw']
    const [fruitIndex, setFruitIndex] = useState(0);
    const socketUrl = 'ws://127.0.0.1:6521';
    const [message, setMessage] = useState('0');

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastMessage !== message && lastMessage !== null ) {
            setMessage(lastMessage.data);
        }
    }, [lastMessage]);

    console.log("message = ",message);
    // const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return ( 
        <>
                <div className="entry">
                    <img src={"/img/fruit/" + fruit[message] + ".png"} className="imgAmimated" alt="" width={600}/>
                </div>
                <button style={{marginTop: '20px', color: 'white'}} onClick={() => setFruitIndex(fruitIndex < 4 ? fruitIndex + 1 : 0)}>Next</button>
                <p className="server-status">Server status: <span>{connectionStatus}</span></p>
        </>
     );
}
 
export default fruit;