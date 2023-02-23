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
      <table className="border">
        <thead className="border-b">
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="odd:bg-slate-500 even:bg-slate-600">
              <td className="p-2">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className="p-2">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul></ul>
    </div>
  );
};

export default UsersView;
