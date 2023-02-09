import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  const [message, setMessage] = useState<{msg: string, type: 'success' | 'error'} | null>(null)

  const localStorage = window.localStorage
  const localStorageKey = 'logginDetails'

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem(localStorageKey)    
    if (loggedUserJSON) {      
        const user = JSON.parse(loggedUserJSON)      
        setUser(user)      
        blogService.setToken(user.token)    
      setMessage({type:'success', msg:`logged in as ${user.username}`})     
            setTimeout(() => {        
                setMessage(null)
            }, 5000)    
        }  
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ username, password });

    try {
      const user = await loginService.login({ username, password });
      console.log({ user });
      setUser(user);
      localStorage.setItem(localStorageKey, JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername("");
      setPassword("");
      setMessage({type:'success', msg:`logged in as ${user.username}`})     
            setTimeout(() => {        
                setMessage(null)
            }, 5000)    
    } catch (error) {
      console.log({ error });
      setMessage({type:'error', msg:'wrong name or password'})     
            setTimeout(() => {        
                setMessage(null)
            }, 5000)    
    }
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    localStorage.removeItem(localStorageKey)
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
      <Notification message={message}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification message={message}/>
      <h2>blogs</h2>
      <div>{user.username} logged in</div>
      <button onClick={handleLogout}>log out</button>
      <br />
      <BlogForm setBlogs={setBlogs} setMessage={setMessage} />
      <br />
      {blogs.sort((a, b) => b.likes - a.likes).map((blog: any) => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} setMessage={setMessage} />
      ))}
    </div>
  );
};

export default App;
