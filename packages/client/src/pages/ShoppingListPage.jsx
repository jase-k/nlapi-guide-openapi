import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchShoppingListItems = async () => {
  try {
    const response = await fetch('/api/shopping-list', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Assuming token is stored in localStorage
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch shopping list items:', error);
  }
};

const ShoppingListPage = () => {
  const {
    data: shoppingListItems,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['shopping-list'],
    queryFn: () => fetchShoppingListItems(),
  });
  const queryClient = useQueryClient();

  const handleDeleteAll = async () => {
    try {
      const response = await fetch('/api/shopping-list', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['shopping-list'] });
      } else {
        console.error('Failed to delete shopping list items');
      }
    } catch (error) {
      console.error('Error deleting shopping list items:', error);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading shopping list</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Shopping List
        </Typography>
        <List>
          {shoppingListItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.recipeIngredient.ingredient.name} (${item.recipeIngredient.quantity} ${item.recipeIngredient.unitOfMeasure})`}
                secondary={`Recipe: ${item.recipeIngredient.recipe.title}`}
              />
            </ListItem>
          ))}
        </List>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteAll}
          >
            Delete All Items
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ShoppingListPage;
