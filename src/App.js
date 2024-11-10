import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import spotify from './assets/spotify.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Songs from './pages/Songs';
import Artists from './pages/Artists';

const server_url = process.env.REACT_APP_SERVER_URL;

export default function App() {

  const [userData, setUserData] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    axios.get(server_url+'/login')
      .then((response) => {
        const spotifyURL = response.data;
        window.location.href = spotifyURL;
      });
  }

  useEffect(() => {
    axios.get(server_url+'/auth/verify', { withCredentials: true })
        .then((response) => {
            setIsAuthenticated(response.data.authenticated);
        })
        .catch((error) => {
            console.error("Error de autenticación:", error);
            setUserData(null);
            setIsAuthenticated(false);
        });
}, []);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(server_url+'/get/user', { withCredentials: true })
        .then((response) => {
          setUserData(response.data.userData);
        })
        .catch((error) => {
          console.log("Error al recibir la informacion del usuario:", error);
        });
    } else {
      setUserData(null);
    }
  }, [isAuthenticated]);

  const logout = () => {
    axios.get(server_url+'/logout', { withCredentials: true })
      .then((response) => {
        console.log(response);
        setUserData(null);
        setIsAuthenticated(false);
      });
    window.location.href = 'http://localhost:3000/';
  }

  return (
    <div className="app-container">
      <nav className="navbar navbar-dark justify-content-between p-3">
        <div className="d-flex align-items-center">
          <img src={spotify} alt="Logo" className="logo" />
          <Link to='/' className="navbar-brand h1">SpotifyRecomender</Link>
        </div>
        <div>
          {
            !isAuthenticated || userData == null ? (
              <button onClick={login} className="btn btn-outline-light me-2 nav-btn">Log In</button>
            ) : (
              <div class="dropdown">
                <img src={userData.images[0].url} alt='AvatarUser' className='logo'></img>
                <button class="dropdown-toggle dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData.display_name}
                </button>
                <ul class="dropdown-menu">
                  <li><Link to="/songs" class="dropdown-item">Canciones</Link></li>
                  <li><Link to="/artists" class="dropdown-item">Artistas</Link></li>
                  <li><button onClick={logout} class="dropdown-item" type="button">Log Out</button></li>
                </ul>
              </div>
            )}
        </div>
      </nav>
        <Routes>
          <Route path='/' element={
            <div className="main-content d-flex flex-column justify-content-center align-items-center text-center">
            <h2 className="text-light title">¿Estás buscando algo nuevo para escuchar?</h2>
            {
                !isAuthenticated ? (
                  <button onClick={login} className="btn btn-success mt-4">Empezar a escuchar sin logear</button>
                ) : (
                  <button onClick={login} className="btn btn-success mt-4">Empezar a escuchar logeado</button>
                )}
          </div>
          }></Route>
          <Route path='/songs' element={<Songs />}></Route>
          <Route path='/artists' element={<Artists />}></Route>
        </Routes>
    </div>
  );
};