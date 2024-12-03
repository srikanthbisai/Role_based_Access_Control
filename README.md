The backend is deployed on Render.com which might take a little time to serve responses as it gets shut down when not hit constantly.
Backend Repo is located at (https://github.com/srikanthbisai/json_server_render)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


```bash
# This is a bash block
echo "Hello, GitHub!"
npm install
npm start
```




Role-Based Access Control (RBAC) Project
This project implements a Role-Based Access Control (RBAC) system with a responsive user interface, enabling user and role management with efficient CRUD operations. It showcases modern web development practices using React and TypeScript with Material-UI components for a polished and professional UI/UX.

🛠️ Features
      Frontend
          Built With: React + TypeScript for type-safe development.
          UI/UX:
          Material-UI components for dialogs, grids, and responsiveness.
          Slider animations for toggling user active status.
              Feedback and Validation:
                 Toast notifications for success/error messages using react-toastify.
                 Regex-based email validation.

  Optimization Approaches:
                 Code splitting and custom hooks for modularity.
                 Centralized error handling using try-catch.
                 Search & Filter:
                 Search users by name with optimized filtering logic.

  Responsive Design:
                 Fully mobile-friendly layout.



Backend
     Mock JSON Server:
     Provides backend functionality for CRUD operations.
     Deployed on Render.com. Note: The server may take up to 30 seconds to start if idle.
 
 Backend Repository

🚀 Getting Started
Prerequisites
Ensure you have the following installed on your system:

Node.js (v16+ recommended)
npm or yarn
Installation
Clone this repository:

```bash
git clone https://github.com/srikanthbisai/json_server_render.git
```

Install All the Dependencies
```bash
npm install
```

Start the development server:
```bash
 
```
Access the app in your browser at http://localhost:5000.

npm run build
Builds the app for production in the build directory.
Optimizes the React app for deployment by minifying and hashing file names.

```bash
npm run eject
```
 
Warning: This is a one-way operation. Once you eject, you cannot undo this action.
This command gives full control over configuration files like webpack, Babel, and ESLint. Proceed only if customization is essential.

🔗 Backend Setup
The backend is a mock JSON server deployed on Render.com.
Clone the backend repository for local setup:

Clone the repository:

```bash
git clone https://github.com/srikanthbisai/json_server_render.git
```

cd json_server_render
Install dependencies:

Install the Json Server to create a json based simplistic mock server by running this command
```bash
npm install -g json-server
```

Start the Json Server

Start the server: if port you want to run is 8000 , replace it with the port number you like
```bash
json-server --watch db.json --port 8000
```

The backend will run at
```bash
 http://localhost:8000
```


📦 Dependencies
Key dependencies include:

```bash
@mui/material: For responsive and feature-rich UI components.
react-toastify: For real-time notifications.
axios: For handling API requests.
json-server: Mock backend for data persistence.
typescript: Ensures type safety.
```
📝 Notes
Render.com Delays: The backend server may take up to 30 seconds to start if idle. Please wait patiently for responses.
The project uses best practices in component architecture, responsiveness, and state management.
📋 License
This project is licensed under the MIT License. See the LICENSE file for details.

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for suggestions or bug fixes.

📧 Contact
For queries, feel free to reach out:
Email: srikanthbisai2110@gmail.com

