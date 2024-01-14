import React, { useRef, useState, useEffect } from 'react';
import style from './Chat.module.css'
import { BiSolidSend } from "react-icons/bi"

export default function Chat({ socket }) {

    const bottomRef = useRef()
    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.on('receive_message', data => { // Receiving event of backend
            setMessageList((current) => [...current, data]) // Adding a message to the message array
            // "...current" are the current items already added
            console.log(data)
        })

        // If the event is not completed, the message will be stored but all at once. So...

        return () => socket.off('receive_message')

    }, [socket]) // dependency array


    useEffect(() => {
        scrollDown()
    }, [messageList])

    const handleSubmit = () => {
        const message = messageRef.current.value
        if (!message.trim()) return // Checking if the message is empty

        socket.emit('message', message)
        console.log('foi')
        clearInput()
        focusInput()
    }


    const clearInput = () => {
        messageRef.current.value = ''
    }


    const focusInput = () => {
        messageRef.current.focus()
    }


    const getEnterKey = (e) => {
        if (e.key === 'Enter')
            handleSubmit()
    }

    const scrollDown = () => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className={style['chat-container']}>
                <div className={style["chat-body"]}>
                    {/* Precis entender como fazer a minha mensagem ter uma cor diferente. */}

                    {/* ATUALIZAÇÃO: Descobri que o authorID n está chegando até o front-end */}
                    {
                        messageList.map((message, index) => (
                            <div className={`${style["message-container"]} ${message.authorId === socket.id && style["message-mine"]}`} key={index}>
                                <div className="message-author"><strong>{message.author}</strong></div>
                                <div className="message-text">{message.text}</div>
                            </div>
                        ))
                    }
                    <div ref={bottomRef}/>
                </div>
                <div className={style["chat-footer"]}>
                    <input type="text" ref={messageRef} placeholder='Mensagem' className={style['inputText']} onKeyDown={(e)=>getEnterKey(e)} fullWidth />
                    <BiSolidSend color='#0863ec' className='buttonSend' onClick={() => handleSubmit()} />
                </div>
            </div>
        </div>
    )
}