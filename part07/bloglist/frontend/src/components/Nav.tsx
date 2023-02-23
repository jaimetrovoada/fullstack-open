import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../reducers";

interface Props {
  handleLogout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  user: IUser;
}

const Nav: React.FC<Props> = ({ handleLogout, user }) => {
  return (
    <div className="nav">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Nav;
