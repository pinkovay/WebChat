import { useState } from 'react'
import './App.css'

import Join from './components/Join/JoinScript'
import Chat from './components/Chat/ChatScript'

function App() {
  const [chatVisibilty, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <>
      <div className="App">
        {/* condição ternária */}

        {

          chatVisibilty ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />

        }

      </div>
    </>
  )
}

export default App
