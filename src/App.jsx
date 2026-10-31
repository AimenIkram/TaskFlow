/**
 * TaskFlow Application Shell
 * Renders the persistent sidebar, top navigation bar, main workspace, and task modal.
 */

import { useState, useMemo, useEffect } from 'react';
import { Plus, Kanban, List } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import KanbanBoard from './components/KanbanBoard';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import CategoryManager from './components/CategoryManager';
import CategoryModal from './components/CategoryModal';
import CategoryDeleteModal from './components/CategoryDeleteModal';
import FilterToolbar from './components/FilterToolbar';
import { SAMPLE_TASKS, TASK_STATUS, getLocalDateString, isTaskOverdue } from './data/tasks';
import { DEFAULT_CATEGORIES } from './data/categories';
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  isValidTasksArray,
  isValidCategoriesArray,
  isValidTheme
} from './utils/storage';

function App() {
  // Navigation state ('dashboard' | 'categories')
  const [activeNav, setActiveNav] = useState('dashboard');

  // Mobile navigation drawer state (open / closed)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Central theme state initialized lazily from LocalStorage with 'light' fallback
  const [theme, setTheme] = useState(() =>
    loadFromStorage(STORAGE_KEYS.THEME, 'light', isValidTheme)
  );

  // Central categories state initialized lazily from LocalStorage with starter fallback
  const [categories, setCategories] = useState(() =>
    loadFromStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES, isValidCategoriesArray)
  );

  // Category modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dueDateFilter, setDueDateFilter] = useState('all');

  // State to manage whether the task modal is open
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // State to hold the specific task currently being edited (null when creating a new task)
  const [editingTask, setEditingTask] = useState(null);

  // State to hold the specific task currently pending deletion confirmation (null when no dialog open)
  const [taskToDelete, setTaskToDelete] = useState(null);

  // State to manage the currently active view ('board' | 'list')
  const [activeView, setActiveView] = useState('board');

  // Central task state initialized lazily from LocalStorage with sample tasks fallback
  const [tasks, setTasks] = useState(() =>
    loadFromStorage(STORAGE_KEYS.TASKS, SAMPLE_TASKS, isValidTasksArray)
  );

  // Centralized persistence: save tasks to LocalStorage whenever tasks change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  // Centralized persistence: save categories to LocalStorage whenever categories change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  }, [categories]);

  // Centralized persistence: save theme to LocalStorage whenever theme changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Synchronize root class and data-theme attribute on document root for system-wide theming
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('app--light', 'app--dark');
    root.classList.add(`app--${theme}`);
    root.setAttribute('data-theme', theme);
  }, [theme]);

  // Track if any filter or search condition is active
  const isFiltered = Boolean(
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    categoryFilter !== 'all' ||
    dueDateFilter !== 'all'
  );

  // Reset all search and filter conditions to defaults
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
    setDueDateFilter('all');
  };

  // Derive filtered tasks without mutating the original collection
  const filteredTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const todayStr = getLocalDateString();

    return tasks.filter((task) => {
      // 1. Search Query (matches task title case-insensitively)
      if (normalizedQuery && !task.title.toLowerCase().includes(normalizedQuery)) {
        return false;
      }

      // 2. Status Filter
      if (statusFilter !== 'all' && task.status !== statusFilter) {
        return false;
      }

      // 3. Priority Filter
      if (
        priorityFilter !== 'all' &&
        task.priority?.toLowerCase() !== priorityFilter.toLowerCase()
      ) {
        return false;
      }

      // 4. Category Filter (matches by category ID with name fallback)
      if (categoryFilter !== 'all') {
        const matchesCategory =
          task.categoryId === categoryFilter ||
          (task.category &&
            categories
              .find((c) => c.id === categoryFilter)
              ?.name.toLowerCase() === task.category.toLowerCase());
        if (!matchesCategory) return false;
      }

      // 5. Due Date Filter
      if (dueDateFilter !== 'all') {
        if (dueDateFilter === 'no-due-date') {
          if (task.dueDate) return false;
        } else {
          if (!task.dueDate) return false;
          const trimmedDue = String(task.dueDate).trim();

          if (dueDateFilter === 'overdue') {
            if (!isTaskOverdue(task, todayStr)) return false;
          } else if (dueDateFilter === 'today') {
            if (trimmedDue !== todayStr) return false;
          } else if (dueDateFilter === 'upcoming') {
            if (trimmedDue <= todayStr) return false;
          }
        }
      }

      return true;
    });
  }, [
    tasks,
    searchQuery,
    statusFilter,
    priorityFilter,
    categoryFilter,
    dueDateFilter,
    categories
  ]);

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

  // Handler to update a task's status immutably using map() and object spread.
  // Supports receiving either a task object or a taskId string.
  // Guards against unnecessary state updates if task is already in target status.
  const handleStatusChange = (taskOrId, newStatus) => {
    const targetId = typeof taskOrId === 'object' && taskOrId !== null ? taskOrId.id : taskOrId;
    if (!targetId || !newStatus) return;

    setTasks((prevTasks) => {
      const existingTask = prevTasks.find((task) => task.id === targetId);
      if (!existingTask || existingTask.status === newStatus) {
        return prevTasks;
      }
      return prevTasks.map((task) =>
        task.id === targetId ? { ...task, status: newStatus } : task
      );
    });
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

  // Category Modal Handlers
  const handleOpenCreateCategoryModal = () => {
    setCategoryToEdit(null);
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategoryModal = (category) => {
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setCategoryToEdit(null);
  };

  const handleSaveCategory = (savedCategory) => {
    if (categoryToEdit) {
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === savedCategory.id ? { ...cat, ...savedCategory } : cat
        )
      );
    } else {
      setCategories((prevCategories) => [...prevCategories, savedCategory]);
    }
  };

  const handleOpenDeleteCategoryModal = (category) => {
    setCategoryToDelete(category);
  };

  const handleCloseDeleteCategoryModal = () => {
    setCategoryToDelete(null);
  };

  const handleConfirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== categoryToDelete.id)
      );
      setCategoryToDelete(null);
    }
  };

  // Central Navigation Handler
  const handleNavigate = (navId) => {
    setIsMobileNavOpen(false);

    // If opening Category Manager view
    if (navId === 'categories' || navId === 'settings') {
      setActiveNav('categories');
      return;
    }

    // All other navigation items direct to the Dashboard view
    setActiveNav('dashboard');

    if (navId === 'dashboard') {
      // Clear filters so all tasks are visible
      setCategoryFilter('all');
      setDueDateFilter('all');
      setStatusFilter('all');
      setPriorityFilter('all');
      setSearchQuery('');
    } else if (navId === 'today') {
      // Filter exclusively to tasks due today
      setDueDateFilter('today');
      setCategoryFilter('all');
      setStatusFilter('all');
      setPriorityFilter('all');
      setSearchQuery('');
    } else if (navId === 'upcoming') {
      // Filter exclusively to upcoming future tasks
      setDueDateFilter('upcoming');
      setCategoryFilter('all');
      setStatusFilter('all');
      setPriorityFilter('all');
      setSearchQuery('');
    } else if (categories.some((c) => c.id === navId)) {
      // Filter exclusively to tasks belonging to the clicked category
      setCategoryFilter(navId);
      setDueDateFilter('all');
      setStatusFilter('all');
      setPriorityFilter('all');
      setSearchQuery('');
    }
  };

  // Derive which navigation item or category is actively selected in the sidebar
  const currentActiveId = useMemo(() => {
    if (activeNav === 'categories') {
      return 'categories';
    }
    if (categoryFilter !== 'all') {
      return categoryFilter;
    }
    if (dueDateFilter === 'today') {
      return 'today';
    }
    if (dueDateFilter === 'upcoming') {
      return 'upcoming';
    }
    return 'dashboard';
  }, [activeNav, categoryFilter, dueDateFilter]);

  // Theme Toggle Handler
  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`app-layout app--${theme}`}>
      {/* Sidebar Navigation (Fixed on desktop, off-canvas drawer on tablet/mobile) */}
      <Sidebar
        categories={categories}
        tasks={tasks}
        currentActiveId={currentActiveId}
        onNavigate={handleNavigate}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Column with Navbar and Workspace Area */}
      <div className="app-content-wrapper">
        <Navbar
          pageTitle={
            activeNav === 'categories'
              ? 'Categories'
              : categoryFilter !== 'all'
              ? categories.find((c) => c.id === categoryFilter)?.name || 'Category'
              : dueDateFilter === 'today'
              ? 'Today'
              : dueDateFilter === 'upcoming'
              ? 'Upcoming'
              : 'Dashboard'
          }
          parentTitle="Workspace"
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          isMobileNavOpen={isMobileNavOpen}
          onToggleMobileMenu={() => setIsMobileNavOpen((prev) => !prev)}
        />

        <main className="app-main" id="main-content">
          {activeNav === 'categories' ? (
            /* Category Management Interface */
            <CategoryManager
              categories={categories}
              onOpenCreateModal={handleOpenCreateCategoryModal}
              onOpenEditModal={handleOpenEditCategoryModal}
              onOpenDeleteModal={handleOpenDeleteCategoryModal}
              onBackToDashboard={() => setActiveNav('dashboard')}
            />
          ) : (
            /* Dashboard View */
            <>
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

              {/* Key Metric Overview Cards dynamically derived from ALL tasks */}
              <DashboardStats tasks={tasks} />

              {/* Search & Multi-Filter Control Toolbar */}
              <FilterToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                categories={categories}
                dueDateFilter={dueDateFilter}
                onDueDateChange={setDueDateFilter}
                isFiltered={isFiltered}
                onClearFilters={handleClearFilters}
                totalCount={tasks.length}
                filteredCount={filteredTasks.length}
              />

              {/* Conditional Rendering of Active Task View: Board or List */}
              {activeView === 'board' ? (
                <section className="board-section" aria-label="Kanban Workflow Board">
                  <KanbanBoard
                    tasks={filteredTasks}
                    categories={categories}
                    isFiltered={isFiltered}
                    onClearFilters={handleClearFilters}
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
                    tasks={filteredTasks}
                    categories={categories}
                    isFiltered={isFiltered}
                    onClearFilters={handleClearFilters}
                    onEditTask={handleOpenEditModal}
                    onDeleteTask={handleOpenDeleteModal}
                    onCompleteTask={handleCompleteTask}
                    onOpenAddModal={handleOpenAddModal}
                    onStatusChange={handleStatusChange}
                  />
                </section>
              )}
            </>
          )}
        </main>
      </div>

      {/* Reusable Task Modal for Creation and Editing */}
      {isAddTaskOpen && (
        <AddTaskModal
          isOpen={isAddTaskOpen}
          categories={categories}
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

      {/* Category Creation / Editing Modal */}
      {isCategoryModalOpen && (
        <CategoryModal
          isOpen={isCategoryModalOpen}
          categoryToEdit={categoryToEdit}
          existingCategories={categories}
          onClose={handleCloseCategoryModal}
          onSave={handleSaveCategory}
        />
      )}

      {/* Category Deletion Confirmation Dialog */}
      {categoryToDelete && (
        <CategoryDeleteModal
          isOpen={Boolean(categoryToDelete)}
          category={categoryToDelete}
          onClose={handleCloseDeleteCategoryModal}
          onConfirm={handleConfirmDeleteCategory}
        />
      )}
    </div>
  );
}

export default App;
