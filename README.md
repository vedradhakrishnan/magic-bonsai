# **🌱 MagicBonsai**  
 
 ## **Overview**  
 MagicBonsai is a web application that helps users break down large projects into manageable subtasks using a visual bonsai tree. Each task represents a branch, and as users complete tasks, their tree grows dynamically. The application leverages **Express.js, MongoDB, Next.js (ShadCN UI), and Three.js** to provide an engaging way to manage productivity.
 
 ---
 
 ## **Data Model**  
 
 ### **Entities & Relationships**  
 - A **Garden** has multiple **trees**.  
 - **Each tree** has **one task** assigned to it.  
 
 ### **Sample Documents**  
 ## **[Tree and Garden Schemas](server/db.js)**  
 
 ---
 
 ## **Wireframes**  
 Located in the **/documentation** folder.  
 
 ### **Single Task Page**  
 ![task page](documentation/task.jpg)
 
 ### **Task Creation Form**  
 ![task form](documentation/task-form.png)
 
 ### **User Task Garden**  
 ![garden](documentation/garden.jpg)
 
 ---
 
 ## **Site Map**  
 ```
 Dashboard → Task Page → Task Completion
           → Task Creation → Garden
 ```
 
 ---
 
 ## **User Stories**
 As a frantic student, I can break down my final coding project into smaller tasks, so that I can manage my workload efficiently.
 
 As a financial newb, I can create a step-by-step investment plan, so that I can good build financial habits.
 
 As someone who wants run a marathon, I can break down my training plan into milestones, so that I can stay motivated.
 
 ---
 
 # Research Topics for MagicBonsai
 
 ## 1. Frontend Framework: React + ShadCN
 ### What is it?
 React is a popular library for UI, and ShadCN is a component library that accelerates UI development customizable components.
 
 ### Why use it?
 Using React allows for a dynamic and interactive frontend experience, while ShadCN provides a pre-styled component system that speeds up development. This combination ensures a visually appealing and intuitive UI.
 
 ### Possible Solutions:
 - **React.js** for core UI
 - **ShadCN UI** for UI components
 - **Next.js** for SSR.
 
 
 ---
 
 ## 3. Unit Testing with Jest
 ### What is it?
 Jest is a testing framework for JavaScript that allows devs to write unit tests.
 
 ### Why use it?
 By implementing unit tests, we ensure that core features work as expected. This increases the stability of the application and prevents bottlenecks during development.
 
 ### Possible Solutions:
 - **Jest** for unit testing
 
 ---
 
 ## 3. Web3 User Authentication with OnChainKit
 ### What is it?
**OnChainKit** is a toolkit that streamlines wallet-based authentication for Web3 applications. It leverages blockchain wallets (like **Coinbase Wallet**) to authenticate users. It comes with pre-built components for connecting wallets, displaying identity information (avatar, name, and address), and handling wallet sessions.
 
### Why use it?
- **Seamless Web3 Integration:** Easily add wallet connectivity, and allow for future integration with onchain storage and ownership.
- **Simplified Authentication Flow:** Once a user connects their wallet, the app automatically stores the address to the session via the `/connect` endpoint.

 
 ---
 
 ## 4. Interactive Tree Visualization with Three.js
 ### What is it?
 Three.js is a JavaScript library for 3D visualizations.
 
 ### Why use it?
 Since MagicBonsai is focused on gamified task management, the bonsai tree should visually change as users complete tasks. Three.js enables this for a more immersive experience.
 
 ### Possible Solutions:
 - **Three.js** for 3D tree rendering
 
 ---
 
 ## **[Link to Initial Main Project File](server/index.js)**  
 
 ---
 
 ## **Annotations / References Used**  
 1. [Express.js Documentation](https://expressjs.com/)  
 2. [Mongoose Guide](https://mongoosejs.com/docs/)  
 3. [ShadCN Documentation](https://ui.shadcn.com/)  