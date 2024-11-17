// src/pages/LoginPage.js
import { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: theme.spacing(4),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/session/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login successful:', data);
        if (data.token) {
          localStorage.setItem('accessToken', data.token);
          navigate('/dashboard');
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Invalid email or password');
      });
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box mt={8}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className={classes.title}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
            >
              Login
            </Button>
          </Box>
        </form>
        <Box mt={2} display="flex" justifyContent="center">
          <Typography>
            Don’t have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              className={classes.link}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
