export const queryRefetchConfig = {
  recipes: [
    {
      endpoints: ['/api/recipes'],
      methods: ['POST'],
    },
    {
      endpoints: ['/api/recipes/*'],
      methods: ['PUT', 'DELETE'],
    },
    {
      endpoints: ['/api/recipe-ingredients'],
      methods: ['POST'],
    },
    {
      endpoints: ['/api/recipe-ingredients/*'],
      methods: ['DELETE'],
    },
  ],
  'shopping-list': [
    {
      endpoints: ['/api/shopping-list'],
      methods: ['POST', 'DELETE'],
    },
  ],
  // Add more mappings as needed
};
