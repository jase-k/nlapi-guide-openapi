// src/pages/DashboardPage.js
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CompanyDetails from '../components/FamilyDetails';
import UserDetails from '../components/UserDetails';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: theme.spacing(4),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    alignSelf: 'center',
  },
}));

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic (e.g., clear session storage, redirect to login)
    navigate('/login');
  };

  const handleNavigateToRecipes = () => {
    navigate('/recipes');
  };

  const handleNavigateToShoppingList = () => {
    navigate('/shoppinglist');
  };

  const classes = useStyles();

  const slackSuccess = new URLSearchParams(window.location.search).get(
    'slackSuccess'
  );
  if (slackSuccess === 'false') {
    alert('Uh oh! Failed to connect to Slack');
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (slackSuccess === 'true') {
    alert('Yay!Successfully connected to Slack');
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Box mt={8}>
          <Box mb={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigateToRecipes}
              style={{ marginLeft: '10px' }}
            >
              Recipes
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigateToShoppingList}
              style={{ marginLeft: '10px' }}
            >
              Shopping List
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              style={{ marginLeft: '10px' }}
            >
              Logout
            </Button>
          </Box>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to the Dashboard!
          </Typography>
          <CompanyDetails />
          <UserDetails />
        </Box>
      </Container>
    </>
  );
};

export default DashboardPage;
