# TaskFlow — Personal Task Management Dashboard

<p align="center">
  <a href="https://task-flow-drab-seven.vercel.app/">
    <strong>🌐 VIEW LIVE APPLICATION</strong>
  </a>
</p>

A modern, responsive task management application built with React. TaskFlow helps users organize daily work, manage priorities, track progress, and stay productive through a clean and intuitive dashboard.

## Overview

TaskFlow is a personal productivity dashboard designed to make everyday task management easier. It provides multiple ways to organize tasks, track progress, manage deadlines, and customize the workspace.

The application combines a Kanban board, list view, drag-and-drop functionality, customizable categories, and personalized user experience in one responsive interface.

## Key Features

### Task Management
- Create, edit, and delete tasks.
- Add task descriptions and due dates.
- Assign priorities and categories.
- Update task statuses.
- Mark tasks as completed.

### Task Organization
- Kanban board with To Do, In Progress, and Completed columns.
- Drag-and-drop task management.
- Switch between Kanban and List views.
- Organize tasks using categories.
- Create, edit, and delete custom categories.

### Search and Filtering
- Search tasks by title.
- Filter by status, priority, category, and due date.
- Combine multiple filters.
- Clear filters to view all tasks.

### Dashboard
- Dynamic task statistics.
- Task progress tracking.
- Today and Upcoming task navigation.
- Organized dashboard layout.

### Personalization
- First-time welcome experience.
- Personalized dashboard greeting.
- Custom display name.
- Edit profile functionality.
- Saved profile preferences.

### Themes and Responsiveness
- Light theme.
- Dark theme with neon-inspired accents.
- Responsive layouts for desktop, tablet, and mobile screens.

### Data Persistence
- Save tasks and categories using browser LocalStorage.
- Remember theme preferences.
- Remember the user's display name.
- Preserve data across browser refreshes on the same browser and device.

## Technologies Used

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| JavaScript | Application logic |
| Vite 8 | Development server and build tool |
| CSS | Styling and responsive layouts |
| Lucide React | Interface icons |
| LocalStorage | Browser-based data persistence |
| Oxlint | Code quality and linting |
| Git & GitHub | Version control and source management |
| Vercel | Deployment and hosting |

## Project Structure

```text
Taskflow/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── AddTaskModal.jsx
│   │   ├── EditProfileModal.jsx
│   │   ├── WelcomeScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── KanbanBoard.jsx
│   │   └── TaskList.jsx
│   ├── data/
│   ├── styles/
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Getting Started

Follow these steps to run TaskFlow locally.

### 1. Clone the repository

```bash
git clone https://github.com/AimenIkram/TaskFlow.git
```

### 2. Navigate to the project directory

```bash
cd TaskFlow
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access TaskFlow.

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check code quality |

## Deployment

TaskFlow is deployed using Vercel and connected to its GitHub repository.

**Live Application:** https://task-flow-drab-seven.vercel.app/

Updates pushed to the connected `main` branch automatically trigger a new production deployment.

## Data Storage and Limitations

TaskFlow currently uses browser LocalStorage rather than a backend database.

- Each visitor has their own locally stored tasks and profile.
- Data persists across browser refreshes.
- Data is not synchronized across different devices or browsers.
- Clearing browser storage can remove saved application data.
- The application does not currently include authentication or cloud-based data storage.

## Future Improvements

Potential improvements for future versions include:

- User authentication and account management.
- Cloud database integration.
- Cross-device data synchronization.
- Notifications and task reminders.
- Advanced productivity analytics.

## Author

**Aimen Ikram**

Computer Science Student | Aspiring Software Developer

- GitHub: [AimenIkram](https://github.com/AimenIkram)
- Project Repository: [TaskFlow](https://github.com/AimenIkram/TaskFlow)
- Live Application: [TaskFlow](https://task-flow-drab-seven.vercel.app/)

---

*Built as a hands-on project to explore React development, reusable components, state management, responsive design, and production deployment.*