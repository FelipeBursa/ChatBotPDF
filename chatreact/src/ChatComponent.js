import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ChatComponent = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/chat/${encodeURIComponent(inputText)}`);
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      setChatHistory([...chatHistory, { message: inputText, response: data.response.response }]);
      setInputText('');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <Typography variant="h5" gutterBottom>
        Chat Component
      </Typography>
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
      {chatHistory.map((chat, index) => (
        <div key={index} style={{ marginTop: '20px' }}>
          <Typography variant="body1">
            Tú: {chat.message}
          </Typography>
          <Typography variant="body1">
            Respuesta: {chat.response}
          </Typography>
        </div>
      ))}
    </Paper>
  );
};

export default ChatComponent;
