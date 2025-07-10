function PollEditor({onCancel, onSave, editPoll}) {
  const [title, setTitle] = useState(editPoll ? editPoll.title : '');
  const [content, setContent] = useState(editPoll ? editPoll.content : '');
  const [options, setOptions] = useState(editPoll ? 
    editPoll.options.map(o => ({id: o.id, label: o.label})) :
    [{id: generateId(), label: ''}, {id: generateId(), label:''}]
  );
  const [errors, setErrors] = useState({title: null, options: null});

  const validate = () => {
    let valid = true;
    let newErrors = {title: null, options: null};
    if (!title.trim()) {
      newErrors.title = "Poll title is required.";
      valid = false;
    }
    let optLabels = options.map(o => o.label.trim().toLowerCase()).filter(l => l !== '');
    if (optLabels.length < 2) {
      newErrors.options = "Add at least two options.";
      valid = false;
    }
    let uniqueLabels = new Set(optLabels);
    if (uniqueLabels.size !== optLabels.length) {
      newErrors.options = "Option labels must be unique.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const addOption = () => {
    setOptions([...options, {id: generateId(), label: ''}]);
  };
  
  const removeOption = (id) => {
    if (options.length <= 2) return;
    setOptions(opt => opt.filter(o => o.id !== id));
  };
  
  const updateOptionLabel = (id, val) => {
    setOptions(opt => opt.map(o => o.id === id ? {...o, label: val} : o));
  };
  
  const dragSourceIndex = useRef(null);
  const dragOverIndex = useRef(null);
  
  const onDragStart = (index) => {
    dragSourceIndex.current = index;
  };
  
  const onDragOver = (index, e) => {
    e.preventDefault();
    dragOverIndex.current = index;
  };
  
  const onDrop = () => {
    if (dragSourceIndex.current === null || dragOverIndex.current === null) return;
    const newOptions = [...options];
    const [movedOption] = newOptions.splice(dragSourceIndex.current, 1);
    newOptions.splice(dragOverIndex.current, 0, movedOption);
    setOptions(newOptions);
    dragSourceIndex.current = null;
    dragOverIndex.current = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const poll = {
      id: editPoll ? editPoll.id : generateId(),
      title: title.trim(),
      content: content.trim(),
      options: options.map(o => ({
        id: o.id,
        label: o.label.trim(),
        votes: editPoll ? (editPoll.options.find(oo => oo.id === o.id)?.votes || 0) : 0
      })),
      category: 'general',
      owner: 'u1',
      collaborators: [],
      version: editPoll ? editPoll.version + 1 : 1,
      history: [],
      totalVotes: editPoll ? editPoll.options.reduce((acc, o) => acc + o.votes, 0) : 0,
      createdAt: editPoll ? editPoll.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      finished: false
    };
    onSave(poll);
  };

  return (
    <form id="poll-editor" aria-label={editPoll ? "Edit Poll Form" : "Create Poll Form"} onSubmit={handleSubmit} noValidate>
      <h2>{editPoll ? 'Edit Poll' : 'Create New Poll'}</h2>
      <div>
        <label htmlFor="poll-title" className="form-label">Poll Title *</label>
        <input
          type="text"
          id="poll-title"
          name="title"
          autoComplete="off"
          required
          aria-required="true"
          aria-describedby="title-error"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {errors.title && <div className="form-error" id="title-error" aria-live="polite">{errors.title}</div>}
      </div>
      <div>
        <label htmlFor="poll-content" className="form-label">Description / Content</label>
        <textarea
          id="poll-content"
          name="content"
          rows={3}
          aria-describedby="content-desc"
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <div id="content-desc" style={{fontSize: '0.85rem', color:'#6b7280'}}>
          Optional detailed description
        </div>
      </div>
      <fieldset aria-live="polite" aria-describedby="options-error" style={{border:'none', padding:0}}>
        <legend className="form-label">Options *</legend>
        <ul id="poll-options-list" aria-label="Poll options list" className="poll-options editable" role="list" style={{ userSelect: 'none' }}>
          {options.map((option, index) => (
            <li 
              key={option.id} 
              className="poll-option editable-option" 
              draggable 
              style={{cursor: 'grab'}} 
              onDragStart={() => onDragStart(index)} 
              onDragOver={(e) => onDragOver(index, e)} 
              onDrop={onDrop}
            >
              <span 
                className="drag-handle material-icons" 
                role="img" 
                aria-label="Drag option to reorder"
                tabIndex={-1}
              >
                drag_indicator
              </span>
              <input 
                type="text" 
                aria-label="Poll option"
                className="option-input"
                value={option.label}
                autoComplete="off"
                required
                onChange={e => updateOptionLabel(option.id, e.target.value)}
              />
              <button 
                type="button" 
                className="btn-remove-option material-icons" 
                aria-label="Remove option"
                onClick={() => removeOption(option.id)}
                disabled={options.length <= 2}
                style={{ userSelect: 'none' }}
              >
                close
              </button>
            </li>
          ))}
        </ul>
        {errors.options && <div id="options-error" className="form-error" style={{display: 'block'}}>{errors.options}</div>}
        <button type="button" id="add-option-btn" className="btn-secondary" aria-label="Add option" onClick={addOption} style={{userSelect: 'none'}}>
          Add Option
        </button>
      </fieldset>
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={!title.trim()}>{
          editPoll ? 'Update Poll' : 'Create Poll'
        }</button>
        <button type="button" id="cancel-editor-btn" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}