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
cd 
```bash
  Role_based_Access_Control
```
and  to install all the packages listed in the package.json file run
```bash 
npm install
```


Runs the app in the development mode

```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### PROJECT DETAILS 

Role-Based Access Control (RBAC) Project - Access Control Manager
This project implements a Role-Based Access Control (RBAC) system with a responsive user interface, enabling user and role management with efficient CRUD operations. It showcases modern web development practices using React and TypeScript with Material-UI components for a polished and professional UI/UX.

🛠️ Features
     ⭐️ Frontend
          Built With: React + TypeScript for type-safe development.
          UI/UX:
          Material-UI components for dialogs. UI responsiveness through tailwind utility classes. Slider animations for toggling user active status.
                Feedback and Validation:
                    Toast notifications for success/error messages using react-toastify.
                    Regex-based email validation.

  Optimization Approaches:
                 Code splitting and custom hooks for modularity.
                 Centralized error handling using try-catch.
                 Search & Filter:
                 Search users by name by wrapping the filter function inside useCallback hook for memoisation.
  Responsive Design:
                 Fully mobile-friendly layout.


Backend
     Mock JSON Server:
     Provides backend functionality for CRUD operations.
     Deployed on Render.com. Note: The server may take up to 30 seconds to start if idle.
     Set up a Cron Job to keeping pinging the server with a new request every minute to keep it awake. 
 
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

cd
```bash
 json_server_render
```
Install dependencies:

Install the Json Server to create a json based simplistic mock server by running this command
```bash
npm install -g json-server
```

Start the Json Server

Start the server:
```bash
 npm start
```

The backend will run at by default 
```bash
 http://localhost:3000 
```
You will get 3 endpoints users , permissions, roles to fetch data respective data. 

📦 Dependencies
Key dependencies include:

```bash
@mui/material: For dialog boxes and warn dialogs before deleting users to ensure willing deletion of users.
react-toastify: For real-time notifications.
json-server: Mock backend for data persistence and quick api setup.
tailwind: for css styles.
typescript: Ensures type safety.
```
📝 Notes
Render.com Delays: The backend server may take up to 30 seconds to start if idle. Have set up a cron job for every 1 minute to poll the server. Please wait patiently for responses. 
The project uses best practices in component architecture, responsiveness, and state management.
📋 License
This project is licensed under the MIT License. See the LICENSE file for details.

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for suggestions or bug fixes.

📧 Contact
For queries, feel free to reach out:
Email: srikanthbisai2110@gmail.com

