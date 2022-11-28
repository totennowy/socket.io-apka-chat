import {useEffect, useState} from "react";

// @hooks
import UseApp from "../../../hooks/UseApp.hooks";

// @socket
import * as io from "socket.io-client";

const UseChat = () => {

    const [username, setUsername] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [showChat, setShowChat] = useState<boolean>(false);
    const [messageList, setMessageList] = useState<any[]>([]);

    const socket: any = io.connect("http://localhost:3001");

    const joinRoom = () => {
        if (username !== '' && room !== '') {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    }

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours()+':'+new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
            setCurrentMessage("");
        };
    }

    useEffect(() => {
        socket.on("received_message", (data: any) => {
           setMessageList((list) => [...list, data]);
        });
    },[socket]);

    return {
        username,
        setUsername,
        room,
        setRoom,
        currentMessage,
        setCurrentMessage,
        showChat,
        setShowChat,
        messageList,
        setMessageList,
        socket,
        joinRoom,
        sendMessage
    };
}

export default UseChat;