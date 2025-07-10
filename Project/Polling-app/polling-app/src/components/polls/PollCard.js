function PollCard({poll, userVote, onCastVote}) {
  const [selectedOption, setSelectedOption] = useState(userVote ? userVote : null);

  let totalVotes = poll.options.reduce((acc, o) => acc + o.votes, 0);
  if (totalVotes === 0) totalVotes = 1;

  const handleOptionClick = (optionId) => {
    if (userVote) return;
    setSelectedOption(optionId);
  };
  const handleVoteClick = () => {
    if (!selectedOption) return;
    onCastVote(poll.id, selectedOption);
  };

  function onOptionKeyDown(e, idx) {
    if (userVote) return;
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const next = (idx + 1) % poll.options.length;
      const el = e.currentTarget.parentElement.children[next];
      if (el) el.focus();
    } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      const prev = (idx + poll.options.length - 1) % poll.options.length;
      const el = e.currentTarget.parentElement.children[prev];
      if (el) el.focus();
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleOptionClick(e.currentTarget.getAttribute('data-option-id'));
    }
  }

  return (
    <article
      className="poll-card"
      tabIndex={0}
      role="region"
      aria-labelledby={`poll-title-${poll.id}`}
      id={`poll-${poll.id}`}>
      <header className="poll-header">
        <h2 className="poll-title" id={`poll-title-${poll.id}`}>{poll.title}</h2>
        <time className="poll-meta" dateTime={poll.createdAt} title={new Date(poll.createdAt).toLocaleString()}>
          Created {timeAgo(poll.createdAt)}
        </time>
      </header>
      <p style={{userSelect: 'text'}}>{poll.content}</p>
      <ul className="poll-options" role="radiogroup" aria-labelledby={`poll-title-${poll.id}`} tabIndex={-1}>
        {poll.options.map((opt, idx) => {
          const percentage = ((opt.votes / totalVotes) * 100).toFixed(1);
          const isChecked = selectedOption === opt.id;
          return (
            <li
              key={opt.id}
              role="radio"
              aria-checked={isChecked}
              tabIndex={selectedOption === opt.id ? 0 : -1}
              onClick={() => handleOptionClick(opt.id)}
              onKeyDown={e => onOptionKeyDown(e, idx)}
              data-option-id={opt.id}
              className="poll-option"
            >
              <input
                type="radio"
                name={`poll-${poll.id}`}
                id={`poll-${poll.id}-opt-${opt.id}`}
                checked={isChecked}
                readOnly
                aria-label={`${opt.label}, ${percentage}% votes`}
                tabIndex={-1}
                disabled
              />
              <label htmlFor={`poll-${poll.id}-opt-${opt.id}`} className="poll-option-label">{opt.label}</label>
              <span className="poll-option-percentage" aria-hidden="true">{percentage}%</span>
            </li>
          );
        })}
      </ul>
      <button
        className="voting-button"
        onClick={handleVoteClick}
        disabled={!!userVote || poll.finished || !selectedOption}
        aria-label={poll.finished ? "Poll Closed" : userVote ? "You have voted" : "Cast your vote"}
        type="button">
        {poll.finished ? 'Poll Closed' : userVote ? 'Voted' : 'Vote'}
      </button>
    </article>
  );
}
