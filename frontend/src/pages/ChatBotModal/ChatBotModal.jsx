// ChatBotModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatBot } from '../../api.js'
import '../ChatBotModal/ChatBotModal.css'

const ChatBotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "¿En qué puedo ayudarte?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
   const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { text: inputMessage, isUser: true }]);
      setInputMessage('');
       setIsTyping(true);

      try {
        const response = await chatBot(inputMessage);
        setMessages(prevMessages => [...prevMessages, { text: response, isUser: false }]);
      } catch (error) {
        console.error('Error al obtener respuesta del chatbot:', error);
        setMessages(prevMessages => [...prevMessages, { text: "Lo siento, hubo un error al procesar tu mensaje.", isUser: false }]);
      } finally {
        setIsTyping(false);
    }
  }; 
}

  return (
    <div className="fixed bottom-15 right-5 w-90 h-105 bg-white rounded-lg shadow-xl overflow-hidden">
      {/* encabezado del chat */}
      <div className="flex justify-between items-center p-2 bg-[#5bd6d6] text-gray-900">
        <h3 className="font-bold ml-3">Chatbot</h3>
        <a onClick={onClose} className="text-gray-900 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </a>
      </div>
      {/* contenido del chat */}
      <div className="p-7 h-72 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2  ${message.isUser ? 'bg-[#5bd6d6] text-gray-900 rounded-[10px_0px_10px_10px]' : 'bg-gray-200 text-gray-700 rounded-[0px_10px_10px_10px]'}`}>
              {message.isUser ? (message.text) : (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              )}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="text-left">
            <span className="p-2 rounded-lg bg-gray-200 text-gray-900">
              <span className="typing-animation"></span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* buscador del chat y boton de enviar */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex w-full p-2 border border-gray-200 rounded-full">
          <input
            type="text"
            placeholder="Preguntar..."
            className="w-full p-2 focus:outline-none"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='1em' height='1em'>
              <path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotModal;


