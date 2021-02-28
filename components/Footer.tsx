export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="global-footer" data-testid="global-footer">
      <small data-testid="copyright">&copy; {currentYear} Patrick McLennan</small>
    </footer>
  );
}
