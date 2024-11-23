## [Overview](#)

In this step we set up React Querying to allow for 'live reload' when interacting with assets on page through the chat window. 


## Steps:

**1. Confirm React Query is working**: run `npm install && npm run seed && npm run dev` to update the app. Login at localhost:5573. Go to shopping list page. Type in the chat 'add spaghetti bolognese to my shopping list' You should see the ingredients from that recipe appear in your shopping list without refreshing the page. (You'll be able to type in 'clear my list' and it'll clear it as well.)

## Features Added:

- **React Query for Autoreload**: This allows the message reply look like it's typing back a response

## Notes:
- Array(9) in Zustand store to set 9 spots for endpoints.
- Look at React Query Client in main.jsx
- You won't be able to edit an item in the shopping list as we do not have an endpoint set up for that. 
- Check out the custom hook `hooks/useInvalidateQueries.js` && `config/queryRefetchConfig.js` used to reset caches
- Recipes page uses some logic to highlight what has changed on the screen. 
