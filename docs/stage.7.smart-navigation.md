# [Integrate with Slack!]()

## Steps:

**1. Start the server**:  Run `npm run dev` and navigate to localhost:5573. 

**2. Test Smart Navigation**: From the dashboard, type in the chat bubble -> "Create a new recipe [your recipe name here]" -> Click on the suggested "View recipe details" button underneath the input field. You should be redirected to the new recipe page. From there if you ask for a list of all recipes, you should see the 'View all Recipes' button in the navigation section. 

**3. Dream Big**: What else can we do with the NLAPI? Send any novel ideas to jase@jasekraft.com to get extra NLAPI credits in your account. 


## Features Added:

- **Smart Navigation**: We added a button underneath the input field in the chat bubble component that suggests a place for the user to navigate to based on the latest endpoints returned. For example, if the user creates a new recipe, the button underneath the input field would suggest navigating to the recipes/:id page of the new recipe. 


## Notes:
- See navigationConfig.js for details on how this is implemented. 
- For dynamic routes we use $$[field] as a placeholder, so we can replace based on the response from the endpoint. (i.e. recipes/$$id)
- See ChatBubble.jsx for how this is used in the UI. 

## Potential For More

If there is enough interest in expanding on smart navigation, we could also ingest the frontend schema to understand what pages are available to the user and send back suggested list of pages to navigate to. This would be another key similar to the `endpoints` key in the current NLAPI response. We'd like return a list of paths + descriptions to help the user navigate the application, but are open to feedback on how best to structure this response. 

## Demo Video

Coming Soon.

