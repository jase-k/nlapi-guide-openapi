import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';
import useBotContextStore from '../store/botContextStore';

const fetchRecipeById = async (id) => {
  const response = await fetch(`/api/recipes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe');
  }
  const data = await response.json();
  return data;
};

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const {
    data: recipe,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
  });

  const addContext = useBotContextStore((state) => state.addContext);
  const removeContext = useBotContextStore((state) => state.removeContext);

  useEffect(() => {
    const contextString = `user is looking at recipe with id: ${id}`;
    addContext(contextString);

    return () => {
      removeContext(contextString);
    };
  }, [id, addContext, removeContext]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading recipe</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          {recipe.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Description:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {recipe.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Ingredients:
        </Typography>
        <ul>
          {recipe.recipeIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.ingredient.name}</li>
          ))}
        </ul>
        <Typography variant="h6" gutterBottom>
          Instructions:
        </Typography>
        <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
      </Box>
    </Container>
  );
};

export default RecipeDetailsPage;
