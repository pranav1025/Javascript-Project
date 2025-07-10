function Sidebar({activeTab, onChangeTab, pendingCount, unreadCount, collapsed, onToggleCollapse, isMobile, onMobileClose}) {
  return (
    <aside 
      id="sidebar" 
      className={`glass ${collapsed ? 'collapsed' : ''} ${isMobile && !collapsed ? 'open' : ''}`} 
      role="navigation" 
      aria-label="Sidebar navigation"
      tabIndex={-1}
      aria-hidden={collapsed}
      style={{userSelect: 'none'}}
    >
      <nav className="nav-section" aria-label="Main navigation items" role="list">
        <button
          className={`nav-link${activeTab === 'home' ? ' active' : ''}`}
          aria-current={activeTab === 'home' ? 'page' : undefined}
          onClick={() => { onChangeTab('home'); if (isMobile) onMobileClose() }}
          tabIndex={activeTab === 'home' ? 0 : -1}
        >
          <span className="material-icons" aria-hidden="true">home</span>
          Home
        </button>
        <button
          className={`nav-link${activeTab === 'create' ? ' active' : ''}`}
          onClick={() => { onChangeTab('create'); if (isMobile) onMobileClose() }}
          tabIndex={activeTab === 'create' ? 0 : -1}
        >
          <span className="material-icons" aria-hidden="true">add_circle</span>
          Create Poll
          {pendingCount > 0 && <span className="badge" aria-label={`${pendingCount} pending polls`}>{pendingCount}</span>}
        </button>
        <button
          className={`nav-link${activeTab === 'settings' ? ' active' : ''}`}
          onClick={() => { onChangeTab('settings'); if (isMobile) onMobileClose() }}
          tabIndex={activeTab === 'settings' ? 0 : -1}
        >
          <span className="material-icons" aria-hidden="true">settings</span>
          Settings
        </button>
      </nav>
      <nav className="nav-section" aria-label="Notifications" role="list">
        <button
          className={`nav-link${activeTab === 'notifications' ? ' active' : ''}`}
          onClick={() => { onChangeTab('notifications'); if (isMobile) onMobileClose() }}
          tabIndex={activeTab === 'notifications' ? 0 : -1}
        >
          <span className="material-icons" aria-hidden="true">notifications</span>
          Notifications
          {unreadCount > 0 && <span className="badge" aria-label={`${unreadCount} unread notifications`}>{unreadCount}</span>}
        </button>
      </nav>
      {!isMobile && (
        <button 
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onToggleCollapse}
          style={{
            marginTop: 'auto',
            padding: '8px 12px',
            borderRadius: '12px',
            border: 'none',
            background: 'rgba(67,56,202,0.15)',
            color:'#4338ca',
            fontWeight:'700',
            cursor:'pointer',
            userSelect: 'none'
          }}
          tabIndex={0}
        >
          <span className="material-icons" aria-hidden="true">{collapsed ? 'chevron_right' : 'chevron_left'}</span>
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      )}
    </aside>
  );
}