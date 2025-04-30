# Milestone 04 - Final Project Documentation

## NetID
var9026

## Name
Ved Radhakrishnan

## Repository Link
[final-project-deployment-vedradhakrishnan Repository](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-vedradhakrishnan/tree/master)

## URL for form 1
[new-tree page](https://verbose-giggle-v74v7jxx6453665-3000.app.github.dev/new-tree)

## Special Instructions for Using Form 1
When redirected to connect, you can create a wallet with the Sign Up or Coinbase Wallet option, then create an account and use a passkey called whatever you want. You should automatically be redirected to the dashboard, then you can press the black button to go to the form. There you can input a task + description. It will take a bit to generate, then redirect you to that task's page. You can go back to `/dashboard` to see the change reflected in the database.

## URL for form 2
[dashboard](https://verbose-giggle-v74v7jxx6453665-3000.app.github.dev/dashboard)

## Special Instructions for Using Form 2
After a task tree is generated, you will be redirected to that task's page (Also accesible by clicking one of the cards on `/dashboard`). On this page, you can unravel different subtasks within the tree page by clicking on the nodes, and you can select the checkboxes to mark certain tasks as complete. To submit the second form, press the **Save Changes and Exit** button, which will allow changes to the completion state of the task tree to be persistent.

## URL for form 3
[dashboard](https://verbose-giggle-v74v7jxx6453665-3000.app.github.dev/dashboard)

## Special Instructions for Using Form 3
After a task tree is generated, you will be redirected to that task's page (Also accesible by clicking one of the cards on `/dashboard`). On this page, you can unravel different subtasks within the tree page by clicking on the nodes, and you can delete the tree if needed. To submit the third form, press the **Shovel** button, which will delete the tree from the tree database and clear its spot in the garden database.


## First link to github line number(s) for constructor, HOF, etc.
[src/pages/dashboard.js at line 34 - Use of Array.map](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-vedradhakrishnan/blob/master/src/pages/dashboard.js#L46)

## First link to github line number(s) for constructor, HOF, etc.
[src/pages/task.js at line 80 - Use of Array.map](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-vedradhakrishnan/blob/master/src/pages/task.js#L80)

## Short description for links above
- I needed to map the list of tasks for a user (in the schema format) to page elements to display
- I needed to map the editable structure of the tree back to the schema format to update the tree database

## Link to github line number(s) for schemas (db.js or models folder)
[server/db.js](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-vedradhakrishnan/blob/master/server/db.js)

## Description of research topics below with points
 
 # Research Topics for MagicBonsai
 
 ## 1. Frontend Framework: NextJS + React + ShadCN
 React is a popular library for UI, and ShadCN is a component library that accelerates UI development customizable components. Next JS allows for devs to basically do frontend and backend at the same time, although for this project I just used it as a replacement for handlebars
 
 ### Solutions Used:
 - **React.js** for core UI
 - **ShadCN UI** for UI components
 - **Next.js** for SSR.
 
 ---

 ## 2. Interactive Tree Visualization with Three.js
 ### What is it?
 Three.js is a JavaScript library for 3D visualizations. I use **Three.js** for 3D tree rendering on the task page, and in future iteratis I will create a garden page which will display the tree models in a grid.s

  ### Solutions Used:
 - **Three.js** 3D rendering

---
 
 ## 3. Web3 User Authentication with OnChainKit
 ### What is it?
**OnChainKit** is a toolkit that streamlines wallet-based authentication for Web3 applications. It leverages blockchain wallets (like **Coinbase Wallet**) to authenticate users. It comes with pre-built components for connecting wallets, displaying identity information (avatar, name, and address), and handling wallet sessions.
 
### Solutions Used:
- **OnchainKit** For Web3 wallet auth.

---

 4. OpenAI API
 ### What is it?
**OpenAI API** allows you to access the GPT models in your backend, and I use this to convert user input in human readable format to JSON that can be parsed and used in my app.
 
### Solutions Used:
- **OpenAI** For Tree Generation


 
## URL to github that shows line of code where research topic(s) are used / implemented

[src/pages/task.js at line 173 - Use of Three.js](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-vedradhakrishnan/blob/master/src/pages/task.js#L173)

[src/pages/connect.js at line 34 - Use of Coinbase OnChainKit](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-vedradhakrishnan/blob/master/src/pages/connect.js#L34)

[server/services.js at line 22 - Use of OpenAI API](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-vedradhakrishnan/blob/master/server/services.js#L22)