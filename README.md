# SquadFlow - Workshop Full-Stack Application

SquadFlow is an educational full-stack application designed to teach beginners about modern system architecture. It's a team task and learner progress dashboard built with a React/Next.js frontend and Express.js backend.

## 🎯 Purpose

SquadFlow demonstrates how data flows through a full-stack web application by providing:
- A clean separation between frontend, backend, and data storage
- Clear REST API endpoints that are easy to understand and inspect
- File-based JSON storage that you can inspect directly
- Real-world patterns used in production applications

## 🏗️ System Architecture

### How Data Flows

```
User Interface (React Components) 
    ↓
Next.js Pages (fetch data from API)
    ↓
REST API Routes (app/api/* routes)
    ↓
API Route Handlers (validate & process requests)
    ↓
Database Operations (server/db.ts - read/write to data.json)
    ↓
File Storage (server/data.json - JSON file)
```

### The Layers

1. **Frontend (Next.js Pages & React Components)**
   - User-facing React components in `app/`
   - Handles all UI and user interactions
   - Makes API calls via `lib/api-client.ts` to `/api/*`
   - Never touches the database directly

2. **Backend API (Next.js API Routes)**
   - REST API endpoints in `app/api/`
   - Handles `/api/tasks`, `/api/learners`, `/api/dashboard/`
   - Validates incoming requests
   - Applies business logic
   - Manages data persistence

3. **Data Storage (File-based JSON)**
   - Simple JSON file at `server/data.json`
   - Easy to inspect and understand
   - Perfect for learning (no database setup needed)
   - Contains all tasks and learners

## 📁 Folder Structure

