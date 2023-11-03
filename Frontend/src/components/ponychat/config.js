import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Pony-Chat';

const config = {
  initialMessages: [createChatBotMessage(`Bienvenido a este tu ${botName}, ¿En que puedo ayudarte?`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#840000',
      color: '#000000',
    },
    chatButton: {
        backgroundColor: '#FFB806',
        borderRadius: '20px',
    },
    userInput: {
        placeholder: "Escribe tu mensaje",
        backgroundColor: '#fff',
        border: '1px solid #5F7394',
        borderRadius: '5px',
        color: '#333',
        padding: '8px',
    },
  },
};

export default config;