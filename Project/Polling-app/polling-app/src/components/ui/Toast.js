function Toast({message, icon, onClose, actionButton, onAction}) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (exiting) {
      const endTimer = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(endTimer);
    }
  }, [exiting, onClose]);

  return (
    <div className={`toast${exiting ? ' exit' : ''}`} role="alert" aria-live="assertive">
      <span className="material-icons" aria-hidden="true">{icon || 'info'}</span>
      <span className="toast-message">{message}</span>
      {actionButton && <button onClick={() => {onAction(); onClose();}} aria-label={actionButton} className="toast-action">{actionButton}</button>}
    </div>
  );
}