import React, { useState } from "react";

interface Props {
  handleLogin: (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => Promise<void>;
}

const LoginForm: React.FC<Props> = ({ handleLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <form
        onSubmit={(e) => handleLogin(e, username, password)}
        id="login-form"
      >
        <div>
          username{" "}
          <input
            type="text"
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="loginBtn">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
