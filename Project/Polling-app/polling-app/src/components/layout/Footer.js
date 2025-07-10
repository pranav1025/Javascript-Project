function Footer() {
  return (
    <footer id="app-footer" className="glass" role="contentinfo" aria-label="Application footer">
      <div className="footer-left" aria-label="Brand information">
        <span>© 2024 PollHub — Built with precision and passion</span>
      </div>
      <div className="footer-socials" aria-label="Follow us on social media">
        <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" tabIndex={0}>
          <span className="material-icons" aria-hidden="true">twitter</span>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" tabIndex={0}>
          <span className="material-icons" aria-hidden="true">facebook</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" tabIndex={0}>
          <span className="material-icons" aria-hidden="true">instagram</span>
        </a>
      </div>
    </footer>
  );
}