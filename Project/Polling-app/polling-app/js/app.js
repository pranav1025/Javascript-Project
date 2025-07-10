const { useState, useEffect, useRef, useCallback } = React;

// Utility functions (should be in a separate utils.js file)
function generateId() {
  return 'xxxxxx'.replace(/[x]/g, () => (Math.random() * 36 | 0).toString(36));
}

function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + (interval === 1 ? ' year ago' : ' years ago');
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + (interval === 1 ? ' month ago' : ' months ago');
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + (interval === 1 ? ' day ago' : ' days ago');
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + (interval === 1 ? ' hour ago' : ' hours ago');
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + (interval === 1 ? ' minute ago' : ' minutes ago');
  return 'Just now';
}

// Toast Component
function Toast({ message, icon, onClose, actionButton, onAction }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [exiting, onClose]);

  return (
    <div className={`toast${exiting ? ' exit' : ''}`} role="alert">
      <span className="material-icons">{icon || 'info'}</span>
      <span className="toast-message">{message}</span>
      {actionButton && (
        <button onClick={() => { onAction(); onClose(); }}>
          {actionButton}
        </button>
      )}
    </div>
  );
}

// ToastContainer Component
function ToastContainer({ toasts, removeToast }) {
  return (
    <div id="toast-container">
      {toasts.map(t => (
        <Toast
          key={t.id}
          message={t.message}
          icon={t.icon}
          actionButton={t.actionButton}
          onAction={t.onAction}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
}

// Header Component
function Header({ onSidebarToggle, isSidebarOpen, onThemeToggle, currentTheme }) {
  return (
    <header id="app-header">
      <div className="header-brand">PollHub</div>
      <nav className="header-nav">
        <button onClick={onSidebarToggle} aria-expanded={isSidebarOpen}>
          <span className="material-icons">menu</span>
        </button>
        <button onClick={onThemeToggle}>
          <span className="material-icons">
            {currentTheme === 'dark' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
      </nav>
    </header>
  );
}

// Sidebar Component
function Sidebar({ activeTab, onChangeTab, pendingCount, unreadCount, collapsed, isMobile, onMobileClose }) {
  return (
    <aside id="sidebar" className={`${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
      {/* ... sidebar navigation items ... */}
    </aside>
  );
}

// Footer Component
function Footer() {
  return (
    <footer id="app-footer">
      <div className="footer-left">© 2024 PollHub</div>
      <div className="footer-socials">
        {/* ... social media links ... */}
      </div>
    </footer>
  );
}

// PollCard Component
function PollCard({ poll, userVote, onCastVote }) {
  // ... poll card implementation ...
}

// PollsList Component
function PollsList({ polls, userVotes, onCastVote }) {
  // ... polls list implementation ...
}

// PollEditor Component
function PollEditor({ onCancel, onSave, editPoll }) {
  // ... poll editor implementation ...
}

// Notifications Component
function Notifications({ notifications, onMarkRead }) {
  // ... notifications implementation ...
}

// Settings Component
function Settings({ settings, onSave }) {
  // ... settings implementation ...
}

// MobileTopbar Component
function MobileTopbar({ onOpenSidebar }) {
  return (
    <div id="mobile-topbar">
      <button onClick={onOpenSidebar}>
        <span className="material-icons">menu</span>
      </button>
    </div>
  );
}

// Main App Component (already provided in previous response)
// ... [Include the complete App component code from previous response here] ...

// Render the app
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);