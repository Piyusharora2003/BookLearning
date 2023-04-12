import React ,{useState}from 'react'
import style from "./Chat.module.css"

function ChatBox({prod}) {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (e) => {
      e.preventDefault();
      const messageInput = e.target.elements.message;
      const message = messageInput.value.trim();
      if (message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: message },
        ]);
        messageInput.value = '';
                setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: "res" },
        ]);
      }
    };
  return (
    <div className={style.chatWindow}>
      <div className={style.topnav}>
      <i className={`fa-solid fa-user ${style.profileIcon}`}></i> Robo-Bot
      </div>
      <div className={style.chatHistory}>
        {messages.map((message) => (
          <div key={message.id} className={style.message}>
            {message.text}
          </div>
        ))}
      </div>
      <form className={style.form} onSubmit={handleSendMessage}>
        <input type="text"    className={style.input}  name="message" autoComplete="off" placeholder="Type your Query..." />
        <button type="submit" className={style.sendbtn} ><i className="fa-sharp fa-solid fa-paper-plane-top"></i></button>
      </form>
    </div>  )
}

export default ChatBox;



