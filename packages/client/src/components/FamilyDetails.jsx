import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const FamilyDetails = () => {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    fetch('/api/families')
      .then((response) => response.json())
      .then((data) => setFamilies(data))
      .catch((error) => console.error('Error fetching families:', error));
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h5" align="center" gutterBottom>
          Family Details
        </Typography>
        <List>
          {families.map((family) => (
            <ListItem key={family.id}>
              <Box textAlign="center" width="100%">
                <ListItemText primary={family.name} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default FamilyDetails;
