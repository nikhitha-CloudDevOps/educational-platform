const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 EduPortal. A member of Academic Excellence Network.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-colors">Help Center</a>
          </div>
        </div>
        <div className="text-center mt-4 text-xs text-muted-foreground">
          Scheduled Maintenance Notice: System updates occur every Sunday 2:00 AM - 4:00 AM
        </div>
      </div>
    </footer>
  );
};

export default Footer;
