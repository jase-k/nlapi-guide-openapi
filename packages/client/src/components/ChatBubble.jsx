import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Fab,
  Paper,
  TextField,
  IconButton,
  Typography,
  Grow,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: 420,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const ChatHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ChatMessages = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

const ChatInput = styled('form')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export default function Component() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      content: message,
      speaker: 'human',
      created_at: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');

    const sendMessage = async () => {
      let body = {
        userInput: message,
        threadId: threadId,
      };
      try {
        const response = await fetch('http://localhost:3303/api/nlapi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          console.log('Response from NLAPI:', response);
          throw new Error('Failed to send message to NLAPI');
        }
        const data = await response.json();
        console.log('Response from NLAPI:', data);

        setMessages(data.messages.reverse());
        setThreadId(data.thread_id);
      } catch (error) {
        console.error('Error sending message to NLAPI:', error);
      }
    };

    sendMessage();
  };

  return (
    <>
      <Grow in={!isExpanded}>
        <Fab
          color="primary"
          aria-label="chat"
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={() => setIsExpanded(true)}
        >
          <ChatIcon />
        </Fab>
      </Grow>

      <Grow in={isExpanded} style={{ transformOrigin: '0 0 0' }}>
        <ChatContainer>
          <ChatHeader>
            <Typography variant="h6">Chat</Typography>
            <IconButton
              onClick={() => {
                setMessages([]);
                setThreadId(null);
              }}
            >
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={() => setIsExpanded(false)}>
              <CloseIcon />
            </IconButton>
          </ChatHeader>
          <ChatMessages>
            {messages.map((msg, index) => (
              <div key={index}>
                <Typography
                  variant="body2"
                  color={
                    msg.speaker === 'bot' ? 'textSecondary' : 'textPrimary'
                  }
                >
                  {msg.speaker}: {msg.content}
                </Typography>
              </div>
            ))}
          </ChatMessages>
          <ChatInput onSubmit={handleSubmit}>
            <TextField
              label="Type your message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <IconButton type="submit" color="primary">
              <SendIcon />
            </IconButton>
          </ChatInput>
        </ChatContainer>
      </Grow>
    </>
  );
}
