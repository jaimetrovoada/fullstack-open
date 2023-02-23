import React from "react";
import { IBlogUser } from "../reducers";

interface Props {
  user: IBlogUser;
}

const UserView: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserView;
