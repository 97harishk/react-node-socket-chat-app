import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar   from '../infoBar/infoBar.js';
import Input from '../Input/Input.js';
import Massages from '../Messages/Messages.js';
import './chat.css'

let socket;
export default function Chat( { location } ) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'http://localhost:8080/';
    useEffect(() =>{
        const { name, room } = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, (error) =>{
            alert(error)
        })
        return () =>{
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() =>{
        socket.on('message', (message) =>{
            console.log(message, 'chat message');
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Massages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}  />
            </div>
        </div>
    )
}
