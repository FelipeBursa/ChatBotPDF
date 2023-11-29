import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ChatBubble from './ChatBubble'; // Ajusta la ruta según tu estructura de proyecto

const ChatComponent = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://127.0.0.1:8000/chat/${encodeURIComponent(inputText)}`);
      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      setChatHistory([...chatHistory, { message: inputText, response: data.response.response }]);
      setInputText('');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  // Utiliza useEffect para desplazar el contenedor al final cuando se agregan nuevas burbujas
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <Typography variant="h5" gutterBottom>
        Chat con Ia 
      </Typography>
      <div ref={chatContainerRef} style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '10px' }}>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <ChatBubble message={`Tú: ${chat.message}`} isUser={true} />
            <ChatBubble message={`Respuesta: ${chat.response}`} isUser={false} />
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        )}
      </div>
      <TextField
        fullWidth
        label="Escribe tu mensaje..."
        variant="outlined"
        value={inputText}
        onChange={handleInputChange}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSendClick}>
        Enviar
      </Button>
    </Paper>
  );
};

export default ChatComponent;
