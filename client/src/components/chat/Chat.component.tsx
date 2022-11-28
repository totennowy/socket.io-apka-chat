import React, {FC} from "react";

// @models
import {ModelChat} from "./model/ModelChat.model";

// @hooks
import UseChat from "./hooks/UseChat.hooks";

// @styles
import styles from "./styles/StylesChat.module.scss";

const Chat: FC<ModelChat> = () => {

    const {
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
    } = UseChat();

    return (
        <div className={styles.wrap}>
            <div className={styles.wrap_header}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Room ID..."
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button
                    onClick={joinRoom}
                >
                    Join a room
                </button>
            </div>
            <div className={styles.wrap_body}>
                {messageList.map((message: any) => {
                    return (
                        <div
                            className={username === message.author ? styles.you : styles.other}
                            key={message.message}
                        >
                            <div className={styles.message_text}>{message.message}</div>
                            <div className={styles.message_data}>{message.time} {message.author}</div>
                        </div>
                    )
                })
                }
            </div>
            {
                showChat ?
                    <div className={styles.wrap_footer}>
                        <input
                            type="text"
                            placeholder="Hey..."
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={(e) => {
                                e.key === "Enter" && sendMessage();
                            }}
                        />
                        <button
                            onClick={sendMessage}
                        >&#9658;</button>
                    </div>
                    : null
            }
        </div>
    );
}

export default Chat;