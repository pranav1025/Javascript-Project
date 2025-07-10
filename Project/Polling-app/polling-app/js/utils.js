// Utility functions
function generateId() {
  return 'xxxxxx'.replace(/[x]/g, () =>
    (Math.random() * 36 | 0).toString(36)
  );
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