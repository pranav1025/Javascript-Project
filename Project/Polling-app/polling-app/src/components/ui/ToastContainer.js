function ToastContainer({toasts, removeToast}) {
  return (
    <div id="toast-container" aria-live="assertive" aria-atomic="true">
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