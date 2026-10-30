// src/components/WelcomeMessage.jsx

// A reusable functional React component
function WelcomeMessage() {
  return (
    <div className="welcome-card">
      {/* Main heading */}
      <h1>Welcome to TaskFlow</h1>

      {/* Description text */}
      <p className="welcome-description">
        Your personal task management workspace.
      </p>

      {/* Sub-heading */}
      <h2>Let's get productive!</h2>

      {/* Confirmation message */}
      <p className="welcome-status">
        Your first React project is working! Built with React and Vite.
      </p>
    </div>
  );
}

// Export the component as the default export so App.jsx can import it
export default WelcomeMessage;
