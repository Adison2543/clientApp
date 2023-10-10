import './App.css'
import Fruit from './components/Fruit';
import NavbarUse from './components/navbar'

function App() {

  return (
    <div>
      <NavbarUse />
      <Fruit />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Click Me to send 'Hello'
      </button>
        <p>The WebSocket is currently {connectionStatus}</p>
        <p>{lastMessage ? <span>Last message: {lastMessage.data}</span> : null}</p>
      </div>
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data + ', ' : null}</span>
        ))}
      </ul> */}
    </div>
  )
}

export default App
