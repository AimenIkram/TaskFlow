/**
 * TaskFlow Application Shell
 * Renders the persistent sidebar, top navigation bar, main workspace, and task modal.
 */

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import KanbanBoard from './components/KanbanBoard';
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
              <h1 className="page-header-title">Task Board</h1>
              <p className="page-header-desc">
                Organize, track, and manage your daily tasks across different workflow stages.
              </p>
            </div>

            <div className="page-header-actions">
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

          {/* Main Kanban Task Board */}
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
