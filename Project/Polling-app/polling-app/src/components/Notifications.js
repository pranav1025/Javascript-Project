function Notifications({notifications, onMarkRead}) {
  if (notifications.length === 0) {
    return (
      <div style={{textAlign: 'center', marginTop: '3rem', fontWeight: 600, color: '#6b7280'}}>
        No notifications.
      </div>
    );
  }
  return (
    <ul 
      style={{
        listStyle: 'none',
        padding: 0,
        margin: '1rem auto',
        maxWidth: 600,
        display: 'flex',
        flexDirection:'column',
        gap: '1rem'
      }}
      aria-label="Notifications list"
    >
      {notifications.map(notif => (
        <li
          key={notif.id}
          className="glass"
          style={{
            padding: '16px 20px',
            borderRadius: '14px',
            boxShadow: '0 12px 28px rgba(67,56,202,0.15)',
            color: notif.read ? '#6b7280' : '#4338ca',
            fontWeight: notif.read ? 400 : 700,
            cursor: 'pointer'
          }}
          tabIndex={0}
          role="alert"
          onClick={() => onMarkRead(notif.id)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onMarkRead(notif.id);
            }
          }}
          aria-label={`${notif.read ? '' : 'Unread '}notification: ${notif.title}`}
        >
          <span className="material-icons-outlined" aria-hidden="true" style={{verticalAlign: 'middle', marginRight: 12, fontSize: 26}}>
            {notif.type === 'error' ? 'error' : notif.type === 'warning' ? 'warning' : 'notifications'}
          </span>
          <strong>{notif.title}</strong>
          <br />
          <small>{notif.content}</small>
        </li>
      ))}
    </ul>
  );
}