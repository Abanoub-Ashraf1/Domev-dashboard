import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="state">
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn--primary">Go to overview</Link>
    </div>
  );
}
