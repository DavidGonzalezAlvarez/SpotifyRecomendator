import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import spotify from './assets/spotify.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    axios.get('http://localhost:8888/login')
      .then((response) => {
        const spotifyURL = response.data;
        window.location.href = spotifyURL;
      });
  }

  useEffect(() => {
    axios.get('http://localhost:8888/auth/verify', { withCredentials: true })
        .then((response) => {
            if (response.data.authenticated) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
        })
        .catch((error) => {
            console.error("Error de autenticación:", error);
            setIsAuthenticated(false);
        });
}, []);

  const logout = () => {
    axios.get('http://localhost:8888/logout')
      .then((response) => {
        console.log(response);
        setIsAuthenticated(false);
      });
  }

  return (
    <div className="app-container">
      <nav className="navbar navbar-dark justify-content-between p-3">
        <div className="d-flex align-items-center">
          <img src={spotify} alt="Logo" className="logo" />
          <span className="navbar-brand h1">SpotifyRecomender</span>
        </div>
        <div>
          {
            !isAuthenticated ? (
              <button onClick={login} className="btn btn-outline-light me-2 nav-btn">Log In</button>
            ) : (
              <button onClick={logout} className="btn btn-outline-light me-2 nav-btn">Log Out</button>
            )}
        </div>
      </nav>

      <div className="main-content d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="text-light title">¿Estás buscando algo nuevo para escuchar?</h1>
        {
            !isAuthenticated ? (
              <button onClick={login} className="btn btn-success mt-4">Empezar a escuchar sin logear</button>
            ) : (
              <button onClick={login} className="btn btn-success mt-4">Empezar a escuchar logeado</button>
            )}
      </div>
    </div>
  );
};