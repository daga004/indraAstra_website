import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <BrandMark variant="full" />
          <p>
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
          <a href="/#research">Cost Reduction</a>
          <a href="/#research">Latency Optimization</a>
          <a href="/#vision">1000x Energy Efficiency</a>
          <a href="/#vision">Scaling Economics</a>
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

      <div className="footer-bottom">
        <span>© {year} IndraAstra. All rights reserved.</span>
        <span>Bengaluru, India</span>
      </div>
    </footer>
  );
}

