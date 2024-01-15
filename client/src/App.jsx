import { useState } from 'react'
import './App.css'

import Join from './components/Join/JoinScript'
import Chat from './components/Chat/ChatScript'

function App() {
  // estes state's estão sendo criados aqui
  const [chatVisibilty, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  const [chatName, setChatName] = useState("Login")

  return (
    <>

      <div className="boxUserName">
        <h1 className="UserName">{chatName}</h1>
      </div>

      <div className="App">
        {/* condição ternária */}

        {

          // A expressão condicional ternária (condition ? expr1 : expr2) avalia chatVisibility. Se chatVisibility for verdadeiro, o componente <Chat /> será renderizado; caso contrário, o componente <Join /> será renderizado.

          chatVisibilty ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} setChatName={setChatName} />

        }

      </div>

     
    </>
  )
}

export default App
