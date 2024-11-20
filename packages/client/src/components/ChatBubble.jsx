import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import {
  Fab,
  Paper,
  TextField,
  IconButton,
  Typography,
  Grow,
  Button
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { EventSourceParserStream } from 'eventsource-parser/stream';

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

const StatusMessage = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  alignSelf: 'left',
  fontStyle: 'italic',
  '&::after': {
    content: '"..."',
    animation: 'ellipsis 1s infinite',
  },
  '@keyframes ellipsis': {
    '0%': { content: '"."' },
    '33%': { content: '".."' },
    '66%': { content: '"..."' },
    '100%': { content: '"."' },
  },
}));

export default function Component() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      content: message,
      speaker: 'human',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');

    const sendMessage = async () => {
      let body = {
        userInput: message,
        threadId: threadId,
        options: {
          stream: isStreaming,
        },
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
        
        let thread_id;
        if (isStreaming) {
          const reader = response.body?.pipeThrough(new TextDecoderStream())?.pipeThrough(new EventSourceParserStream());
          let last_message = '';
          let last_chunk_event = 'start';
          for await (const chunk of reader) {
            const chunk_event_data = JSON.parse(chunk.data);
            console.log('Chunk Event Data:', chunk_event_data);
            if (chunk.event === "status_message") {
              // Note if you wanted to customize the status message you could use a switch statement or mapping logichere to transform the status message. 
              setStatusMessage(chunk_event_data.content);
            } else {
              setStatusMessage('');
            }

            if (chunk.event === "message_chunk") {
              last_message += chunk_event_data.content;
              if (last_chunk_event !== 'message_chunk') {
                setMessages((prevMessages) => [...prevMessages, {content: last_message, speaker: 'assistant'}]);
              } else {
                setMessages((prevMessages) => [...prevMessages.slice(0, -1), {content: last_message, speaker: 'assistant'}]);
              }
            } else if (chunk.event === "close") {
              thread_id = chunk_event_data.thread_id;
            }
            last_chunk_event = chunk.event;
          }
        } else {
          const data = await response.json();
          console.log('Response from NLAPI:', data);
          setMessages(data.messages.reverse());
          thread_id = data.thread_id;
        }
        // Set the thread id to the thread id from the response regardless of streaming or not
        setThreadId(thread_id);
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
            {/* Note: In a non-demo application you would likelynot want to have this button in the UI. This is just for testing purposes */}
            <Button
              variant="contained"
              onClick={() => setIsStreaming(!isStreaming)}
              style={{
                backgroundColor: isStreaming ? 'green' : 'gray',
                color: 'white',
              }}
            >
              {isStreaming ? 'Stream On' : 'Stream Off'}
            </Button>
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
            {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
            <div ref={messagesEndRef} />
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
