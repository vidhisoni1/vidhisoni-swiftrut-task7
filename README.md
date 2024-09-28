
# Expense Tracker Application

## Overview

The **Expense Tracker Application** is a full-stack web app that allows users to track their daily expenses, view statistics, and manage their financial data. It includes features like expense CRUD operations, category filtering, CSV bulk uploads, and chart visualizations for tracking expenses over time.

## Live URLs

- **Frontend (Vercel)**:  https://swifrut-task-7-expense-tracker.vercel.app
- **Backend (Render)**: https://swifrut-task-7-expense-tracker.onrender.com

## Features

- **Authentication**: Users can register, login, and logout.
- **Expense Management**: Add, edit, delete, and view expenses with filtering and sorting by categories and payment methods.
- **Statistics**: Visualize spending through charts.
- **CSV Bulk Upload**: Upload multiple expenses at once using a CSV file.
- **Pagination**: View expenses with pagination for better data management.

## Instructions to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/expense-tracker-app.git
cd expense-tracker-app
```

### 2. Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` folder and add the following:

```bash
MONGO_URL=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
PORT=5000
```

4. Start the backend server:

```bash
npm start
```

This will run the backend API at `http://localhost:5000`.

### 3. Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` folder and add the following:

```bash
REACT_APP_API_URL=<Your Backend API URL>
```

4. Start the frontend server:

```bash
npm start
```

This will run the frontend app at `http://localhost:3000`.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Deployment**:
  - **Frontend**: Vercel
  - **Backend**: Render

## How to Use

### Register & Login

- Navigate to the **Register** page to create a new account.
- Use your credentials to **login**.

### Adding Expenses

- On the **Home** page, you can view, filter, and sort expenses.
- To add a new expense, go to the **Add Expense** page.
- To upload multiple expenses, use the **Bulk Upload** feature on the **Home** page.

### Viewing Statistics

- View expense breakdowns by category and over time on the **Statistics** page.

## Enhancements (For the Task Management App)

As part of enhancing the **Task Management App**:

- Integrated push notifications for important events.
- Implemented real-time task updates using WebSockets.
- Deployed the enhanced Task Management app using the same approach.

## Contact

If you have any questions, feel free to reach out via email at meetlakhani98787@gmail.com.
