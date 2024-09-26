# React + TypeScript + Vite

Course Subscription Application

This is a prototype of a Course Subscription Application built using React and TypeScript for the frontend, and Node.js with Express for the backend. The backend is connected to ServiceNow, from which it fetches course and user data. The app allows learners to view available courses and subscribe to them, using either a traditional button or drag-and-drop functionality.

Features

Fetching Courses from ServiceNow: 
1. The application fetches and displays a list of available courses from a ServiceNow database.
2. User Information: The application retrieves and displays the user's name from the ServiceNow database.
3. Subscription Basket: Users can add courses to a subscription basket by clicking the "Subscribe" button or using 4. drag-and-drop functionality. Drag-and-Drop: Courses can be dragged into a subscription area, though they are not yet persisted in the basket.

Tech Stack

Frontend: React, TypeScript, Vite
Backend: Node.js, Express
Database: ServiceNow (custom tables for courses, users, and subscriptions)
Installation and Setup

Prerequisites
Ensure that you have the following installed:

Node.js (v12 or higher)
Yarn (v1.22 or higher)
Steps to Install and Run the Application

Clone the repository:
git clone https://github.com/S-Morozov/CourseSubscriptionsTask.git

cd your-repository-folder

Install Frontend Dependencies:

The project uses Vite as a development server.

yarn

Install Backend Dependencies:
The backend is built using Node.js and Express. Navigate to the backend directory if it's separate, or run the command in the root project directory:
yarn add express

Running the Frontend (React with Vite):

yarn dev

This will start the Vite development server on the default port (usually http://localhost:5173).
Running the Backend (Node.js with Express): Navigate to the src/server.js directory and run the following command in a separate terminal:

node src/server.js

This will start the backend server on a separate port to handle ServiceNow API requests and to avoid CORS errors.
Simultaneous Execution: The application requires both frontend and backend servers to be running concurrently:

Frontend (Vite): http://localhost:5173
Backend (Express): Ensure it's running on the correct port as specified in your server.js file (e.g., http://localhost:3000).

Usage

Open the application in your browser by navigating to the frontend address (e.g., http://localhost:5173).
You will see a list of courses fetched from the ServiceNow database.
Your username will be displayed at the top, fetched from the ServiceNow user table.
You can subscribe to a course by either:
Clicking the "Subscribe" button.
Dragging the course card into the subscription basket.
The courses you select will appear in the subscription basket, and message succefully subscribed.

Notes

The backend has been implemented using Node.js and Express to handle CORS issues during development. This allows for smoother communication between the frontend and the ServiceNow API.


Future Improvements

Implement full integration with the ServiceNow API for saving course subscriptions.
Improve the drag-and-drop functionality to allow courses to persist in the subscription basket.
Add unit and integration tests for both the frontend and backend.
Contributing

If you'd like to contribute, feel free to fork the repository and submit pull requests. Contributions are always welcome!

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```



<img width="554" alt="Screenshot 2024-09-26 at 14 24 21" src="https://github.com/user-attachments/assets/3a03ece5-e7cb-4522-8ae6-c9381d0f3832">

<img width="1440" alt="Screenshot 2024-09-26 at 14 36 39" src="https://github.com/user-attachments/assets/a39985c3-ed6a-47b5-850d-87309d09b759">


<img width="1440" alt="Screenshot 2024-09-26 at 14 36 57" src="https://github.com/user-attachments/assets/9c68ff5e-e40d-4b9d-a96a-dad57a1897c3">


