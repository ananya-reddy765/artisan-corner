import {
  Navigate,
} from "react-router-dom";

export default function ProtectedRoute({
  children,
  role,
}) {

  const token =
    localStorage.getItem(
      "token"
    );

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  /* NOT LOGGED IN */

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /* ROLE CHECK */

  if (
    role &&
    user?.role !== role
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}