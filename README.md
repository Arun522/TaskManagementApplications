# Task Management Application


## Overview

The Task Management Application is a full-stack project designed for efficient project and task management. It enables users to create projects, assign tasks, and collaborate with team members while maintaining a responsive and secure platform.

---

## Features

1. **User Authentication**

   - Secure login/logout using JWT tokens.
   - Password encryption with bcrypt.

2. **Project Management**

   - Create and manage projects.
   - Add team members to projects.

3. **Task Management**

   - Assign tasks to users.
   - Track tasks through statuses: `To-Do`, `In Progress`, and `Completed`.

4. **Dashboard**

   - View task summaries.
   - Personalized view for logged-in users.

5. **Responsive Design**
   - Optimized for both mobile and desktop views.

---

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the backend folder and add the following:

   ```env
   PORT=5001
   MONGO_URI=<URL>
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:5001`.

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173/`.

---

## Usage

### Run the Application

1. Start both the frontend and backend servers as described above.
2. Open a browser and navigate to `http://localhost:5173`.

### Key Functionalities

- **Register:** Create a new account.
- **Login:** Authenticate with your email and password.
- **Dashboard:** View your assigned tasks and project summaries.
- **Create Project:** Add a new project and invite members.
- **Assign Tasks:** Create tasks and assign them to users.

---

## Architecture

### **Frontend**

- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Routing:** React Router

### **Backend**

- **Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT-based authentication

### **Data Relationships**

1. **Projects and Tasks:** One-to-Many relationship
2. **Users and Projects:** Many-to-Many relationship

---

## Challenges Faced

1. Implementing secure authentication.
2. Managing relationships between projects, tasks, and users.
3. Optimizing the application for mobile and desktop devices.

---

## Learnings

1. Effective use of React hooks and Tailwind CSS for frontend development.
2. Designing scalable RESTful APIs.
3. Managing user sessions securely with JWT.

---

## Future Improvements

1. Real-time updates using WebSockets.
2. Role-based access control for enhanced permissions.
3. Analytics for tracking task and project progress.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git push origin feature-name
   ```
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
