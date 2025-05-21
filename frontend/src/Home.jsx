import './App.css';
import httpClient from '../httpClient';
import {useState, useEffect} from 'react';
import TablePage from './pages/tablePage';

function Home() {
  const [user, setUser] = useState('');
  const url = import.meta.env.VITE_BACKEND_URL;
  const logoutUser = async () => {
    await httpClient.post(`${url}/logout`);
    window.location.href = '/';
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await httpClient.get(`${url}/me`);
        setUser(res.data);
      } catch {
        console.error('Error: Not authenticated');
      }
    })();
  }, [url]);

  return (
    <div>
      {user ? (
        <div>
          <h3>User: {user.email}</h3>
          <div className="table-container">
            <h2>Data Table</h2>
            <TablePage />
          </div>

          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <div>
            <a href="/login">
              <button>Login</button>
            </a>
            <a href="/register">
              <button>Register</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
