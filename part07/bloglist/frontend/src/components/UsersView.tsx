import React from "react";
import { IBlogUser } from "../reducers";
import { Link } from "react-router-dom";

interface Props {
  users: IBlogUser[];
}

const UsersView: React.FC<Props> = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul></ul>
    </div>
  );
};

export default UsersView;
