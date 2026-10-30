// src/App.jsx

// Import the reusable WelcomeMessage component from the components folder
import WelcomeMessage from './components/WelcomeMessage';
// Import the component-level styles
import './App.css';

// Main App component
function App() {
  return (
    <main className="app-container">
      {/* Rendering the WelcomeMessage component */}
      <WelcomeMessage />
    </main>
  );
}

// Export the App component so main.jsx can render it into the DOM
export default App;
