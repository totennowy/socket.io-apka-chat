import React from 'react';

// @hooks
import UseChat from "./components/chat/hooks/UseChat.hooks";

// @styles
import styles from './App.scss';

// @components
import Chat from "./components/chat/Chat.component";

function App() {
    return (
        <div className={styles.wrap}>
            <p className={styles.title}>Join A Chat</p>
            <Chat />
        </div>
    );
}

export default App;
