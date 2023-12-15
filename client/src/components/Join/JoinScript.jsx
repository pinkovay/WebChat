import React, {useRef} from 'react';
import io from 'socket.io-client';
import style from './Join.module.css'

const Join = ({setChatVisibility, setSocket}) => {

    const userNameRef = useRef() // I need to study more about useRef

    const handleSubmit = async () =>{
        const username = userNameRef.current.value
        if(!username.trim()) return // checking if the username is not empty
        const socket = await io.connect('http://localhost:3001') // connecting to the backend
        socket.emit('set_username', username ) // event being passed to the backend
        setSocket(socket)
        setChatVisibility(true) // Changing Chat visibility to true
    }

    return (
        <div className={style['join-container']}>
            <h1>Chat</h1>
            <div className={style['inputs']}>
                <input type="text" name="" id="" placeholder='Nome de usuário' ref={userNameRef} />
                <button onClick={()=>handleSubmit()} className={style['buttonEnter']}>Entrar</button>
            </div>
        </div>
    );
}

export default Join;