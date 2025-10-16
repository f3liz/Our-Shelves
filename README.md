# Our Shelves

**Project Name:** Our Shelves  
**Original Creators:** Augy Markham, Rebecca Riffle  
**Partners:** Alexander Ruban, Felix Chen  

---

## Overview

**Our Shelves** is a book-tracking web application that allows users to manage their personal reading lists.  
Users can add, view, update, and delete books from their collection, making it simple to track progress and stay organized.

---

## Current MVP Features

- Full-stack architecture using **Next.js (React)**, **Node.js (Express)**, and **MySQL**
- Add new books and details to the database
- View all books in a clean, sortable table view
- Update book information (e.g., title, author, status)
- Delete books once finished reading

---

## Planned Features (Future Roadmap)

- User accounts with authentication and login
- Personal and shared notes for each book
- Bookmarks to track reading progress
- Interactive bookshelf UI
- Custom filtering for notes:
  - By user (self/friends)
  - By page number
- Friend requests and shared reading lists
- Custom shelves (e.g., Sci-Fi, Nonfiction, Favorites)
- User personalization (themes, colors, shelf decorations)
- Social features like comments and book recommendations

---

## Environment Variables

### Frontend (`.env.local`)
Create a `.env.local` file in the `client` folder based on the provided `example.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://<YOUR_VM_IP or localhost>:3000
```

### Backend (`.env`)
Create a `.env` file in the `server` folder based on the provided `example.env`:

```
SERVER_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=ourshelves
DB_USER=DevelopmentUserOrDeploymentUser
DB_PASSWORD=UserPassword
```

---

## Development & Deployment

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/f3liz/Our-Shelves.git
   cd Our-Shelves
   ```

2. **Install Dependencies**
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. **Set Up Environment Files**  
   Create `.env` files for both frontend and backend (see above).

4. **Create a MySQL Database**
   ```sql
   CREATE DATABASE ourshelves;
   ```
   Ensure credentials match those in your backend `.env` file.

5. **Start Both Servers**
   From the project root:
   ```bash
   npm run dev
   ```

---

### Deployment (VM / Production)

1. **Run the Setup Script**
   ```bash
   bash setup.sh
   ```

2. **Navigate into the Project**
   ```bash
   cd Our-Shelves
   ```

3. **Create Environment Files**  
   The setup script creates MySQL users and credentials in `ourshelves_mysql_credentials`.  
   Use those to populate your backend `.env` file.

4. **Rebuild Frontend**
   ```bash
   cd client
   npm run build
   ```

5. **Start with PM2**
   ```bash
   pm2 list
   pm2 start ecosystem.config.js
   pm2 save
   pm2 list
   ```

---

## Running the Application

### Locally
```bash
npm run dev
```

### On the VM
1. **Rebuild Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Restart Services**
   ```bash
   cd ..
   pm2 start ecosystem.config.js
   pm2 save
   pm2 list
   ```

---

## Architecture Overview

Our Shelves uses a standard three-tier architecture:

- **Frontend (Client):** Built with Next.js and React to provide a responsive user interface.  
- **Backend (Server):** Powered by Node.js and Express, serving RESTful API endpoints for data handling.  
- **Database Layer:** Uses MySQL to store book records, managed through the Sequelize ORM.  
- **Deployment:** PM2 is used to manage both frontend and backend processes in production for stability and automatic restarts.  

This structure keeps the code organized and supports smooth communication between the client, server, and database layers.

---

## Folder Structure

```
Our-Shelves/
├── client/               # Next.js frontend
│   ├── src/              # Source folder for frontend
│   │   ├── components/   # Reusable UI components
│   │   ├── app/          # Next.js routes
│   │   ├── styles/       # Global and modular CSS
│   │   ├── utilities/    # Utility functions for pages
│   └── public/           # Static assets
│
├── server/               # Express backend
│   ├── model/            # Sequelize models (BookSchema)
│   ├── routers/          # API router
│   ├── controller/       # Business logic
│   ├── db/               # Database creation and functions
│   └── index.js          # Entry point
│
├── setup.sh              # VM deployment setup script
├── ecosystem.config.js   # PM2 configuration
└── README.md             # Project documentation
```

---

## API Endpoints

| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| GET    | `/books`        | Fetch all books          |
| GET    | `/books/:id`    | Fetch a single book      |
| POST   | `/books`        | Add a new book           |
| PUT    | `/books/:id`    | Update a book            |
| DELETE | `/books/:id`    | Delete a book            |

---

## Dependencies

### Frontend
- `next`
- `react`
- `react-dom`

### Backend
- `express`
- `sequelize`
- `mysql2`
- `cors`
- `dotenv`

### Root
- `pm2`

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)
- [PM2](https://pm2.keymetrics.io/)
- [OpenSSL](https://www.openssl.org/)

---