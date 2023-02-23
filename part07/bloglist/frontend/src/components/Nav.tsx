import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IUser } from "../reducers";

interface Props {
  handleLogout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  user: IUser;
}

const Nav: React.FC<Props> = ({ handleLogout, user }) => {
  const url = useLocation();
  console.log({ url });
  return (
    <header className="flex flex-row items-center justify-between bg-slate-500 px-4 py-2">
      <span className="flex flex-row items-center gap-2">
        <Link
          to="/"
          className={`${
            url.pathname === "/" ? "border-b-2 border-b-slate-900" : null
          } text-lg font-bold no-underline`}
        >
          blogs
        </Link>
        {user.token === null || user.token === undefined ? null : (
          <Link
            to="/users"
            className={`${
              url.pathname === "/users" ? "border-b-2 border-b-slate-900" : null
            } text-lg font-bold no-underline`}
          >
            users
          </Link>
        )}
      </span>
      {user.token === null || user.token === undefined ? null : (
        <span className="flex flex-row items-center gap-2">
          <p className="text-lg">{user.name} logged in</p>
          <button
            onClick={(e) => handleLogout(e)}
            className="hover:bg-slate-900"
          >
            logout
          </button>
        </span>
      )}
    </header>
  );
};

export default Nav;