```
/vercel/share/v0-project/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Dashboard/Home
│   ├── layout.tsx                # Root layout with navigation
│   ├── globals.css               # Global styles
│   │
│   ├── tasks/
│   │   ├── page.tsx              # Task list
│   │   ├── new/page.tsx          # Create task form
│   │   └── [id]/page.tsx         # Edit task form
│   │
│   ├── learners/
│   │   └── page.tsx              # Learner progress view
│   │
│   ├── system-map/
│   │   └── page.tsx              # Architecture explanation
│   │
│   └── api/                      # Next.js API Routes
│       ├── tasks/
│       │   ├── route.ts          # GET/POST /api/tasks
│       │   └── [id]/route.ts     # GET/PUT/DELETE /api/tasks/:id
│       ├── learners/
│       │   ├── route.ts          # GET/POST /api/learners
│       │   └── [id]/progress/route.ts  # GET /api/learners/:id/progress
│       └── dashboard/
│           └── summary/route.ts  # GET /api/dashboard/summary
│
├── components/
│   ├── dashboard-cards.tsx       # Summary statistics cards
│   ├── task-list.tsx             # Task list with search/filter
│   ├── task-form.tsx             # Create/edit task form
│   ├── learner-progress.tsx      # Learner progress display
│   ├── system-diagram.tsx        # Architecture visualization
│   └── ui/                       # shadcn/ui components
│
├── lib/
│   ├── api-client.ts             # Utility functions for API calls
│   └── utils.ts                  # Utility functions
│
├── server/                       # Backend logic (shared with API routes)
│   ├── db.ts                     # File-based database operations
│   ├── seed.ts                   # Sample data generation
│   ├── data.json                 # Database file (auto-created)
│   └── index.ts                  # (Optional: Express server for standalone use)
│
├── public/                       # Static files
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation & Running

1. **Install dependencies** (already done if you followed the setup):
   ```bash
   pnpm install
   ```

2. **Start the development server**:
   ```bash
   pnpm dev
   ```

   This runs the Next.js dev server on http://localhost:3000
   - Frontend pages run on the same server
   - API routes on `/api/*` are automatically available

3. **Open in browser**:
   Navigate to http://localhost:3000

### Understanding What You See

When you first run the app:
- Next.js starts the development server
- On first page load, the API routes check if `server/data.json` exists
- If it doesn't exist, it runs `seed.ts` to create sample data
- The sample data includes 3 learners and 7 tasks with realistic relationships
- All data is stored in `server/data.json` - you can open and inspect it anytime

## 📊 API Endpoints

The Next.js API routes provide these REST API endpoints (all under `/api`):

### Tasks
- `GET /tasks` - Get all tasks (optional: `?status=todo|in-progress|completed`)
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Learners
- `GET /learners` - Get all learners
- `GET /learners/:id` - Get a specific learner
- `GET /learners/:id/progress` - Get learner progress with task stats
- `POST /learners` - Create a new learner

### Dashboard
- `GET /dashboard/summary` - Get overall dashboard statistics

## 💾 Data Structure

### Task Schema
```json
{
  "id": "uuid",
  "title": "Task Title",
  "description": "Task description",
  "status": "todo|in-progress|completed",
  "assignedTo": ["learner-id-1", "learner-id-2"],
  "priority": "low|medium|high",
  "dueDate": "2026-05-30",
  "createdAt": "2026-05-24T10:00:00Z",
  "updatedAt": "2026-05-24T10:00:00Z"
}
```

### Learner Schema
```json
{
  "id": "uuid",
  "name": "Learner Name",
  "email": "learner@example.com",
  "tasksCompleted": 0,
  "tasksAssigned": 0,
  "joinDate": "2026-05-24T10:00:00Z"
}
```

## 📚 Key Learning Points

### 1. **Separation of Concerns**
- Frontend doesn't know about file storage
- Backend doesn't know about React components
- Each layer has a specific responsibility

### 2. **REST API Principles**
- Uses HTTP methods properly: GET (read), POST (create), PUT (update), DELETE (remove)
- Resources are identified by URL paths (`/api/tasks/:id`)
- Responses are consistent JSON format

### 3. **Client-Server Communication**
- Frontend calls API endpoints using `fetch()` 
- Backend receives requests and sends back JSON responses
- CORS is handled so localhost:3000 can call localhost:5000

### 4. **Data Persistence**
- Data is saved to `server/data.json` automatically
- Open the file to see exactly how data is stored
- Each operation reads and writes the entire file (simple, not efficient, but perfect for learning)

### 5. **TypeScript**
- Both frontend and backend use TypeScript
- Type safety helps catch errors early
- Interfaces define expected data structures

## 🔍 How to Explore the Code

### Following a User Action

Let's trace what happens when you create a task:

1. **User fills form** → `components/task-form.tsx`
   - Component collects title, description, etc.
   - Calls `createTask()` from `lib/api-client.ts`

2. **Frontend sends request** → `lib/api-client.ts`
   - Uses `fetch()` to POST to `http://localhost:5000/api/tasks`
   - Sends task data as JSON

3. **Backend receives request** → `server/routes.ts`
   - Express route handler receives POST request
   - Validates the data

4. **Backend processes** → `server/db.ts`
   - Creates task with UUID and timestamps
   - Adds to tasks array

5. **Backend persists** → `server/data.json`
   - Writes entire database to JSON file
   - Logs operation to console

6. **Response sent back** → Frontend
   - New task returned as JSON
   - Frontend displays success message
   - UI updates to show new task

### Inspecting the Database

Open `server/data.json` in your editor to see:
- All tasks and their current status
- All learners and their information
- The exact structure of the data

This is the "source of truth" for the entire application.

## 🛠️ Development Commands

```bash
# Start both servers (Frontend + Backend)
pnpm dev

# Build the frontend for production
pnpm build

# Start production server (Next.js only)
pnpm start

# Run linter
pnpm lint
```

## 📖 Pages Overview

### Dashboard (`/`)
- Summary statistics cards
- Recent tasks overview
- Quick navigation to other sections

### Tasks (`/tasks`)
- View all tasks
- Search and filter by status
- Delete tasks
- Links to create/edit

### Create/Edit Task (`/tasks/new` and `/tasks/:id`)
- Form to create or edit tasks
- Assign to learners
- Set status, priority, due date

### Learners (`/learners`)
- View all learners
- See progress for each learner
- Shows completed/in-progress/pending tasks
- Completion percentage

### System Map (`/system-map`)
- Visual diagram of the architecture
- Explains how data flows
- Teaching points about REST APIs and client-server communication

## 🎓 Educational Focus

This app is designed to teach:
1. How frontend and backend communicate
2. REST API design and usage
3. JSON data format and structure
4. File-based data persistence
5. React component organization
6. TypeScript type safety
7. Form handling and validation
8. Asynchronous data fetching

Each file contains comments explaining key concepts. The System Map page explains the architecture visually.

## 🚀 Next Steps for Learning

1. **Modify the UI** - Change colors, layout, add new fields to forms
2. **Add features** - Try adding a "due soon" filter, or task categories
3. **Understand the flow** - Trace a user action from UI to database and back
4. **Extend the API** - Add new endpoints or data fields
5. **Replace storage** - Try replacing the JSON file with a real database (PostgreSQL, MongoDB, etc.)

## 📝 Notes

- This uses file-based storage for simplicity. In production, use a real database.
- CORS is configured to allow localhost:3000 to access localhost:5000
- The Express server auto-seeds data on first run
- All timestamps use ISO 8601 format for consistency
- UUIDs are used for unique IDs instead of sequential numbers (more realistic)

## 🤝 Contributing

This is an educational project. Feel free to:
- Modify the UI and styling
- Add new features
- Experiment with the API
- Change the data structure
- Replace the file storage with a database

The goal is to learn and understand how full-stack applications work!

---

Happy learning! 🎉
