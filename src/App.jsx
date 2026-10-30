/**
 * TaskFlow Application Shell
 * Renders the persistent sidebar, top navigation bar, and main workspace.
 */

import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import KanbanBoard from './components/KanbanBoard';

function App() {
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
                aria-label="Add new task"
                title="Add task (Visual placeholder)"
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
            <KanbanBoard />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
