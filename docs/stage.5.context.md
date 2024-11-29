# [Context - Make Your Bot Feel Smarter (5 min video)](https://drive.google.com/file/d/1NlEGGpk6rMqHkkka-hyPYp_EhBH_ffJ4/view?usp=sharing)

## Steps:

**1. Update Seeds and Start**

```bash
npm run seed && npm run dev
```

**2. Validate Context is Working**: Go to recipes, click on a recipe to view the `/recipes/:id` page. Type in 'what is this recipe' to see how context helps steer the conversation.

## Features Added:

- **Front End Pages with Recipes**: Add the `/recipes/:id` pages to the front end
- **Added seed data**: Added more recipes to start with. Run `npm run seed` to generate
- **Using NLAPI Context to make bot smarter**: You know things your user may not. For example, if they are looking at the Tomato Soup recipe, you know the id, the user likely does not.

## Notes:

- Using global storage to send context
- Context is an array of strings
- Common context: Current time, what the user is looking at, the user id, etc.
- Context gets injected into conversation thread at inference time.

## Demo

This demo shows that a user can now use 'this recipe' when referring to something on screen. It shows that when on the `/recipes/:id` page, the NLAPI knows what recipe the user is looking at, but when on the all recipes page, the NLAPI doesn't know what 'this recipe' means.

[demo-context.webm](https://github.com/user-attachments/assets/46b5e018-80a4-4b02-8606-70c177bb86c6)
