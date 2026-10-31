# TaskFlow — Personal Task Management Dashboard

TaskFlow is a modern, responsive task management application built with React. It helps users organize their daily work, manage priorities, track progress, and stay productive through an intuitive dashboard.

The application features a Kanban board, list view, drag-and-drop task management, customizable categories, search and filtering, and light and dark themes.

## Features

### Task Management
- Create, edit, and delete tasks.
- Add task descriptions and due dates.
- Assign priorities and categories.
- Update task statuses.
- Mark tasks as completed.

### Task Organization
- Kanban board with To Do, In Progress, and Completed columns.
- Drag-and-drop tasks between columns.
- Switch between Kanban and List views.
- Organize tasks using categories.
- Create, edit, and delete custom categories.

### Search and Filtering
- Search tasks by title.
- Filter tasks by status, priority, category, and due date.
- Combine filters to find specific tasks.
- Clear filters to view all tasks.

### Dashboard and User Experience
- Dynamic dashboard statistics.
- Task progress tracking.
- Today and Upcoming task navigation.
- Light and dark themes.
- Responsive layout for desktop, tablet, and mobile screens.

### Data Persistence
- Tasks and categories are saved using browser LocalStorage.
- Theme preference is remembered.
- Data remains available after refreshing the browser on the same device and browser.

## Technologies Used

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| JavaScript | Application logic and functionality |
| Vite 8 | Development server and build tool |
| CSS | Styling, layouts, themes, and responsive design |
| Lucide React | Interface icons |
| LocalStorage | Browser-based data persistence |
| Oxlint | Code quality and linting |

## Project Structure

```text
Taskflow/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/
│   ├── data/
│   ├── styles/
│   ├── utils/
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

### Architecture

TaskFlow uses a component-based structure to keep the application organized and maintainable.

- **components/** — Reusable interface components and application sections.
- **components/ui/** — Smaller reusable UI elements.
- **data/** — Centralized application data and configuration.
- **styles/** — Global CSS, design tokens, and component styles.
- **utils/** — Helper functions, including LocalStorage utilities.
- **App.jsx** — Main application component.

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

Open the local URL displayed in your terminal to access the application.

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check code quality |

## Data Storage

TaskFlow currently uses browser LocalStorage instead of a backend database.

This means:
- Tasks are stored locally in the user's browser.
- Data persists across browser refreshes.
- Data is not automatically synchronized across devices or browsers.
- Clearing browser storage can remove saved application data.

## Future Improvements

Potential improvements for future versions include:

- User authentication and personal accounts.
- Cloud database integration.
- Synchronization across multiple devices.
- Notifications and reminders.
- Advanced productivity analytics.

## Author

Aimen Ikram

Computer Science Student | Frontend Developer

- GitHub: [AimenIkram](https://github.com/AimenIkram)
- Project Repository: [TaskFlow](https://github.com/AimenIkram/TaskFlow)

---

*Built as a hands-on project to practice React development, component-based architecture, state management, responsive design, and frontend application development.*