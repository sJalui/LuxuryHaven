import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-4xl text-white font-serif tracking-wide">
          <Link to="/">LuxuryHaven.com</Link>
        </span>
        <span className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                className="text-white px-4 py-2 font-sans font-semibold hover:bg-blue-600 rounded-lg transition-all"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="text-white px-4 py-2 font-sans font-semibold hover:bg-blue-600 rounded-lg transition-all"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="bg-white text-blue-600 px-4 py-2 font-sans font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
