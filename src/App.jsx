/**
 * TaskFlow Application Shell
 * Renders the persistent sidebar, top navigation bar, main workspace, and task modal.
 */

import { useState } from 'react';
import { Plus, Kanban, List } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import KanbanBoard from './components/KanbanBoard';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { SAMPLE_TASKS, TASK_STATUS } from './data/tasks';

function App() {
  // State to manage whether the task modal is open
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // State to hold the specific task currently being edited (null when creating a new task)
  const [editingTask, setEditingTask] = useState(null);

  // State to hold the specific task currently pending deletion confirmation (null when no dialog open)
  const [taskToDelete, setTaskToDelete] = useState(null);

  // State to manage the currently active view ('board' | 'list')
  const [activeView, setActiveView] = useState('board');

  // Central task state initialized with existing sample tasks
  const [tasks, setTasks] = useState(SAMPLE_TASKS);

  // Open modal in creation mode (clean form)
  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsAddTaskOpen(true);
  };

  // Open modal in editing mode with selected task
  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsAddTaskOpen(true);
  };

  // Close modal and reset editing selection
  const handleCloseModal = () => {
    setIsAddTaskOpen(false);
    setEditingTask(null);
  };

  // Open confirmation dialog for task deletion
  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
  };

  // Close delete confirmation dialog without deleting
  const handleCloseDeleteModal = () => {
    setTaskToDelete(null);
  };

  // Handler to add a newly created task to state immutably
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Handler to update an existing task immutably using map() and object spread
  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Handler to update a task's status immutably using map() and object spread
  const handleStatusChange = (taskToUpdate, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToUpdate.id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Handler to mark a task as completed immutably using map()
  const handleCompleteTask = (taskToComplete) => {
    handleStatusChange(taskToComplete, TASK_STATUS.COMPLETED);
  };

  // Handler to confirm deletion: removes only the selected task immutably via filter()
  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
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
              <h1 className="page-header-title">
                {activeView === 'board' ? 'Task Board' : 'Task List'}
              </h1>
              <p className="page-header-desc">
                {activeView === 'board'
                  ? 'Organize, track, and manage your daily tasks across different workflow stages.'
                  : 'View, filter, and manage all your tasks in a clean tabular list.'}
              </p>
            </div>

            <div className="page-header-actions">
              {/* Board / List View Switcher Control */}
              <div className="view-switcher" role="radiogroup" aria-label="Select task view">
                <button
                  type="button"
                  className={`view-switcher-btn${activeView === 'board' ? ' active' : ''}`}
                  onClick={() => setActiveView('board')}
                  role="radio"
                  aria-checked={activeView === 'board'}
                  title="Switch to Kanban Board view"
                >
                  <Kanban size={15} strokeWidth={2} aria-hidden="true" />
                  <span>Board</span>
                </button>
                <button
                  type="button"
                  className={`view-switcher-btn${activeView === 'list' ? ' active' : ''}`}
                  onClick={() => setActiveView('list')}
                  role="radio"
                  aria-checked={activeView === 'list'}
                  title="Switch to List view"
                >
                  <List size={15} strokeWidth={2} aria-hidden="true" />
                  <span>List</span>
                </button>
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={handleOpenAddModal}
                aria-label="Add new task"
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Add Task</span>
              </button>
            </div>
          </header>

          {/* Key Metric Overview Cards dynamically derived from tasks state */}
          <DashboardStats tasks={tasks} />

          {/* Conditional Rendering of Active Task View: Board or List */}
          {activeView === 'board' ? (
            <section className="board-section" aria-label="Kanban Workflow Board">
              <KanbanBoard
                tasks={tasks}
                onEditTask={handleOpenEditModal}
                onDeleteTask={handleOpenDeleteModal}
                onCompleteTask={handleCompleteTask}
                onOpenAddModal={handleOpenAddModal}
                onStatusChange={handleStatusChange}
              />
            </section>
          ) : (
            <section className="list-section" aria-label="Task List View">
              <TaskList
                tasks={tasks}
                onEditTask={handleOpenEditModal}
                onDeleteTask={handleOpenDeleteModal}
                onCompleteTask={handleCompleteTask}
                onOpenAddModal={handleOpenAddModal}
                onStatusChange={handleStatusChange}
              />
            </section>
          )}
        </main>
      </div>

      {/* Reusable Task Modal for Creation and Editing */}
      {isAddTaskOpen && (
        <AddTaskModal
          isOpen={isAddTaskOpen}
          taskToEdit={editingTask}
          onClose={handleCloseModal}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
        />
      )}

      {/* Task Deletion Confirmation Dialog */}
      {taskToDelete && (
        <DeleteConfirmModal
          isOpen={Boolean(taskToDelete)}
          task={taskToDelete}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default App;
