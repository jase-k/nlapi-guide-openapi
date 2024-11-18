// src/pages/DashboardPage.js
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CompanyDetails from '../components/FamilyDetails';
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

  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Box mt={8}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to the Dashboard!
          </Typography>
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
          <CompanyDetails />
        </Box>
      </Container>
    </>
  );
};

export default DashboardPage;
