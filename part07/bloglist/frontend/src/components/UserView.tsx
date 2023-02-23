import React, { useEffect, useState } from "react";
import { IBlogUser } from "../reducers";
import { useMatch } from "react-router-dom";
import users from "../services/users";

const UserView = () => {
  const [user, setUser] = useState<IBlogUser>();
  const userMatch = useMatch("/users/:id")?.params.id;

  useEffect(() => {
    users.getAll().then((res) => {
      setUser(res.find((user: IBlogUser) => user.id === userMatch));
    });
  });

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs ? (
        <ul className="list-inside list-disc">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="list-item">
              {blog.title}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserView;
