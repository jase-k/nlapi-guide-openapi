import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';

const fetchRecipes = async () => {
  const response = await fetch('/api/recipes');
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data = await response.json();
  return data.recipes;
};

const RecipesPage = () => {
  const {
    data: recipes = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading recipes</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          All Recipes
        </Typography>
        <List>
          {recipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              alignItems="flex-start"
              sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '16px',
                padding: '16px',
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" component="span">
                    {recipe.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {recipe.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                      <Box flex={1} mr={2}>
                        <Typography variant="subtitle1" gutterBottom>
                          Ingredients:
                        </Typography>
                        <ul>
                          {recipe.recipeIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.ingredient.name}</li>
                          ))}
                        </ul>
                      </Box>
                      <Box flex={1} ml={2}>
                        <Typography variant="subtitle1" gutterBottom>
                          Instructions:
                        </Typography>
                        <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
                      </Box>
                    </Box>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default RecipesPage;
