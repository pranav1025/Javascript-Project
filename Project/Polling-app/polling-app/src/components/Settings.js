function Settings({settings, onSave}) {
  const [theme, setTheme] = useState(settings.theme || 'light');
  const [language, setLanguage] = useState(settings.language || 'en');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ theme, language });
  };

  return (
    <section style={{ maxWidth: 480, margin: '0 auto' }} className="glass" aria-label="Settings form" tabIndex={-1}>
      <form id="settings-form" onSubmit={handleSubmit}>
        <h2>Settings</h2>
        <div>
          <label htmlFor="theme-select" className="form-label">Theme</label>
          <select 
            id="theme-select" 
            name="theme" 
            autoComplete="off" 
            aria-describedby="theme-desc"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <div id="theme-desc" style={{fontSize: '0.85rem', color:'#6b7280'}}>
            Switch between light and dark theme.
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <button type="submit" className="btn-primary">Save Settings</button>
        </div>
      </form>
    </section>
  );
}