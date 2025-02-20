<<<<<<< HEAD
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { useState } from "react";
import { FaPlus, FaReddit, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import CreateDropdown from "./dropdown/CreateDropdown";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <FaReddit className="reddit-icon" />
            <span className="site-name">reddit</span>
          </div>
        </Link>
        <div>Searchbar</div>
        <div className="nav-actions">
          <Unauthenticated>
            <SignInButton mode="modal">
              <button className="sign-in-button">Sign In</button>
            </SignInButton>
          </Unauthenticated>
          <Authenticated>
            <div className="dropdown-container">
              <button
                className="icon-button"
                onClick={() => {
                  setShowDropdown(true);
                }}
              >
                <FaPlus />
              </button>
              {showDropdown && (
                <CreateDropdown
                  isOpen={showDropdown}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </div>
            <button
              className="icon-button"
              onClick={() => user?.username && navigate(`/u/${user.username}`)}
              title="View Profile"
            >
              <FaUser />
            </button>
            <UserButton />
          </Authenticated>
        </div>
      </div>
    </nav>
  );
=======
import "../styles/Navbar.css";

const Navbar = () => {
  return <>Navbar</>;
>>>>>>> eacfd2dc359f9c84e994095f3e4ac485a4c1f322
};

export default Navbar;
