import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Bubble</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
