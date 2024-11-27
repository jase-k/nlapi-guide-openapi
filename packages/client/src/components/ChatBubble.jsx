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
import ReactMarkdown from 'react-markdown';

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: '90%', // Default width for smaller screens
  height: '60vh',
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
  fontSize: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const MessageBubble = styled('div')(({ theme, isSender }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(2),
  backgroundColor: isSender
    ? theme.palette.primary.main
    : theme.palette.grey[300],
  color: isSender
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  alignSelf: isSender ? 'flex-end' : 'flex-start',
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
        const response = await fetch('/api/nlapi', {
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
            bottom: 36,
            right: 36,
            height: 80,
            width: 80,
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
              <MessageBubble key={index} isSender={msg.speaker === 'human'}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </MessageBubble>
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
