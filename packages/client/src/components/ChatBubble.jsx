import { useState, useEffect, useRef, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import {
  Fab,
  Paper,
  TextField,
  IconButton,
  Typography,
  Grow,
  Button,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { EventSourceParserStream } from 'eventsource-parser/stream';
import useEndpointStore from '../store/endpointStore';

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
  const { setEndpoints } = useEndpointStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, statusMessage]);

  const handleSubmit = useCallback(
    (e) => {
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
          const response = await handleSendingMessage(body);

          let thread_id;
          let latestEndpoints;
          if (isStreaming) {
            const reader = response.body
              ?.pipeThrough(new TextDecoderStream())
              ?.pipeThrough(new EventSourceParserStream());
            [thread_id, latestEndpoints] = await handleStreamingEvents(reader);
          } else {
            const data = await response.json();
            console.log('Non-Streaming Response from NLAPI:', data);
            setMessages(data.messages.reverse());
            thread_id = data.thread_id;
            latestEndpoints = data.endpoints_called.map((endpoint) => ({
              path: endpoint['path'],
              method: endpoint['method'],
            }));
          }
          // Set the thread id to the thread id from the response regardless of streaming or not
          setThreadId(thread_id);
          setEndpoints(latestEndpoints);
        } catch (error) {
          console.error('Error sending message to NLAPI:', error);
        }
      };

      sendMessage();
    },
    [message, isStreaming, threadId, setEndpoints]
  );

  const handleSendingMessage = async (body) => {
      const response = await fetch('/api/nlapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error('Response from NLAPI:', response);
      alert('Failed to send message');
    }
    return response;
  };

  const handleStreamingEvents = async (reader) => {
    let lastMessage = '';
    let lastChunkEvent = 'start';
    let threadId;

    const updateMessages = (content, isNewMessage) => {
      setMessages((prevMessages) => {
        const updatedMessages = isNewMessage
          ? [...prevMessages, { content, speaker: 'assistant' }]
          : [...prevMessages.slice(0, -1), { content, speaker: 'assistant' }];
        return updatedMessages;
      });
    };

    let latestEndpoints;
    for await (const chunk of reader) {
      const { event, data } = chunk;
      const chunkEventData = JSON.parse(data);
      console.log('Chunk Event Data:', chunkEventData);

      if (event === 'status_message') {
        setStatusMessage(chunkEventData.content);
      } else {
        setStatusMessage('');
      }

      if (event === 'message_chunk') {
        lastMessage += chunkEventData.content;
        updateMessages(lastMessage, lastChunkEvent !== 'message_chunk');
      } else if (event === 'close') {
        threadId = chunkEventData.thread_id;
        latestEndpoints = chunkEventData.endpoints_called.map((endpoint) => ({
          path: endpoint['path'],
          method: endpoint['method'],
        }));
      } else if (event === 'error') {
        console.error('Error from NLAPI:', chunkEventData);
      }

      lastChunkEvent = event;
    }

    return [threadId, latestEndpoints];
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
