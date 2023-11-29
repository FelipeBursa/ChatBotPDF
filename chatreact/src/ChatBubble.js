import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ChatBubble = ({ message, isUser }) => {
  const bubbleStyle = {
    padding: '10px',
    marginBottom: '10px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    alignSelf: isUser ? 'flex-start' : 'flex-end',
    background: isUser ? '#d3d3d3' : '#4caf50',
    borderRadius: '10px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-start' : 'flex-end' }}>
      <Paper elevation={3} style={bubbleStyle}>
        <Typography variant="body1" style={{ color: isUser ? 'black' : 'white' }}>
          {message}
        </Typography>
      </Paper>
    </div>
  );
};

export default ChatBubble;
