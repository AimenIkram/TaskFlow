/**
 * TaskFlow Application Shell
 * Renders the persistent sidebar, top navigation bar, main workspace, and task creation modal.
 */

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import KanbanBoard from './components/KanbanBoard';
import AddTaskModal from './components/AddTaskModal';
import { SAMPLE_TASKS } from './data/tasks';

function App() {
  // State to manage the open/closed state of the Add Task modal
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Central task state initialized with existing sample tasks
  const [tasks, setTasks] = useState(SAMPLE_TASKS);

  // Handler to add a newly created task to state immutably
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <div className="app-layout">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Column with Navbar and Workspace Area */}
      <div className="app-content-wrapper">
        <Navbar pageTitle="Dashboard" parentTitle="Workspace" />

        <main className="app-main" id="main-content">
          {/* Main Content Header with Title, Description, and Action Button */}
          <header className="page-header">
            <div className="page-header-info">
              <h1 className="page-header-title">Task Board</h1>
              <p className="page-header-desc">
                Organize, track, and manage your daily tasks across different workflow stages.
              </p>
            </div>

            <div className="page-header-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsAddTaskOpen(true)}
                aria-label="Add new task"
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Add Task</span>
              </button>
            </div>
          </header>

          {/* Key Metric Overview Cards */}
          <DashboardStats />

          {/* Main Kanban Task Board */}
          <section className="board-section" aria-label="Kanban Workflow Board">
            <KanbanBoard tasks={tasks} />
          </section>
        </main>
      </div>

      {/* Task Creation Modal (Mounts fresh with reset state when opened) */}
      {isAddTaskOpen && (
        <AddTaskModal
          isOpen={isAddTaskOpen}
          onClose={() => setIsAddTaskOpen(false)}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;
