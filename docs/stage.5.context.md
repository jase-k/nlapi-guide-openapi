# [Context - Make your Bot Feel Smarter]()

## Steps:

**1. Update Seeds and Start**: `npm run seed && npm run dev`
**2. Validate Context is Working**: Go to recipes, Click on a Recipe to view the /recipe/:id page. Type in 'what is this recipe' to see how context helps steer the conversation

## Features Added:

- **Front End Pages with Recipes**: Add the /recipe/:id pages to the front end
- **Added seed data**: Added more recipes to start with run `npm run seed` to generate
- **Using NLAPI Context to make bot smarter**: You know things your user may not. I.e. if they are looking at the Tomato Soup Recipe, you know the id, the user likely does not.

## Notes:
-  Using global storage to send context
- Context is an array of strings
- Common context: Current time, what the user is looking at, the user id, and more.
- Context gets injected into conversation thread at inference time.