function PollsList({polls, userVotes, onCastVote, onSearch}) {
  const [searchText, setSearchText] = useState('');
  const filteredPolls = polls.filter(p => {
    const q = searchText.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    onSearch(searchText);
  }, [searchText, onSearch]);

  return (
    <>
      <div id="search-container">
        <input 
          id="search-input"
          type="search"
          name="search"
          aria-label="Search polls"
          placeholder="Search polls..."
          autoComplete="off"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <span className="material-icons" id="search-icon" aria-hidden="true">search</span>
      </div>
      {filteredPolls.length === 0 ? (
        <p style={{textAlign: 'center', marginTop: '3rem', fontWeight: 600, color: '#6b7280'}}>
          No polls found matching your search.
        </p>
      ) : (
        <section id="poll-list" role="list">
          {filteredPolls.map(poll => (
            <PollCard
              key={poll.id}
              poll={poll}
              userVote={userVotes[poll.id]}
              onCastVote={onCastVote}
            />
          ))}
        </section>
      )}
    </>
  );
}