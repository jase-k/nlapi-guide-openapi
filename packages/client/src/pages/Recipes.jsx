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
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const fetchRecipes = async (offset = 0, limit = 10) => {
  const response = await fetch(`/api/recipes?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data = await response.json();
  return data;
};

const RecipesPage = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10; // Number of recipes per page

  const {
    data: { recipes = [], totalItems = 0 } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ['recipes', offset],
    queryFn: () => fetchRecipes(offset, limit),
  });

  const [highlightedSections, setHighlightedSections] = useState({});
  const prevRecipesRef = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    const prevRecipes = prevRecipesRef.current;
    const newHighlightedSections = {};

    recipes.forEach((recipe, index) => {
      const prevRecipe = prevRecipes[index];
      if (prevRecipe) {
        if (recipe.recipeIngredients !== prevRecipe.recipeIngredients) {
          newHighlightedSections[recipe.id] = {
            ...newHighlightedSections[recipe.id],
            ingredients: true,
          };
        }
        if (recipe.instructions !== prevRecipe.instructions) {
          newHighlightedSections[recipe.id] = {
            ...newHighlightedSections[recipe.id],
            instructions: true,
          };
        }
      }
    });

    if (Object.keys(newHighlightedSections).length > 0) {
      setHighlightedSections((prev) => ({
        ...prev,
        ...newHighlightedSections,
      }));
      const timer = setTimeout(() => {
        setHighlightedSections({});
      }, 2000); // Remove highlight after 2 seconds
      return () => clearTimeout(timer);
    }

    prevRecipesRef.current = recipes;
  }, [recipes]);

  const handleNextPage = () => {
    if (offset + limit < totalItems) {
      setOffset(offset + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  if (isLoading) return <Typography component="div">Loading...</Typography>;
  if (error)
    return <Typography component="div">Error loading recipes</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h4" component="div" gutterBottom>
          All Recipes
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <button onClick={handlePreviousPage} disabled={offset === 0}>
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={offset + limit >= totalItems}
          >
            Next
          </button>
        </Box>
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
                transition: 'background-color 0.5s ease',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="h6" component="div">
                    {recipe.title}
                  </Typography>
                }
                secondary={
                  <Box component="div">
                    <Typography
                      component="div"
                      variant="body2"
                      color="textPrimary"
                    >
                      {recipe.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                      <Box
                        flex={1}
                        mr={2}
                        sx={{
                          backgroundColor: highlightedSections[recipe.id]
                            ?.ingredients
                            ? '#f0f8ff'
                            : 'inherit',
                          transition: 'background-color 0.5s ease',
                          padding: '8px',
                          borderRadius: '4px',
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          gutterBottom
                        >
                          Ingredients:
                        </Typography>
                        <ul>
                          {recipe.recipeIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.ingredient.name}</li>
                          ))}
                        </ul>
                      </Box>
                      <Box
                        flex={1}
                        ml={2}
                        sx={{
                          backgroundColor: highlightedSections[recipe.id]
                            ?.instructions
                            ? '#f0f8ff'
                            : 'inherit',
                          transition: 'background-color 0.5s ease',
                          padding: '8px',
                          borderRadius: '4px',
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          gutterBottom
                        >
                          Instructions:
                        </Typography>
                        <ReactMarkdown
                          components={{
                            p: ({ ...props }) => <div {...props} />,
                          }}
                        >
                          {recipe.instructions}
                        </ReactMarkdown>
                      </Box>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <button onClick={handlePreviousPage} disabled={offset === 0}>
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={offset + limit >= totalItems}
          >
            Next
          </button>
        </Box>
      </Box>
    </Container>
  );
};

export default RecipesPage;
