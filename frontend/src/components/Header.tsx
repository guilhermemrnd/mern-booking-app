import { Link } from "react-router-dom";

import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

export default function Header() {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          <Link to="/">BookingClone.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center px-3 py-1 font-medium text-white hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center px-3 py-1 font-medium text-white hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton className="bg-white px-3 py-1 font-medium text-blue-600 hover:bg-gray-100">
                Sign Out
              </SignOutButton>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex cursor-pointer items-center bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
