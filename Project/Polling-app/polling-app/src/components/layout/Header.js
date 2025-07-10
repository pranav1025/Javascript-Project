function Header({onSidebarToggle, isSidebarOpen, onThemeToggle, currentTheme}) {
  return (
    <header id="app-header" className="glass" role="banner" aria-label="Application header">
      <div className="header-brand" tabIndex={0} aria-label="Polling and Voting Platform brand name">PollHub</div>
      <nav className="header-nav" aria-label="Primary navigation">
        <button 
          id="sidebar-toggle-btn" 
          aria-label="Toggle navigation menu" 
          title="Toggle menu" 
          aria-expanded={isSidebarOpen} 
          aria-controls="sidebar" 
          onClick={onSidebarToggle}
        >
          <span className="material-icons">menu</span>
        </button>
        <button
          id="theme-toggle-btn" 
          className="theme-toggle-btn" 
          aria-label="Toggle light/dark theme" 
          title="Toggle theme" 
          aria-pressed={currentTheme === 'dark'}
          onClick={onThemeToggle}
        >
          <span className="material-icons" id="theme-icon">
            {currentTheme === 'dark' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
      </nav>
    </header>
  );
}