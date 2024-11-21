## Overview

In this step we will add streaming capabilities from the NLAPI as well as more functionality to the app by adding recipes, ingredients and a family shopping list. 


## Steps:

**1. Run npm run update-schema**: to make sure you application has the most updated schema (this will be updated automatically everytime you push to one of the branches in the `.github/workflows/update-schema.yml` file)

**2. Test out streamming UI**: Login at localhost:5573, then ask 'What recipes are available?' and watch the reply.

**3. Try adding a new recipe**: Use the chat to add a new recipe. Go to localhost:5573/recipes to see the new recipe. 

## Features Added:

- **Streaming Messages**: This allows the message reply look like it's typing back a response
- **Added Endpoints**: Giving the api more functionality by adding recipes, ingredients, and shopping list
If visualizing is helpful. 
![Database ERD](./assets/erd.png.png)

## Notes:
- Scroll to bottom Behavior explanation (Comment out `<div ref={messagesEndRef} />` in ChatBubble.jsx and ask the bot a few follow up questions to understand why it's important)
- Displays status messages, you can map responses if needed. 
- Note Recipe Ingredient Unique Constraint Error Message. 
- Note: Current limitation to the Shopping list is that you can only add ingredients from a recipeIngredient
- TODO: Add UI and Shopping Items (fix create return)

## Common Errors: