export const navigationConfig = {
  recipes: {
    endpoints: [
      {
        pattern: '/api/recipes',
        methods: ['GET'],
        route: '/recipes',
        description: 'View all recipes'
      },
      {
        pattern: '/api/recipes/*',
        methods: ['PUT', 'GET'],
        route: '/recipes/:id',
        description: 'View recipe details'
      },
      {
        pattern: '/api/recipes',
        methods: ['POST'],
        route: '/recipes/:id',
        description: 'View new recipe details'
      },
      {
        pattern: '/api/recipe-ingredients',
        methods: ['POST'],
        route: '/recipes/:recipeId',
        description: 'View recipe details'
      }
    ]
  },
  'shopping-list': {
    endpoints: [
      {
        pattern: '/api/shopping-list',
        methods: ['POST', 'GET', 'DELETE'],
        route: '/shoppinglist',
        description: 'View shopping list'
      }
    ]
  }
};

export const getNavigationSuggestions = (endpoints) => {
  const suggestions = [];
  
  // Ensure endpoints is an array and has items
  if (!Array.isArray(endpoints) || endpoints.length === 0) {
    return suggestions;
  }
  
  endpoints.forEach(endpoint => {
    // Skip if endpoint is null or doesn't have required properties
    if (!endpoint?.path || !endpoint?.method) return;
    
    Object.values(navigationConfig).forEach((config) => {
      config.endpoints.forEach(({ pattern, methods, route, description }) => {
        const regex = new RegExp(`^${pattern.replace('*', '(\\d+)')}$`);
        const match = endpoint.path.match(regex);
        
        if (match && methods.includes(endpoint.method.toUpperCase())) {
          // Function to replace placeholders in the route
          const responseData = JSON.parse(endpoint.response.response);
          console.log('endpoint.response', responseData);
          
          const replacePlaceholders = (route, responseData) => {
            return route.replace(/:([a-zA-Z0-9_.]+)/g, (_, path) => {
              console.log('path', path);
              // Split the path by '.' to navigate through the response object
              return path.split('.').reduce((acc, key) => acc[key], responseData);
            });
          };

          // Parse the response JSON string

          // Replace placeholders in the route with values from the response
          const actualRoute = replacePlaceholders(route, responseData);

          // Add the suggestion with the constructed route
          suggestions.push({
            route: actualRoute,
            description
          });
        }
      });
    });
  });
  
  // Remove duplicates
  return [...new Map(suggestions.map(item => [item.route, item])).values()];
}; 