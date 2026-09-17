import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <BrandMark />
          <p className="footer-brand__text">
            AI research and innovation focused on efficient, reliable, and scalable intelligence.
          </p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/team">Team</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h4>Research</h4>
          <Link to="/#delivery">Cost Reduction</Link>
          <Link to="/#delivery">Latency Optimization</Link>
          <Link to="/#vision">1000x Energy Efficiency</Link>
          <Link to="/#vision">Scaling Economics</Link>
        </div>

        <div className="footer-column">
          <h4>Connect</h4>
          <Link to="/contact">Get in Touch</Link>
          <a
            href="https://www.linkedin.com/in/dddhiraj"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:hello@indraastra.com">Email Inquiry</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} IndraAstra. All rights reserved.</span>
        <span>Bengaluru, India</span>
      </div>
    </footer>
  );
}

