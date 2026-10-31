/**
 * WelcomeScreen Component
 * First-time onboarding experience greeting new users and collecting their display name.
 */

import { useState } from 'react';
import { CheckCheck, Sun, Moon, Sparkles } from 'lucide-react';

function WelcomeScreen({ onSaveName, theme = 'light', onToggleTheme }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError('Please enter your name to get started.');
      return;
    }

    if (onSaveName) {
      onSaveName(trimmed);
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className={`welcome-screen-overlay app--${theme}`} data-theme={theme}>
      {/* Top Bar with Brand Badge & Theme Toggle */}
      <header className="welcome-topbar">
        <div className="welcome-brand">
          <div className="welcome-brand-logo" aria-hidden="true">
            <CheckCheck size={20} strokeWidth={2.6} />
          </div>
          <span className="welcome-brand-name">TaskFlow</span>
        </div>

        {onToggleTheme && (
          <button
            type="button"
            className="navbar-icon-btn welcome-theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <Sun size={18} strokeWidth={2} className="theme-toggle-icon" />
            ) : (
              <Moon size={18} strokeWidth={2} className="theme-toggle-icon" />
            )}
          </button>
        )}
      </header>

      {/* Main Centered Welcome Card */}
      <main className="welcome-main">
        <div className="welcome-card" role="region" aria-label="Welcome to TaskFlow">
          {/* Decorative Sparkle Pill */}
          <div className="welcome-pill">
            <Sparkles size={14} className="welcome-pill-icon" aria-hidden="true" />
            <span>Welcome to your new workspace</span>
          </div>

          {/* Primary Welcome Message */}
          <h1 className="welcome-title">
            Your goals deserve a space of their own.
          </h1>

          {/* Supporting Question */}
          <p className="welcome-subtitle">
            Let&apos;s make this workspace yours. What should we call you?
          </p>

          {/* Name Input Form */}
          <form className="welcome-form" onSubmit={handleSubmit} noValidate>
            <div className="welcome-input-group">
              <label htmlFor="user-name-input" className="welcome-label">
                Your Display Name
              </label>
              <input
                id="user-name-input"
                type="text"
                className={`welcome-input ${error ? 'welcome-input--error' : ''}`}
                placeholder="e.g. Alex Morgan"
                value={name}
                onChange={handleInputChange}
                autoFocus
                maxLength={40}
                aria-required="true"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'welcome-name-error' : undefined}
              />
              {error && (
                <p id="welcome-name-error" className="form-error-msg" role="alert">
                  {error}
                </p>
              )}
            </div>

            {/* Creative CTA Button */}
            <button
              type="submit"
              className="welcome-submit-btn"
              aria-label="Let's get productive"
            >
              <span>Let&apos;s get productive &rarr;</span>
            </button>
          </form>

          {/* Reassurance Footer */}
          <div className="welcome-card-footer">
            <span className="welcome-footnote">
              Data is stored securely and privately in your browser.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;
