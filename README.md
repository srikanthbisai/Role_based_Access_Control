The backend is deployed on Render.com which might take a little time to serve responses as it gets shut down when not hit constantly.
Backend Repo is located at (https://github.com/srikanthbisai/json_server_render)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

This helps in installing all the packages after cloning the repository from
```bash
git clone https://github.com/srikanthbisai/Role_based_Access_Control.git
```

and  to install all the packages listed in the package.json file
```bash 
npm install
```



```bash
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### PROJECT DETAILS 

Role-Based Access Control (RBAC) Project - Access Control Manager
This project implements a Role-Based Access Control (RBAC) system with a responsive user interface, enabling user and role management with efficient CRUD operations. It showcases modern web development practices using React and TypeScript with Material-UI components for a polished and professional UI/UX.

🛠️ Features
     ⭐️ Frontend
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

 
⭐️ Backend Repository

🚀 Getting Started
Prerequisites
Ensure you have the following installed on your system:

Node.js (v16+ recommended)

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

