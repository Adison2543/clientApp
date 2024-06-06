import { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ReactPlayer from 'react-player'


const socketUrl = 'ws://127.0.0.1:6521';
const fruits = [ 'apple' , 'banana' , 'lemon', 'orange', 'straw']

const fruit = () => {
    const [fruitIndex, setFruitIndex] = useState(0);
    const [message, setMessage] = useState(0);
    const [check, setCheck] = useState(false)
    const getURL = "http://192.168.10.9/ISAPI/Streaming/channels/1/picture"
    const username = "admin"
    const password = "@P@SS.W0rd"
    const {
        lastMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 2000,
        reconnectAttempts: 1000000,
    });

    useEffect(() => {
        if (lastMessage !== message && lastMessage !== null ) {
            if (lastMessage.data == fruitIndex) {
                setCheck(true)
                console.log("Currect!!! server: ", lastMessage.data, "  client: ", fruitIndex);
            } else {
                setCheck(false)
                console.log("Incurrect!!!  server: ", lastMessage.data, "  client: ", fruitIndex);
            }
            setMessage(lastMessage.data);
        }
    }, [lastMessage]);

    // useEffect(() => {
    //     try {
    //         const base64Credentials = btoa(username + ":" + password);
    //         fetch(getURL, {
    //             mode: 'no-cors',
    //             credentials: 'include',
    //             headers: {
    //                 "Authorization": "Basic " + base64Credentials
    //             }
    //         })
    //         .then(res => {
    //             if (!res.ok) {
    //                 return res.text().then(text => {
    //                     console.log('Server response:', text);
    //                     throw new Error('Network response was not ok');
    //                 });
    //             }
    //             return res.blob();
    //         })
    //         .then(blob => {
    //             const imgUrl = URL.createObjectURL(blob);
    //             console.log(imgUrl); // You can now use this URL to display the image in an <img> tag.
                
    //             // Example:
    //             // const imgElement = document.createElement('img');
    //             // imgElement.src = imgUrl;
    //             // document.body.appendChild(imgElement);
    //         })
    //         .catch(error => console.log(error));

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])
    


    // console.log("message = ",message);
    // const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting...',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];


    const renderTime = ({ remainingTime }) => {
        return (
            <img src={"/img/fruit/" + fruits[fruitIndex] + ".png"} className="imgAmimated" alt="" width={600}/>
        );
    };

    return ( 
        <>
                {connectionStatus == "Open" ? 
                <div className="entry">
                <div className="countdown">
                    <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[10, 6, 3, 0]}
                        strokeWidth={40}
                        trailStrokeWidth={0}
                        size={600}
                        onComplete={() => {
                            setFruitIndex(fruitIndex < 4? fruitIndex+1 : 0);
                            setCheck(false)
                            return { shouldRepeat: true, delay: 0 }
                        }}
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                </div>
                {/* <img src={"/img/fruit/" + fruits[fruitIndex] + ".png"} className="imgAmimated" alt="" width={600}/> */}
            </div> :    
                <div className="serverWaiting">Waiting for Server</div>
            }
                {/* <button style={{marginTop: '20px', color: 'white'}} onClick={() => setFruitIndex(fruitIndex < 4 ? fruitIndex + 1 : 0)}>Next</button> */}
                <p className="server-status">Server: <span style={{color: (connectionStatus == "Open" ? "lawngreen" : (connectionStatus == "Connecting..." ? "blue" : "red"))}}>{connectionStatus}</span></p>
                {/* <ReactPlayer url='/img/currect.mp4' playing /> */}
                {check &&
                    <div className="currectImg">
                        <iframe src="https://giphy.com/embed/LYDNZAzOqrez6" style={{borderRadius: '20px'}} width="480" height="440" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    </div>
                }
                {/* <div className="fetchImgContainer">
                    <p>Image from Camera {getURL.substring(18,20) > 10 ?  getURL.substring(18,20) -3 : getURL.substring(18,19) -2}</p>
                    <p>( {getURL} )</p>
                    {check ? <img src={getURL} alt=""  className="fetchImg" /> : <div className="noimg"><p>Incurrect!!</p></div>}
                </div> */}
                
        </>
     );
}

export default fruit;